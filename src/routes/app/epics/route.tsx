import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/epics')({
  component: EpicLayout,
})

function EpicLayout() {
  return (
    <div className="p-3">
      Epics layout <Outlet />
    </div>
  )
}
