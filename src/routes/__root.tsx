import { createRootRouteWithContext, Link, Outlet, redirect } from "@tanstack/react-router";
import { User } from "../main";

export const Route = createRootRouteWithContext<{ user: User | null; value: number; update: () => void }>()({
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
      {context.user ? (
        <>
          <div className="p-2 flex gap-4">
            <span className="mr-7">Welcome: {context.user.name}</span>
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>
            <Link to="/app/tasks" className="[&.active]:font-bold">
              Tasks
            </Link>
            <Link to="/app/epics" className="[&.active]:font-bold">
              Epics
            </Link>
          </div>
          <hr />
        </>
      ) : null}
      <div className="p-3">
        <Outlet />
      </div>
    </>
  );
}
