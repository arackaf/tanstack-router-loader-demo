import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { epicsQueryOptions } from "../../../app/queries/epicsQuery";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute("/app/epics/")({
  loader({ context }) {
    const queryClient = context.queryClient;
    queryClient.prefetchQuery(epicsQueryOptions(context.timestarted));
  },
  component: Index,
});

function Index() {
  const context = Route.useRouteContext();

  const { data } = useSuspenseQuery(epicsQueryOptions(context.timestarted));

  return (
    <div className="p-3">
      <h3 className="text-red-500">Epics page!</h3>
      <div className="inline-grid gap-x-8 gap-y-4 grid-cols-[auto_auto_auto] items-center p-3">
        {data.map((e, idx) => (
          <Fragment key={idx}>
            <div>{e.name}</div>
            <Link to="/app/epics/$epicId" params={{ epicId: e.id }} className="border p-1 rounded">
              View
            </Link>
            <Link to="/app/epics/$epicId/edit" params={{ epicId: e.id }} className="border p-1 rounded">
              Edit
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
