import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/para-ayudar")({
  component: () => <Outlet />,
});
