import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchJson } from "../../../backend/fetchUtils";
import { Task } from "../../types";

export const Route = createFileRoute("/app/tasks/")({
  component: Index,
  loader: async ({ context }) => {
    const now = +new Date();
    console.log(`/tasks/index path loader. Loading tasks at + ${now - context.timestarted}ms since start`);
    const tasks = await fetchJson<Task[]>("api/tasks");
    return { tasks };
  },
});

function Index() {
  const { tasks } = Route.useLoaderData();

  return (
    <div className="p-2">
      <h3>Tasks page!</h3>
      <div className="flex flex-col gap-2 p-3">
        {tasks.map((t, idx) => (
          <div key={idx} className="flex gap-3 items-center">
            <div>{t.title}</div>
            <Link to="/app/tasks/$taskId" className="border p-1 rounded" params={{ taskId: t.id }}>
              View
            </Link>
            <Link to="/app/tasks/$taskId/edit" className="border p-1 rounded" params={{ taskId: t.id }}>
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
