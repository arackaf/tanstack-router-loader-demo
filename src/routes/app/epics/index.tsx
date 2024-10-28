import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/epics/")({
  async loader() {
    const epics = await fetch("http://localhost:5173/api/epics")
      .then(resp => resp.json())
      .then(resp => {
        console.log("GET", resp);
      });

    return { epics };
  },
  staleTime: 1000 * 5,
  gcTime: 1000 * 10,
  component: Index,
});

function Index() {
  const epics = [
    { id: "1", title: "Epic 1" },
    { id: "2", title: "Epic 2" },
    { id: "3", title: "Epic 3" },
  ];

  return (
    <div className="p-3">
      <h3 className="text-red-500">Epics page!</h3>
      <div className="flex flex-col gap-2 p-3">
        {epics.map((e, idx) => (
          <div key={idx} className="flex gap-3">
            <div>{e.title}</div>
            <Link to="/app/epics/$epicId" params={{ epicId: e.id }}>
              View
            </Link>
            <Link to="/app/epics/$epicId/edit" params={{ epicId: e.id }}>
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
