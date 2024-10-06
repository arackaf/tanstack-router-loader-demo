import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: () => {
    function login() {
      const age = 60 * 60 * 24 * 30;
      document.cookie = `loggedout=;path=/;max-age=${age}`;
      throw redirect({ to: "/app" });
    }
    return (
      <div>
        <div>Log back in</div>
        <button className="border p-1" onClick={login}>
          Login
        </button>
      </div>
    );
  },
});
