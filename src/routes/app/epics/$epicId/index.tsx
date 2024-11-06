import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchJson } from "../../../../../backend/fetchUtils";

import { Epic } from "../../../../types";

export const Route = createFileRoute("/app/epics/$epicId/")({
  component: EpicIndex,
  loader: async ({ params }) => {
    const { epicId } = params;

    const epic = await fetchJson<Epic>(`api/epics/${epicId}`);

    return { epic };
  },
  gcTime: 1000 * 60 * 5,
  staleTime: 1000 * 60 * 5,
});

function EpicIndex() {
  const { epicId } = Route.useParams();
  const { epic } = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-3 p-3">
      <h2 className="text-xl">{epic.name}</h2>
      <Link to="/app/epics/$epicId/milestones" params={{ epicId }} search={{ search: "", page: 1, tags: [] }}>
        View milestones
      </Link>
    </div>
  );
}
