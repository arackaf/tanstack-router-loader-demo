export const fetchJson = <T>(relativeUrl: string) => {
  return fetch(`http://localhost:3000/${relativeUrl}`).then((resp) => resp.json() as T);
};
