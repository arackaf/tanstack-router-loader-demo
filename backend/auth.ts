export async function getCurrentUser() {
  await new Promise((res) => setTimeout(res, 300));

  if (document.cookie.includes("loggedout=1")) {
    return null;
  }
  return {
    id: 1,
    name: "Adam",
  };
}
