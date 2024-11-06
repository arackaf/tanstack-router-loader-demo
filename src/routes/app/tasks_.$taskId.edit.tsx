import { createFileRoute, Link, redirect, useNavigate, useRouter } from "@tanstack/react-router";
import { fetchJson, postToApi } from "../../../backend/fetchUtils";
import { Task } from "../../types";
import { useRef } from "react";

export const Route = createFileRoute("/app/tasks_/$taskId/edit")({
  loader: async ({ params }) => {
    const { taskId } = params;
    const task = await fetchJson<Task>(`api/tasks/${taskId}`);

    return { task };
  },
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
  component: TaskEdit,
});

function TaskEdit() {
  const { taskId } = Route.useParams();
  const { task } = Route.useLoaderData();
  const router = useRouter();
  const newTitleEl = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const save = async () => {
    await postToApi("api/task/update", {
      id: task.id,
      title: newTitleEl.current!.value,
    });

    router.clearCache({
      filter: route => {
        if (route.routeId == "/app/tasks/") {
          return true;
        }
        if (route.routeId === "/app/tasks/$taskId/" && route.params.taskId === taskId) {
          return true;
        }

        return false;
      },
    });

    navigate({ to: "/app/tasks" });
  };

  return (
    <div className="flex flex-col gap-5 p-3">
      <Link to="/app/tasks">Back to tasks list</Link>

      <div>
        <div className="flex flex-col gap-2">
          <span>Edit task {taskId}</span>
          <input className="self-start border p-2 w-64" ref={newTitleEl} defaultValue={task.title} />
          <button className="self-start p-2 border" onClick={save}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
