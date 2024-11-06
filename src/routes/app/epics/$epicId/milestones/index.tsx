import { createFileRoute, Link } from "@tanstack/react-router";
import { MilestoneSearch } from "../../../../../app/MilestoneSearch";
import { fetchJson } from "../../../../../../backend/fetchUtils";
import { Milestone } from "../../../../../types";

type SearchParams = {
  search: string;
};

export const Route = createFileRoute("/app/epics/$epicId/milestones/")({
  loader: async ({ params }) => {
    const { epicId } = params;

    const milestones = await fetchJson<Milestone[]>(`api/epics/${epicId}/milestones`);

    return { milestones };
  },
  validateSearch(search: Record<string, unknown>): SearchParams {
    return {
      search: (search.search as string) || "",
    };
  },
  component: Milestones,
});

function Milestones() {
  const { epicId } = Route.useParams();
  const { milestones } = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-3 p-3">
      <div>Epic: {epicId}</div>

      <MilestoneSearch />
      {milestones.map((milestone, idx) => {
        return (
          <div className="flex gap-2" key={idx}>
            <span>{milestone.name}</span>
            <Link from={Route.to} to="$milestoneId" params={{ epicId, milestoneId: milestone.id }}>
              View
            </Link>
            <Link from={Route.to} to="$milestoneId/edit" params={{ epicId, milestoneId: milestone.id }}>
              Edit
            </Link>
          </div>
        );
      })}
    </div>
  );
}
