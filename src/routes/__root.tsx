import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { FC } from "react";
import { getCurrentUser } from "../../backend/auth";

export const Route = createRootRoute({
  async beforeLoad() {
    const currentUser = await getCurrentUser();
    return { currentUser };
  },
  component: () => {
    const context = Route.useRouteContext();

    return (
      <>
        <div className="p-2 flex gap-4">
          <span className="mr-7">Welcome: {context.currentUser.name}</span>
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/tasks" className="[&.active]:font-bold">
            Tasks
          </Link>
          <Link to="/epics" className="[&.active]:font-bold">
            Epics
          </Link>
        </div>
        <hr />
        <div className="p-3">
          <Outlet />
        </div>
      </>
    );
  },
});
