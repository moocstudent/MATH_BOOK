/* =========================================================
 * firebase-init.js — decrypt config + initialize Firebase
 * ---------------------------------------------------------
 * Loaded as a normal <script> BEFORE the babel app scripts.
 * Reads:
 *   window.__FIREBASE_ENC__   (firebase-config.enc.js — committed ciphertext)
 *   window.__MATH_BOOK_KEY__  (firebase-key.local.js  — local passphrase, gitignored)
 *                             or localStorage 'math_book_key' (set via mathBookUnlock)
 * Exposes:
 *   window.__FIREBASE_READY__  Promise<boolean>  (true once Firebase is initialized)
 *   window.mathBookUnlock(pass)  store passphrase in localStorage + reload (for deploy)
 *
 * NOTE ON SECURITY: a Firebase *web* config is an identifier, not a true secret —
 * any deployed client must expose it to talk to Firebase. This encryption keeps the
 * config out of the public source repo, but real protection comes from:
 *   1) restricting Auth providers to what you use (Email/Password),
 *   2) Authorized domains (Firebase console → Auth → Settings),
 *   3) Firestore/RTDB Security Rules, and 4) App Check.
 * ========================================================= */
(function () {
  const ITER = 200000;

  function fromB64(s) {
    const bin = atob(s);
    const u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    return u8;
  }
  async function deriveKey(pass, salt) {
    const base = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']
    );
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
    );
  }
  async function decryptConfig(blobB64, pass) {
    const blob = fromB64(blobB64);
    const salt = blob.slice(0, 16);
    const iv   = blob.slice(16, 28);
    const data = blob.slice(28);
    const key  = await deriveKey(pass, salt);
    const pt   = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
    return JSON.parse(new TextDecoder().decode(pt));
  }

  // For deployment without a local key file: run mathBookUnlock("<passphrase>") once.
  window.mathBookUnlock = function (pass) {
    try { localStorage.setItem('math_book_key', pass); } catch (e) {}
    location.reload();
  };

  window.__FIREBASE_READY__ = (async function () {
    if (typeof firebase === 'undefined') {
      console.error('[firebase-init] Firebase SDK not loaded.');
      return false;
    }
    const enc = window.__FIREBASE_ENC__;
    if (!enc) {
      console.error('[firebase-init] Missing firebase-config.enc.js (run: node tools/encrypt-config.mjs).');
      return false;
    }
    let pass = window.__MATH_BOOK_KEY__;
    try { pass = pass || localStorage.getItem('math_book_key'); } catch (e) {}
    if (!pass) {
      window.__FIREBASE_LOCKED__ = true;
      console.warn('[firebase-init] Locked: no passphrase. Add firebase-key.local.js, or run mathBookUnlock("<passphrase>").');
      return false;
    }
    try {
      const cfg = await decryptConfig(enc, pass);
      const appCheckSiteKey = cfg.appCheckSiteKey;
      delete cfg.appCheckSiteKey; // not a standard initializeApp option
      firebase.initializeApp(cfg);
      console.log('[firebase-init] Firebase ready:', cfg.projectId);

      // App Check (reCAPTCHA v3). Keep OFF until fully configured in the console,
      // otherwise every auth/DB request fails with `network-request-failed`.
      const APP_CHECK_ENABLED = false;
      const isLocalHost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
      if (APP_CHECK_ENABLED && appCheckSiteKey && firebase.appCheck && !isLocalHost) {
        try {
          firebase.appCheck().activate(appCheckSiteKey, true /* auto-refresh */);
          console.log('[firebase-init] App Check activated');
        } catch (e2) {
          console.error('[firebase-init] App Check activate failed:', e2);
        }
      } else {
        console.log('[firebase-init] App Check inactive (enabled=' + APP_CHECK_ENABLED + ', localhost=' + isLocalHost + ').');
      }
      return true;
    } catch (e) {
      window.__FIREBASE_LOCKED__ = true;
      console.error('[firebase-init] Decrypt/init failed (wrong passphrase?).', e);
      return false;
    }
  })();
})();
