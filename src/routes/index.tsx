import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad({}) {},
  component: Index,
});

function Index() {
  return <div>Public Homepage</div>;
}
