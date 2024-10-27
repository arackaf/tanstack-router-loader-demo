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
  return (
    <div className="m-3">
      <h2 className="text-2xl">Public Homepage</h2>
    </div>
  );
}
