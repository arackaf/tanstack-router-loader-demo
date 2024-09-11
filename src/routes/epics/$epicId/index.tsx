import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/epics/$epicId/")({
  component: EpicIndex,
});

function EpicIndex() {
  const { epicId } = Route.useParams();

  return (
    <div className="flex flex-col gap-3 p-3">
      <div>Viewing epic {epicId}</div>
      <Link to="/epics/$epicId/milestones" params={{ epicId }} search={{ search: "", page: 1, tags: [] }}>
        View milestones
      </Link>
    </div>
  );
}
