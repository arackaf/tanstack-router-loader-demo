import { createFileRoute, Outlet } from "@tanstack/react-router";
import { fetchJson } from "../../../backend/fetchUtils";
import { Fragment } from "react/jsx-runtime";

type TaskOverview = {
  user: string;
  count: number;
};

export const Route = createFileRoute("/app/tasks")({
  component: TasksLayout,
  loader: async ({ context }) => {
    const now = +new Date();
    console.log(`/tasks route loader. Loading task layout info at + ${now - context.timestarted}ms since start`);
    const tasksOverview = await fetchJson<TaskOverview[]>("api/tasks/overview");
    return { tasksOverview };
  },
  gcTime: 1000 * 60 * 5,
  staleTime: 1000 * 60 * 2,
});

function TasksLayout() {
  const { tasksOverview } = Route.useLoaderData();

  const { isFetching } = Route.useMatch();

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl">Tasks overview</h2>
      <div className="self-start inline-grid grid-cols-[auto_auto] gap-x-12 items-center p-3">
        {tasksOverview.map(item => (
          <Fragment key={item.user}>
            <div className="font-bold">{item.user}</div>
            <div className="justify-self-end">{item.count}</div>
          </Fragment>
        ))}
      </div>

      <Outlet />
    </div>
  );
}
