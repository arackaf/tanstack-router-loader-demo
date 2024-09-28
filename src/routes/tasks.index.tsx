import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchJson } from "../../backend/fetchUtils";

type Task = any;

export const Route = createFileRoute("/tasks/")({
  component: Index,
  loader: async ({ context }) => {
    const now = +new Date();
    console.log(`/tasks/index path loader. Loading tasks at + ${now - context.timestarted}ms since start`);
    const tasks = await fetchJson<Task[]>("api/tasks");
    console.log({ tasks });
    return { tasks };
  },
});

function Index() {
  const tasks = [
    { id: "1", title: "Task 1" },
    { id: "2", title: "Task 2" },
    { id: "3", title: "Task 3" },
  ];

  return (
    <div className="p-2">
      <h3>Tasks page!</h3>
      <div className="flex flex-col gap-2 p-3">
        {tasks.map((t, idx) => (
          <div key={idx} className="flex gap-3">
            <div>{t.title}</div>
            <Link to="/tasks/$taskId" params={{ taskId: t.id }}>
              View
            </Link>
            <Link to="/tasks/$taskId/edit" params={{ taskId: t.id }}>
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
