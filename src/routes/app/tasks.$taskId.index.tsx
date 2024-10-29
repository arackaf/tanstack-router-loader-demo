import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchJson } from "../../../backend/fetchUtils";
import { Task } from "../../types";

export const Route = createFileRoute("/app/tasks/$taskId/")({
  loader: async ({ params, context, parentMatchPromise }) => {
    console.log("tasks page", { context });
    const { taskId } = params;

    if (taskId == "22") {
      throw new Error("I don't want to");
    }
    const task = await fetchJson<Task>(`api/tasks/${taskId}`);

    const parentMatch = await parentMatchPromise;
    const tasksOverview = parentMatch?.loaderData?.tasksOverview;

    console.log({ tasksOverview });

    return { task };
  },
  component: TaskView,
  gcTime: 1000 * 60 * 5,
  staleTime: 1000 * 60 * 5,
  errorComponent: ({ error }) => <div className="m-4 p-4 text-xl text-red-500">Error loading task :(</div>,
  pendingComponent: () => <div className="m-4 p-4 text-xl">Loading task ...</div>,
  pendingMs: 150,
  pendingMinMs: 200,
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
