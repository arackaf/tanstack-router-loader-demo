import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { epicsQueryOptions } from "../../../app/queries/epicsQuery";

export const Route = createFileRoute("/app/epics/")({
  component: Index,
});

function Index() {
  const context = Route.useRouteContext();

  const { data } = useSuspenseQuery(epicsQueryOptions(context.timestarted));

  return (
    <div className="p-3">
      <h3 className="text-red-500">Epics page!</h3>
      <div className="flex flex-col gap-2 p-3">
        {data.map((e, idx) => (
          <div key={idx} className="flex gap-3">
            <div>{e.name}</div>
            <Link to="/app/epics/$epicId" params={{ epicId: e.id }}>
              View
            </Link>
            <Link to="/app/epics/$epicId/edit" params={{ epicId: e.id }}>
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
