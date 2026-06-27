import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Link,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { registerServiceWorker } from "../lib/sw-register";
import { AppHeader } from "../components/AppHeader";
import { FloatingHelpButton } from "../components/FloatingHelpButton";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="max-w-sm text-center">
        <h1 className="font-serif text-4xl text-foreground">No encontramos esta página</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Puede que el enlace haya cambiado. Vuelve al inicio cuando quieras.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="max-w-sm text-center">
        <h1 className="font-serif text-2xl text-foreground">Algo no cargó bien</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Respira. Puedes intentar de nuevo o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
          >
            Intentar otra vez
          </button>
          <a
            href="/"
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm text-foreground"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Serena — apoyo emocional" },
      {
        name: "description",
        content:
          "Un espacio calmado de Primeros Auxilios Psicológicos para los primeros momentos. Anónimo y privado.",
      },
      { name: "theme-color", content: "#FAF6EF" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "Serena" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { property: "og:title", content: "Serena — apoyo emocional" },
      {
        property: "og:description",
        content: "Un espacio calmado para los primeros momentos. Anónimo y privado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Serena — apoyo emocional" },
      {
        name: "twitter:description",
        content: "Un espacio calmado para los primeros momentos. Anónimo y privado.",
      },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/73760977-34e1-486e-9ddb-98f852ee9f52/id-preview-0d93d85d--8ebf92b5-3374-4671-9b43-57dae87962f4.lovable.app-1782571978718.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/73760977-34e1-486e-9ddb-98f852ee9f52/id-preview-0d93d85d--8ebf92b5-3374-4671-9b43-57dae87962f4.lovable.app-1782571978718.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "apple-touch-icon", sizes: "192x192", href: "/icon-192.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es-VE">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <AppHeader />
        <Outlet />
        <footer className="mx-auto max-w-[640px] px-5 pb-10 pt-6 text-center text-xs text-muted-foreground">
          <p>Privado y anónimo · tu diario se queda en tu teléfono.</p>
          <Link
            to="/privacidad"
            className="mt-1 inline-block text-primary underline-offset-4 hover:underline"
          >
            Cómo cuidamos tu privacidad
          </Link>
        </footer>
        <FloatingHelpButton />
      </div>
    </QueryClientProvider>
  );
}
