export async function getCurrentUser() {
  await new Promise((res) => setTimeout(res, 300));

  return {
    id: 1,
    name: "Adam",
  };
}
