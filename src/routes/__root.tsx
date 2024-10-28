import { createRootRoute, Outlet } from "@tanstack/react-router";

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
  return (
    <>
      <div className="p-x-2">
        <Outlet />
      </div>
    </>
  );
}
