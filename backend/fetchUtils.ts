export const fetchJson = <T>(relativeUrl: string) => {
  return fetch(`http://localhost:5173/${relativeUrl}`).then(resp => resp.json() as T);
};

export const postToApi = <T>(relativeUrl: string, body = {}) => {
  return fetch(`http://localhost:5173/${relativeUrl}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(resp => resp.json() as T);
};
