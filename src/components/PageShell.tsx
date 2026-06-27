import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-[640px] px-5 pb-32 pt-2 fade-in">
      {children}
    </main>
  );
}
