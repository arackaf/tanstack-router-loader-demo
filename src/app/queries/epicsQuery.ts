import { fetchJson } from "../../../backend/fetchUtils";

export type Epic = {
  id: string;
  name: string;
};

export const epicsQueryOptions = (timestarted: number) => ({
  queryKey: ["epics", "list"],
  queryFn: async () => {
    const timeDifference = +new Date() - timestarted;

    console.log("Loading api/epics data at", timeDifference);
    const epics = await fetchJson<Epic[]>("api/epics");
    return epics;
  },
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
});
