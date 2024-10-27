import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <h2 className="text-2xl">Top level index page</h2>
    </div>
  );
}
