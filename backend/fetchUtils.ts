export const fetchJson = <T>(relativeUrl: string) => {
  return fetch(`http://localhost:5173/${relativeUrl}`).then((resp) => resp.json() as T);
};
