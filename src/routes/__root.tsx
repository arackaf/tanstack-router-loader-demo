import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  loader: () => {
    fetch("http://localhost:3000/")
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("GET", resp);
      });

    fetch("http://localhost:3000/update", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ a: 99 }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("POST", resp.a);
      });
  },
  component: () => {
    return (
      <>
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/tasks" className="[&.active]:font-bold">
            Tasks
          </Link>
          <Link to="/epics" className="[&.active]:font-bold">
            Epics
          </Link>
        </div>
        <hr />
        <div className="p-3">
          <Outlet />
        </div>
      </>
    );
  },
});
