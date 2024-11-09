const FAKE_USER = {
  id: 1,
  name: "Adam",
};

const userPacket: any = {
  user: null,
};

export async function getCurrentUser() {
  if (!userPacket.user) {
    //await new Promise(res => setTimeout(res, 300));
    userPacket.user = FAKE_USER;
  }

  if (document.cookie.includes("loggedout=1")) {
    return null;
  }
  return userPacket.user as typeof FAKE_USER;
}
