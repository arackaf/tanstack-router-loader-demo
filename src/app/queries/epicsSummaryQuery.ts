import { fetchJson } from "../../../backend/fetchUtils";

export type EpicOverview = {
  name: string;
  count: number;
};

export const epicsSummaryQueryOptions = (timestarted: number) => ({
  queryKey: ["epics", "summary"],
  queryFn: async () => {
    const timeDifference = +new Date() - timestarted;

    console.log("Running api/epics/overview query at", timeDifference);
    const epicsOverview = await fetchJson<EpicOverview[]>("api/epics/overview");
    return { epicsOverview };
  },
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
});
