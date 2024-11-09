import { createFileRoute, Link, Outlet, redirect, useRouter } from "@tanstack/react-router";
import { getCurrentUser } from "../../../backend/auth";

export const Route = createFileRoute("/app")({
  async beforeLoad({}) {
    const user = await getCurrentUser();
    if (!user) {
      throw redirect({
        to: "/login",
      });
    }
    document.cookie = `user=${user.id};path=/;max-age=31536000`;

    return { user };
  },
  gcTime: 1000 * 60 * 10,
  staleTime: 1000 * 60 * 10,
  component: () => {
    const context = Route.useRouteContext();

    return (
      <div>
        <div className="p-2 flex gap-4">
          <span className="mr-7">Welcome: {context.user.name}</span>
          <Link to="/app" activeOptions={{ exact: true }} className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/app/tasks" className="[&.active]:font-bold">
            Tasks
          </Link>
          <Link to="/app/epics" search={{ page: 1 }} className="[&.active]:font-bold">
            Epics
          </Link>
        </div>
        <hr />
        <div className="m-3">
          <Outlet />
        </div>
      </div>
    );
  },
});
