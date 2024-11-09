import { useDeferredValue } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchJson } from "../../../../../backend/fetchUtils";

import { Epic } from "../../../../types";

const viewEpicQueryOptions = (epicId: string) => ({
  queryKey: ["epics", "view", epicId],
  queryFn: async () => {
    const epic = await fetchJson<Epic>(`api/epics/${epicId}`);
    return { epic };
  },
});

export const Route = createFileRoute("/app/epics/$epicId/")({
  component: EpicIndex,
  context: ({ params }) => {},

  gcTime: 1000 * 60 * 5,
  staleTime: 1000 * 60 * 5,
  pendingComponent: () => <div className="m-4 p-4 text-xl">Loading epic ...</div>,
});

function EpicIndex() {
  const { epicId } = Route.useParams();

  const { data } = useSuspenseQuery(viewEpicQueryOptions(epicId));
  const { epic } = data;

  return (
    <div className="flex flex-col gap-3 p-3">
      <Link to="/app/epics">Back to epics list</Link>
      <h2 className="text-xl">{epic.name}</h2>
      <Link to="/app/epics/$epicId/milestones" params={{ epicId }} search={{ search: "" }}>
        View milestones
      </Link>
    </div>
  );
}
