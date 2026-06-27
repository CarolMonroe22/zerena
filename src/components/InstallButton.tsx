import { useEffect, useState } from "react";
import { Download, Share } from "lucide-react";
import { IconBubble } from "@/components/IconBubble";

// El evento beforeinstallprompt no está en los tipos estándar.
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  );
}

function isIosSafari() {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua);
  const webkit = /WebKit/.test(ua);
  const otherBrowser = /CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
  return iOS && webkit && !otherBrowser;
}

export function InstallButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [hidden, setHidden] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (isStandalone()) {
      setHidden(true);
      return;
    }
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setHidden(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    if (isIosSafari()) setIosHint(true);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  // Solo se muestra cuando de verdad se puede instalar (Chrome/Android) o en iPhone Safari.
  if (hidden || (!deferred && !iosHint)) return null;

  async function onInstall() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  }

  return (
    <div className="serena-card mt-8 flex items-center gap-4 p-4">
      <IconBubble>
        <Download size={18} />
      </IconBubble>
      <div className="min-w-0 flex-1">
        <p className="font-serif text-base text-foreground">Ten Serena a mano</p>
        {iosHint ? (
          <p className="mt-0.5 inline-flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            Toca <Share size={14} className="inline" aria-hidden /> Compartir y luego «Agregar a
            inicio». Funciona sin internet.
          </p>
        ) : (
          <p className="mt-0.5 text-sm text-muted-foreground">
            Instálala en tu teléfono. Se abre sin internet.
          </p>
        )}
      </div>
      {!iosHint && (
        <button
          type="button"
          onClick={onInstall}
          className="shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-px"
        >
          Instalar
        </button>
      )}
    </div>
  );
}
