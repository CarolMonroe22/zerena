// Registro de service worker para soporte offline.
// Solo registra en producción y fuera de previews de Lovable.

function isLovablePreviewHost(host: string) {
  return (
    host.startsWith("id-preview--") ||
    host.startsWith("preview--") ||
    host === "lovableproject.com" ||
    host.endsWith(".lovableproject.com") ||
    host === "lovableproject-dev.com" ||
    host.endsWith(".lovableproject-dev.com") ||
    host === "beta.lovable.dev" ||
    host.endsWith(".beta.lovable.dev")
  );
}

export async function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  const url = new URL(window.location.href);
  const killSwitch = url.searchParams.get("sw") === "off";
  const isPreview = isLovablePreviewHost(window.location.hostname);
  const inIframe = window.self !== window.top;
  const isDev = !import.meta.env.PROD;

  if (killSwitch || isPreview || inIframe || isDev) {
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const reg of regs) {
        if (reg.active?.scriptURL.endsWith("/sw.js")) {
          await reg.unregister();
        }
      }
    } catch {
      /* noop */
    }
    return;
  }

  try {
    await navigator.serviceWorker.register("/sw.js", { scope: "/" });
  } catch {
    /* noop */
  }
}
