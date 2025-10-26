import React from "react";

export type Consent = {
  necessary: true;        // siempre true
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  version: number;
  date?: string;          // ISO
};

type Ctx = {
  consent: Consent;
  ready: boolean;
  shouldShowBanner: boolean;
  open: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  update: (partial: Partial<Consent>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
};

const CONSENT_VERSION = 1;
const LS_KEY = "mps-consent";
const COOKIE_NAME = "mps-consent";

const defaultConsent: Consent = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
  version: CONSENT_VERSION,
};

const CookieConsentContext = React.createContext<Ctx | null>(null);

function writeCookie(value: Consent) {
  const encoded = encodeURIComponent(JSON.stringify(value));
  document.cookie = `${COOKIE_NAME}=${encoded}; Max-Age=${60 * 60 * 24 * 180}; Path=/; SameSite=Lax`;
}
function readCookie(): Consent | null {
  const m = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!m) return null;
  try {
    return JSON.parse(decodeURIComponent(m[1]));
  } catch {
    return null;
  }
}
function readLocal(): Consent | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function writeLocal(value: Consent) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(value));
  } catch {}
}

/** === Helpers para scripts/iframes y Consent Mode === */
function enableCategory(category: "analytics" | "marketing" | "functional") {
  // Scripts “aparcados”
  const nodes = document.querySelectorAll<HTMLScriptElement>(
    `script[type="text/plain"][data-category="${category}"]`
  );
  nodes.forEach((tpl) => {
    const s = document.createElement("script");
    // Copiar atributos relevantes
    Array.from(tpl.attributes).forEach((a) => {
      if (a.name === "type") return;
      if (a.name === "data-category") return;
      s.setAttribute(a.name, a.value);
    });
    s.text = tpl.text;
    tpl.replaceWith(s);
  });

  // Iframes con “data-src”
  const iframes = document.querySelectorAll<HTMLIFrameElement>(
    `iframe[data-consent-category="${category}"][data-src]`
  );
  iframes.forEach((el) => {
    const src = el.getAttribute("data-src");
    if (src) {
      el.setAttribute("src", src);
      el.removeAttribute("data-src");
    }
  });

  // Imgs / embeds perezosos
  const lazy = document.querySelectorAll<HTMLElement>(
    `[data-consent-category="${category}"][data-src]`
  );
  lazy.forEach((el) => {
    const src = el.getAttribute("data-src");
    if (src) {
      (el as any).src = src;
      el.removeAttribute("data-src");
    }
  });
}

function consentModeUpdate(c: Consent) {
  // Modo por defecto: denied si no hay consentimiento
  const hasGtag = typeof (window as any).gtag === "function";
  if (!hasGtag) return;

  const gtag = (window as any).gtag as (...args: any[]) => void;

  // Default siempre denied (al cargar página); aquí actualizamos según el nuevo estado.
  gtag("consent", "update", {
    ad_storage: c.marketing ? "granted" : "denied",
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
  });
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [consent, setConsent] = React.useState<Consent>({ ...defaultConsent });
  const [shouldShowBanner, setShouldShowBanner] = React.useState(false);

  React.useEffect(() => {
    const stored = readLocal() || readCookie();
    if (stored && stored.version === CONSENT_VERSION) {
      setConsent(stored);
      setShouldShowBanner(false);
    } else {
      // si cambia la versión o no hay consentimiento guardado → pedirlo
      setConsent({ ...defaultConsent });
      setShouldShowBanner(true);
    }
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (!ready) return;
    // Persistir
    const withMeta: Consent = { ...consent, version: CONSENT_VERSION, date: new Date().toISOString() };
    writeLocal(withMeta);
    writeCookie(withMeta);

    // Cargar categorías permitidas
    if (consent.analytics) enableCategory("analytics");
    if (consent.marketing) enableCategory("marketing");
    if (consent.functional) enableCategory("functional");

    // Consent Mode
    consentModeUpdate(consent);
  }, [consent, ready]);

  const acceptAll = () => {
    setConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      version: CONSENT_VERSION,
      date: new Date().toISOString(),
    });
    setShouldShowBanner(false);
    setOpen(false);
  };

  const rejectAll = () => {
    setConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      version: CONSENT_VERSION,
      date: new Date().toISOString(),
    });
    setShouldShowBanner(false);
    setOpen(false);
  };

  const update = (partial: Partial<Consent>) => {
    setConsent((prev) => ({ ...prev, ...partial, version: CONSENT_VERSION, date: new Date().toISOString() }));
    setShouldShowBanner(false);
  };

  const openPreferences = () => setOpen(true);
  const closePreferences = () => setOpen(false);

  const value: Ctx = {
    consent,
    ready,
    shouldShowBanner,
    open,
    acceptAll,
    rejectAll,
    update,
    openPreferences,
    closePreferences,
  };

  return (
    <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = React.useContext(CookieConsentContext);
  if (!ctx) throw new Error("useConsent must be used within CookieConsentProvider");
  return ctx;
}
