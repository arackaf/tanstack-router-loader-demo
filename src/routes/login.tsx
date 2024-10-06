import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  beforeLoad({ context }) {
    if (context.user) {
      throw redirect({ to: "/app" });
    }
  },
  component: () => {
    const router = useRouter();
    function login() {
      const age = 60 * 60 * 24 * 30;
      document.cookie = `loggedout=;path=/;max-age=${age}`;
      router.invalidate();
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
