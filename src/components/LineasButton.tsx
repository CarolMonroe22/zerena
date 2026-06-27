import { Link } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";

export function LineasButton({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/ayuda"
      className={`inline-flex items-center gap-2 rounded-full bg-sage-soft px-4 py-2 text-sm text-primary ring-1 ring-border transition-colors hover:bg-secondary ${className}`}
    >
      <LifeBuoy size={14} />
      Ver líneas de apoyo
    </Link>
  );
}
