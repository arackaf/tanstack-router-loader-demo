import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  beforeLoad({ context }) {
    if (!context.user) {
      throw redirect({
        to: "/login",
      });
    }
    document.cookie = `user=${context.user.id};path=/;max-age=31536000`;

    return { user: context.user };
  },
  component: () => {
    Route.useRouteContext();
    return <Outlet />;
  },
});
