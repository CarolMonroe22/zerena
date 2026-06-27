import { Link, useRouterState } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";

export function FloatingHelpButton() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === "/ayuda") return null;

  return (
    <Link
      to="/ayuda"
      className="fixed bottom-5 left-1/2 z-40 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-12px_rgba(94,122,104,0.5)] transition-transform hover:-translate-y-px focus-visible:outline-offset-4"
      aria-label="Pedir ayuda"
    >
      <LifeBuoy size={16} />
      Pedir ayuda
    </Link>
  );
}
