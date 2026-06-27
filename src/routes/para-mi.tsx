import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/para-mi")({
  component: () => <Outlet />,
});
