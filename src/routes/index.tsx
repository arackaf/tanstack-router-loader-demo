import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad({}) {
    if (document.cookie.includes("user=1")) {
      throw redirect({ to: "/app" });
    }
  },
  component: Index,
});

function Index() {
  return <div>Public Homepage</div>;
}
