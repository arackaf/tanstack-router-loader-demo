import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { epicsQueryOptions } from "../../../app/queries/epicsQuery";
import { Fragment } from "react/jsx-runtime";
import { FC, Suspense, useState } from "react";

export const Route = createFileRoute("/app/epics/")({
  loader({ context }) {
    const queryClient = context.queryClient;
    queryClient.prefetchQuery(epicsQueryOptions(context.timestarted, 1));
  },
  component: Index,
});

function Index() {
  return (
    <div className="p-3">
      <h3 className="text-red-500">Epics page!</h3>
      <Suspense fallback={<div>Loading epics list ...</div>}>
        <EpicsList />
      </Suspense>
    </div>
  );
}

const EpicsList: FC<{}> = ({}) => {
  const context = Route.useRouteContext();

  const [page, setPage] = useState(1);
  const { data } = useSuspenseQuery(epicsQueryOptions(context.timestarted, page));

  return (
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
      <div className="flex gap-3">
        <button className="border p-1 rounded" onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <button className="border p-1 rounded" onClick={() => setPage(page + 1)} disabled={!data.length}>
          Next
        </button>
      </div>
    </div>
  );
};
