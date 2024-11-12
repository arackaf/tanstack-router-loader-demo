import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { epicQueryOptions } from "../../../../app/queries/epicQuery";
import { useEffect, useRef, useState } from "react";
import { postToApi } from "../../../../../backend/fetchUtils";

export const Route = createFileRoute("/app/epics/$epicId/edit")({
  component: EditEpic,
  context({ context, params }) {
    return {
      currentEpicOptions: epicQueryOptions(context.timestarted, params.epicId),
    };
  },
  loader({ context }) {
    context.queryClient.prefetchQuery(context.currentEpicOptions);
  },
});

function EditEpic() {
  const { epicId } = Route.useParams();
  const { currentEpicOptions } = Route.useRouteContext();
  const navigate = useNavigate({ from: "/app/epics/$epicId/edit" });
  const { data: epic } = useSuspenseQuery(currentEpicOptions);
  const newName = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);

  const queryClient = useQueryClient();

  const save = async () => {
    setSaving(true);
    await postToApi("api/epic/update", {
      id: epic.id,
      name: newName.current!.value,
    });

    queryClient.removeQueries({ queryKey: ["epics"] });
    queryClient.removeQueries({ queryKey: ["epic", epicId] });

    navigate({ to: "/app/epics", search: { page: 1 } });

    setSaving(false);
  };

  useEffect(() => {
    newName.current!.value = epic.name;
  }, [epic.name]);

  return (
    <div className="flex flex-col gap-5 p-3">
      <div>
        <Link to="/app/epics" search={{ page: 1 }}>
          Back
        </Link>
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
