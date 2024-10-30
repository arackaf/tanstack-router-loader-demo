import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { epicsSummaryQueryOptions } from "../../../app/queries/epicsSummaryQuery";
import { Fragment } from "react/jsx-runtime";
import { FC, Suspense } from "react";

export const Route = createFileRoute("/app/epics")({
  component: EpicLayout,
  loader({ context }) {
    const queryClient = context.queryClient;
    queryClient.prefetchQuery(epicsSummaryQueryOptions(context.timestarted));
  },
});

function EpicLayout() {
  return (
    <Suspense fallback={<h1 className="text-2xl">Loading ...</h1>}>
      <EpicsLayoutComponent />
    </Suspense>
  );
}

const EpicsLayoutComponent: FC<{}> = () => {
  const context = Route.useRouteContext();
  const { data } = useSuspenseQuery(epicsSummaryQueryOptions(context.timestarted));

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl">Epics overview</h2>
      <div className="self-start inline-grid grid-cols-[auto_auto] gap-x-12 items-center p-3">
        {data.epicsOverview.map(epic => (
          <Fragment key={epic.name}>
            <div className="font-bold">{epic.name}</div>
            <div className="justify-self-end">{epic.count}</div>
          </Fragment>
        ))}
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};
