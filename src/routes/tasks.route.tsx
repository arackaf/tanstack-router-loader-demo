import { createFileRoute, Outlet } from "@tanstack/react-router";
import { fetchJson } from "../../backend/fetchUtils";
import { Fragment } from "react/jsx-runtime";

type TaskOverview = {
  user: string;
  count: number;
};

export const Route = createFileRoute("/tasks")({
  component: TasksLayout,
  loader: async ({ context }) => {
    const now = +new Date();
    console.log(`/tasks route loader. Loading task layout info at + ${now - context.timestarted}ms since start`);
    const tasksOverview = await fetchJson<TaskOverview[]>("api/tasks/overview");
    return { tasksOverview };
  },
});

function TasksLayout() {
  const { tasksOverview } = Route.useLoaderData();
  return (
    <div className="flex flex-col gap-3">
      <div>Tasks layout</div>
      <hr />
      <div>Task overview</div>
      <div className="w-40 grid grid-cols-2">
        {tasksOverview.map((item) => (
          <Fragment key={item.user}>
            <div className="font-bold">{item.user}</div>
            <div>{item.count}</div>
          </Fragment>
        ))}
      </div>

      <Outlet />
    </div>
  );
}
