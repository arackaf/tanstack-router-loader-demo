import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { epicQueryOptions } from "../../../../app/queries/epicQuery";
import { useRef, useState, useTransition } from "react";
import { postToApi } from "../../../../../backend/fetchUtils";

export const Route = createFileRoute("/app/epics/$epicId/edit")({
  component: EditEpic,
});

function EditEpic() {
  const { epicId } = Route.useParams();
  const { timestarted } = Route.useRouteContext();
  const navigate = useNavigate({ from: "/app/epics/$epicId/edit" });
  const { data: epic } = useSuspenseQuery(epicQueryOptions(timestarted, epicId));
  const newName = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [_, startTransition] = useTransition();

  const queryClient = useQueryClient();

  const save = async () => {
    setSaving(true);
    await postToApi("api/epic/update", {
      id: epic.id,
      name: newName.current!.value,
    });
    startTransition(() => {
      queryClient.removeQueries({ queryKey: ["epics"] });
      navigate({ to: "/app/epics" });
      setSaving(false);
    });
  };

  return (
    <div className="flex flex-col gap-5 p-3">
      <div>
        <Link to="/app/epics">Back</Link>
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <span>Edit epic {epicId}</span>
          <input className="self-start border p-2 w-64" ref={newName} defaultValue={epic.name} />
          <div className="flex gap-2"></div>
          <button className="self-start p-2 border" onClick={save}>
            Save
          </button>
          {saving && <span>Saving...</span>}
        </div>
      </div>
    </div>
  );
}
