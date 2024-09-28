import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { getCurrentUser } from "../../backend/auth";

export const Route = createRootRoute({
  async beforeLoad() {
    const timeStarted = +new Date();
    console.log("Root beforeLoad. Loading authentication info");
    const currentUser = await getCurrentUser();

    document.cookie = `user-id=${currentUser.id};path=/;max-age=31536000`;

    return { currentUser, timestarted: timeStarted };
  },
  component: Root,
});

function Root() {
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
}
