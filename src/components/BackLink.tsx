import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
    >
      <ChevronLeft size={14} />
      {label}
    </Link>
  );
}
