/* =========================================================
 * encrypt-config.mjs — encrypt the Firebase config for commit
 * ---------------------------------------------------------
 * Reads   : firebase-config.local.json   (plaintext, gitignored)
 * Key     : firebase-key.local.js        (passphrase, gitignored; generated if absent)
 *           or process.env.MATH_BOOK_KEY
 * Writes  : firebase-config.enc.js        (AES-256-GCM ciphertext, safe to commit)
 *
 * Run:  node tools/encrypt-config.mjs
 *
 * Format of the blob (base64):  salt(16) | iv(12) | ciphertext+gcmTag
 * KDF: PBKDF2-SHA256, 200k iterations. Matches firebase-init.js (browser).
 * ========================================================= */
import { webcrypto as crypto } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG  = join(ROOT, 'firebase-config.local.json');
const KEYFILE = join(ROOT, 'firebase-key.local.js');
const OUT     = join(ROOT, 'firebase-config.enc.js');
const ITER = 200000;

const b64 = (buf) => Buffer.from(buf).toString('base64');

async function deriveKey(pass, salt) {
  const base = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']
  );
}

function getPassphrase() {
  if (process.env.MATH_BOOK_KEY) return process.env.MATH_BOOK_KEY;
  if (existsSync(KEYFILE)) {
    const m = readFileSync(KEYFILE, 'utf8').match(/__MATH_BOOK_KEY__\s*=\s*"([^"]+)"/);
    if (m) return m[1];
  }
  const pass = b64(crypto.getRandomValues(new Uint8Array(24))).replace(/[+/=]/g, '').slice(0, 32);
  writeFileSync(KEYFILE,
    `// LOCAL ONLY — gitignored. Passphrase that unlocks firebase-config.enc.js.\n` +
    `// Keep this on your machine; never commit it. To deploy, see notes in firebase-init.js.\n` +
    `window.__MATH_BOOK_KEY__ = "${pass}";\n`
  );
  console.log('[encrypt-config] no passphrase found — generated a new one → firebase-key.local.js');
  return pass;
}

async function main() {
  if (!existsSync(CONFIG)) {
    console.error('[encrypt-config] missing firebase-config.local.json (copy from .example and fill in).');
    process.exit(1);
  }
  const config = JSON.parse(readFileSync(CONFIG, 'utf8'));
  const pass = getPassphrase();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv   = crypto.getRandomValues(new Uint8Array(12));
  const key  = await deriveKey(pass, salt);
  const pt   = new TextEncoder().encode(JSON.stringify(config));
  const ct   = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, pt));

  const blob = new Uint8Array(salt.length + iv.length + ct.length);
  blob.set(salt, 0);
  blob.set(iv, salt.length);
  blob.set(ct, salt.length + iv.length);
  const enc = b64(blob);

  writeFileSync(OUT,
    `// AUTO-GENERATED — safe to commit (ciphertext only).\n` +
    `// Firebase config, AES-256-GCM encrypted. Decrypted in the browser by firebase-init.js\n` +
    `// using the passphrase in firebase-key.local.js (kept on your machine, gitignored).\n` +
    `// Regenerate after editing firebase-config.local.json:  node tools/encrypt-config.mjs\n` +
    `window.__FIREBASE_ENC__ = "${enc}";\n`
  );
  console.log(`[encrypt-config] wrote firebase-config.enc.js (${enc.length} base64 chars)`);
  console.log(`[encrypt-config] passphrase (stored in firebase-key.local.js):\n    ${pass}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
