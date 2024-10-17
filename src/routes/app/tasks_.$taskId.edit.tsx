import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchJson, postToApi } from "../../../backend/fetchUtils";
import { Task } from "../../types";
import { useRef } from "react";

export const Route = createFileRoute("/app/tasks/$taskId/edit")({
  loader: async ({ params }) => {
    const { taskId } = params;
    const task = await fetchJson<Task>(`api/tasks/${taskId}`);

    return { task };
  },
  gcTime: 1000 * 60 * 5,
  component: TaskEdit,
});

function TaskEdit() {
  const { taskId } = Route.useParams();
  const { task } = Route.useLoaderData();
  const newTitleEl = useRef<HTMLInputElement>(null);

  const save = () => {
    postToApi("api/task/update", { id: task.id, title: newTitleEl.current!.value });
  };

  return (
    <div className="flex flex-col gap-5 p-3">
      <div>
        <Link to="/app/tasks">Back</Link>
      </div>
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
