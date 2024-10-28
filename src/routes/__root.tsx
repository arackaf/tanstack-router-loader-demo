import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";

const Loading = () => {
  return <div className="fixed left-[50%] top-0 translate-x-[-50%] bg-yellow-300 rounded-b px-2 py-1">Loading ...</div>;
};

export const Route = createRootRoute({
  async beforeLoad({ location }) {
    const timeStarted = +new Date();
    console.log("");
    console.log("Fresh navigation to", location.href);
    console.log("------------------------------------------------------------------------------------");

    return { timestarted: timeStarted };
  },
  component: Root,
});

function Root() {
  const state = useRouterState();
  const isNavigating = state.isLoading;

  return (
    <>
      <div className="p-x-2">
        {isNavigating ? <Loading /> : null}
        <Outlet />
      </div>
    </>
  );
}
