import { getIssuesFromCommit } from "@/api/github";
import { useQuery } from "@tanstack/vue-query";

export const useFetchIssues = ({
  organization,
  repository,
  commit,
}: {
  organization: string;
  repository: string;
  commit: string;
}) => {
  return useQuery(
    ["issues", organization, repository, commit],
    ({ queryKey: [, organization, repository, commit] }) => {
      return getIssuesFromCommit({ organization, repository, commit });
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
