import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/tasks/$taskId/")({
  component: TaskView,
});

function TaskView() {
  const { taskId } = Route.useParams();

  return (
    <div className="flex flex-col gap-3 p-3">
      <div>
        <Link to="/app/tasks">Back</Link>
      </div>
      <div>View task {taskId}</div>
    </div>
  );
}
