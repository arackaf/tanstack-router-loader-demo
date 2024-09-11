import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks")({
  component: TasksLayout,
});

function TasksLayout() {
  return (
    <div>
      Tasks layout <Outlet />
    </div>
  );
}
