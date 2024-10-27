import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/epics")({
  component: EpicLayout,
});

function EpicLayout() {
  return (
    <div>
      <h2 className="text-2xl">Epics layout</h2>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
