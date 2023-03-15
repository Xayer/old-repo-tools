import { getAllRepositoriesForOrganization } from "@/api/github";
import { useQuery } from "@tanstack/vue-query";

export const useFetchAllRepositoriesForOrganization = ({
  organization,
  enabled,
}: {
  organization: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["allRepositories", organization],
    queryFn: async ({ queryKey: [, organization] }) => {
      return await getAllRepositoriesForOrganization({ organization });
    },
    enabled,
  });
};
