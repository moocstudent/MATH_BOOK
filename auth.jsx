/* =========================================================
   Auth — Firebase Authentication (email / password)
   ---------------------------------------------------------
   Same flow as the rest of the stack: firebase-init.js decrypts
   the config, useAuth() waits for window.__FIREBASE_READY__ then
   subscribes to auth state. Errors are stored as i18n KEYS and
   localized at render time, so login works in zh and en alike.
   ========================================================= */

function mapUser(u) {
  if (!u) return null;
  return {
    uid: u.uid,
    email: u.email,
    name: u.displayName || (u.email ? u.email.split("@")[0] : "learner"),
  };
}

// Map Firebase error codes -> i18n keys (localized in the modal).
function authErrorKey(code) {
  switch (code) {
    case "auth/invalid-email":          return "err_email";
    case "auth/missing-password":
    case "auth/weak-password":          return "err_pass";
    case "auth/email-already-in-use":   return "err_email_used";
    case "auth/user-not-found":         return "err_notfound";
    case "auth/wrong-password":
    case "auth/invalid-credential":     return "err_wrongpass";
    case "auth/too-many-requests":      return "err_toomany";
    case "auth/network-request-failed": return "err_network";
    case "auth/operation-not-allowed":  return "err_notallowed";
    case "auth/configuration-not-found":return "err_noconfig";
    default:                            return "err_generic";
  }
}

function useAuth() {
  const [user, setUser]   = React.useState(null);
  const [error, setError] = React.useState(null); // holds an i18n key (or null)
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let unsub = null;
    let alive = true;
    (async () => {
      const ok = await window.__FIREBASE_READY__;
      if (!alive) return;
      if (!ok) {
        setReady(true);
        setError("err_locked");
        return;
      }
      unsub = firebase.auth().onAuthStateChanged((u) => {
        setUser(mapUser(u));
        setReady(true);
      });
    })();
    return () => { alive = false; if (unsub) unsub(); };
  }, []);

  const ensureReady = async () => {
    const ok = await window.__FIREBASE_READY__;
    if (!ok) { setError("err_notready"); return false; }
    return true;
  };

  const register = async ({ email, name, password }) => {
    setError(null);
    email = (email || "").trim().toLowerCase();
    if (!email || !email.includes("@")) { setError("err_email"); return false; }
    if (!password || password.length < 6) { setError("err_pass"); return false; }
    if (!(await ensureReady())) return false;
    try {
      const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
      if (name && cred.user) {
        try { await cred.user.updateProfile({ displayName: name }); } catch (e) {}
      }
      setUser(mapUser(firebase.auth().currentUser));
      return true;
    } catch (e) {
      setError(authErrorKey(e.code));
      return false;
    }
  };

  const login = async ({ email, password }) => {
    setError(null);
    email = (email || "").trim().toLowerCase();
    if (!email || !password) { setError("err_need_both"); return false; }
    if (!(await ensureReady())) return false;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      return true;
    } catch (e) {
      setError(authErrorKey(e.code));
      return false;
    }
  };

  const logout = async () => {
    try { await firebase.auth().signOut(); } catch (e) {}
    setUser(null);
  };

  return { user, error, setError, register, login, logout, ready };
}

/* ============== Auth Modal ============== */

const AuthModal = ({ open, onClose, mode = "login", onModeChange, auth, courseHint }) => {
  const t = useT();
  const [form, setForm] = React.useState({ email: "", name: "", password: "" });
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      auth.setError(null);
      setForm({ email: "", name: "", password: "" });
      setBusy(false);
    }
  }, [open, mode]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const ok = mode === "login" ? await auth.login(form) : await auth.register(form);
    setBusy(false);
    if (ok) onClose();
  };

  return (
    <div className="auth-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-x" onClick={onClose} aria-label={t("auth_close")}>×</button>

        <div className="auth-left">
          <div className="auth-eyebrow">
            <span className="swatch" />
            <span>{mode === "login" ? t("auth_welcome") : t("auth_join")}</span>
          </div>
          <h2 className="auth-title">
            {mode === "login" ? (
              <><span className="cn">{t("auth_login_t1")}</span><br/><em>{t("auth_login_t2")}</em></>
            ) : (
              <><span className="cn">{t("auth_reg_t1")}</span><br/><em>{t("auth_reg_t2")}</em></>
            )}
          </h2>
          <p className="auth-blurb">
            {courseHint
              ? fmt(t("auth_blurb_course"), { name: courseHint })
              : t("auth_blurb")}
          </p>

          <ul className="auth-bullets">
            <li><span className="b-mark">▣</span> {t("auth_b1")}</li>
            <li><span className="b-mark">▣</span> {t("auth_b2")}</li>
            <li><span className="b-mark">▣</span> {t("auth_b3")}</li>
          </ul>
        </div>

        <form className="auth-right" onSubmit={submit}>
          <div className="auth-tabs">
            <button type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => onModeChange("login")}>{t("auth_tab_login")}</button>
            <button type="button"
              className={mode === "register" ? "active" : ""}
              onClick={() => onModeChange("register")}>{t("auth_tab_reg")}</button>
          </div>

          {mode === "register" && (
            <label className="auth-field">
              <span>{t("auth_name")}</span>
              <input
                type="text" required
                placeholder={t("auth_name_ph")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
          )}

          <label className="auth-field">
            <span>{t("auth_email")}</span>
            <input
              type="email" required autoFocus
              placeholder="student@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label className="auth-field">
            <span>{t("auth_pass")} {mode === "register" && <em style={{opacity:.55}}>{t("auth_pass_hint")}</em>}</span>
            <input
              type="password" required
              placeholder="••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>

          {auth.error && (
            <div className="auth-error">⚠ {t(auth.error)}</div>
          )}

          <button type="submit" className="btn btn-accent" disabled={busy}
            style={{ marginTop: 16, justifyContent: "center", opacity: busy ? 0.7 : 1 }}>
            {busy ? t("auth_busy") : (mode === "login" ? t("auth_submit_login") : t("auth_submit_reg"))}
          </button>

          <div className="auth-note">⚠ {t("auth_note")}</div>
        </form>
      </div>
    </div>
  );
};

/* ============== In-chapter lock: gates the "important content" ============== */

const LockSection = ({ chapter, onOpen }) => {
  const t = useT();
  const lang = useLang();
  const m = MODULES.find((mm) => mm.id === chapter.moduleId);
  return (
    <div className="lockwall">
      <div className="lockwall-bg" aria-hidden="true">
        <div className="lockwall-zh">{pick(lang, chapter.title)}</div>
        <div className="lockwall-en">{m ? m.en : ""}.</div>
      </div>
      <div className="lockwall-card">
        <div className="lock-eyebrow mono">
          <span>⌘</span>
          <span>{t("gate_eyebrow")}</span>
        </div>
        <div className="lock-code mono">{chapter.code} · {pick(lang, m)}</div>
        <h3 className="lock-title">
          <span className="cn">{t("gate_title")}</span>
          <br/>
          <em>{t("gate_sub")}</em>
        </h3>
        <p className="lock-body">{t("gate_body")}</p>
        <div className="lock-cta">
          <button className="btn btn-accent" onClick={() => onOpen("login")}>{t("gate_login")}</button>
          <button className="btn" onClick={() => onOpen("register")}>{t("gate_register")}</button>
        </div>
        <div className="lock-meta mono">
          <div><span>{t("gate_m_notes")}</span><strong>{chapter.outline.length}</strong></div>
          <div><span>{t("gate_m_examples")}</span><strong>{chapter.nExamples}</strong></div>
          <div><span>{t("gate_m_exercises")}</span><strong>{chapter.nExercises}</strong></div>
          <div><span>{t("gate_m_hours")}</span><strong>{chapter.hours}</strong></div>
        </div>
      </div>
    </div>
  );
};

window.useAuth = useAuth;
window.AuthModal = AuthModal;
window.LockSection = LockSection;
