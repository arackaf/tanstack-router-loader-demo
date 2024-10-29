import { fetchJson } from "../../../backend/fetchUtils";

export type EpicOverview = {
  name: string;
  count: number;
};

export const epicsSummaryQueryOptions = {
  queryKey: ["epics", "summary"],
  queryFn: async () => {
    const timestamp = (+new Date()).toString();
    const timestampDisplay = timestamp.slice(timestamp.length - 4);

    console.log("Running api/epics/overview query at", timestampDisplay);
    const epicsOverview = await fetchJson<EpicOverview[]>("api/epics/overview");
    return { epicsOverview };
  },
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
};
