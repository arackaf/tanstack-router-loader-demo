import { fetchJson } from "../../../backend/fetchUtils";

export type Epic = {
  id: string;
  name: string;
};

export const epicsQueryOptions = (timestarted: number, page: number) => ({
  queryKey: ["epics", "list", page],
  queryFn: async () => {
    const timeDifference = +new Date() - timestarted;

    console.log("Loading api/epics data at", timeDifference);
    const epics = await fetchJson<Epic[]>("api/epics?page=" + page);
    return epics;
  },
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
});

export const epicsCountQueryOptions = (timestarted: number) => ({
  queryKey: ["epics", "count"],
  queryFn: async () => {
    const timeDifference = +new Date() - timestarted;

    console.log("Loading api/epics/count data at", timeDifference);
    const result = await fetchJson<[{ count: number }]>("api/epics/count");
    return result[0];
  },
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
});
