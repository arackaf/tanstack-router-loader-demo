import { createRootRoute, Outlet } from "@tanstack/react-router";
import { User } from "../main";

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
  const context = Route.useRouteContext();

  return (
    <>
      <div className="p-3">
        <Outlet />
      </div>
    </>
  );
}
