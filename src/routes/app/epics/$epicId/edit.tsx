import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/epics/$epicId/edit')({
  component: EditEpic,
})

function EditEpic() {
  const { epicId } = Route.useParams()
  return <div className="p-3">Edit epic {epicId}</div>
}
