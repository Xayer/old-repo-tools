import { getIssuesFromCommit, getRefTag, getTag } from "@/api/github";
import { useQuery } from "@tanstack/vue-query";

export const useFetchPullRequestFromRefTag = ({
  organization,
  repository,
  tag,
  enabled,
}: {
  organization: string;
  repository: string;
  tag: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["PrFromRefTag", organization, repository, tag],
    enabled,
    queryFn: async ({ queryKey: [, organization, repository, tag] }) =>
      await getRefTag({ organization, repository, tag })
        .then((refTag) =>
          getTag({ organization, repository, tag: refTag.object.sha }).then(
            (tag) =>
              getIssuesFromCommit({
                organization,
                repository,
                commit: tag.object.sha,
              })
          )
        )
        .then(({ items: [pullRequest] }) => pullRequest),
  });
};
