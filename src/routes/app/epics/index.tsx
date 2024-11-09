import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { epicsCountQueryOptions, epicsQueryOptions } from "../../../app/queries/epicsQuery";
import { Fragment } from "react/jsx-runtime";
import { useDeferredValue, useState } from "react";

export const Route = createFileRoute("/app/epics/")({
  async loader({ context }) {
    const queryClient = context.queryClient;
    //await queryClient.ensureQueryData(epicsQueryOptions(context.timestarted, 1));
    queryClient.prefetchQuery(epicsQueryOptions(context.timestarted, 1));
  },
  component: Index,
  pendingComponent: () => <div className="p-3 text-xl">Loading epics ...</div>,
  pendingMinMs: 3000,
  pendingMs: 10,
});

function Index() {
  const context = Route.useRouteContext();

  const [page, setPage] = useState(1);

  const deferredPage = useDeferredValue(page);
  const loading = page !== deferredPage;

  const { data: epicsData } = useSuspenseQuery(epicsQueryOptions(context.timestarted, deferredPage));
  const { data: epicsCount } = useSuspenseQuery(epicsCountQueryOptions(context.timestarted));

  return (
    <div className="p-3">
      <h3 className="text-blue-600 text-2xl">Epics page!</h3>
      <h3 className="text-lg">There are {epicsCount.count} epics</h3>
      <div
        className={`inline-grid gap-x-8 gap-y-4 grid-cols-[auto_auto_auto] items-center p-3 ${loading ? "opacity-40" : ""}`}
      >
        {epicsData.map((e, idx) => (
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
        <div className="flex gap-3">
          <button className="border p-1 rounded" onClick={() => setPage(page - 1)} disabled={loading || page === 1}>
            Prev
          </button>
          <button
            className="border p-1 rounded"
            onClick={() => setPage(page + 1)}
            disabled={loading || !epicsData.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
