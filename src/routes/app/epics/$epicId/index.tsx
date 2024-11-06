import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchJson } from "../../../../../backend/fetchUtils";

import { Epic } from "../../../../types";

export const Route = createFileRoute("/app/epics/$epicId/")({
  component: EpicIndex,
  loader: async ({ params }) => {
    const { epicId } = params;

    const task = await fetchJson<Epic>(`api/tasks/${epicId}`);

    return { task };
  },
  gcTime: 1000 * 60 * 5,
  staleTime: 1000 * 60 * 5,
});

function EpicIndex() {
  const { epicId } = Route.useParams();

  return (
    <div className="flex flex-col gap-3 p-3">
      <div>Viewing epic {epicId}</div>
      <Link to="/app/epics/$epicId/milestones" params={{ epicId }} search={{ search: "", page: 1, tags: [] }}>
        View milestones
      </Link>
    </div>
  );
}
