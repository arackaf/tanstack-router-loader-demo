import { fetchJson } from "../../../backend/fetchUtils";

export type Epic = {
  id: string;
  name: string;
};

export const epicsQueryOptions = {
  queryKey: ["epics", "list"],
  queryFn: async () => {
    const timestamp = (+new Date()).toString();
    const timestampDisplay = timestamp.slice(timestamp.length - 4);

    console.log("Running api/epics query at", timestampDisplay);
    const epics = await fetchJson<Epic[]>("api/epics");
    return epics;
  },
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
};
