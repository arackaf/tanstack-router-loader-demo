import { fetchJson } from "../../../backend/fetchUtils";

export type Epic = {
  id: string;
  name: string;
};

export const epicQueryOptions = (timestarted: number, id: string) => ({
  queryKey: ["epic", id],
  queryFn: async () => {
    const timeDifference = +new Date() - timestarted;

    console.log(`Loading api/epic/${id} data at`, timeDifference);
    const epic = await fetchJson<Epic>(`api/epics/${id}`);
    return epic;
  },
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
});
