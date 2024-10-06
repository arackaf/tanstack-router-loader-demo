import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Top level index page</h3>
    </div>
  )
}
