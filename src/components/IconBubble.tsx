import type { ReactNode } from "react";

export function IconBubble({
  children,
  tone = "sage",
}: {
  children: ReactNode;
  tone?: "sage" | "peach";
}) {
  return <div className={tone === "peach" ? "icon-bubble-peach" : "icon-bubble"}>{children}</div>;
}
