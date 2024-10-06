import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/tasks/$taskId/edit")({
  component: TaskEdit,
});

function TaskEdit() {
  const { taskId } = Route.useParams();

  return (
    <div className="flex flex-col gap-3 p-3">
      <div>
        <Link to="/app/tasks">Back</Link>
      </div>
      <div>Edit task {taskId}</div>
    </div>
  );
}
