import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchJson } from "../../../backend/fetchUtils";
import { Task } from "../../types";

export const Route = createFileRoute("/app/tasks/$taskId/")({
  loader: async ({ params }) => {
    const { taskId } = params;
    const task = await fetchJson<Task>(`api/tasks/${taskId}`);

    return { task };
  },
  component: TaskView,
  gcTime: 1000 * 60 * 5,
  staleTime: 1000 * 60 * 5,
});

function TaskView() {
  const { task } = Route.useLoaderData();
  const { isFetching } = Route.useMatch();

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex flex-col gap-2">
        <div>
          Task {task.id} {isFetching ? "Loading ..." : null}
        </div>
        <h1 className="text-lg">{task.title}</h1>
        <Link className="text-blue-500 underline" to="/app/tasks/$taskId/edit" params={{ taskId: task.id }}>
          Edit
        </Link>
        <div />
        <Link to="/app/tasks">Back</Link>
      </div>
    </div>
  );
}
