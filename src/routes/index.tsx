import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad({ context }) {
    if (context.user) {
      throw redirect({ to: "/app" });
    }
    throw redirect({ to: "/login" });
  },
  component: Index,
});

function Index() {
  return null;
}
