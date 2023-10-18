import {
  getCommentsFromPullRequest,
  getIssuesFromCommit,
  getRefTag,
  getTag,
  type GithubRefTag,
} from "@/api/github";
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
    refetchOnWindowFocus: false,
    enabled,
    queryFn: async ({ queryKey: [, organization, repository, tag] }) =>
      await getRefTag({ organization, repository, tag })
        .then(({ object: { sha: refSha } }) =>
          getTag({ organization, repository, tag: refSha }).then((tag) =>
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

export const useFetchPullRequestCommentsWithTests = ({
  organization,
  repository,
  pullRequestNumber,
  enabled,
}: {
  organization: string;
  repository: string;
  pullRequestNumber: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: [
      "CommentsFromPullRequest",
      organization,
      repository,
      pullRequestNumber,
    ],
    enabled,
    queryFn: async ({
      queryKey: [, organization, repository, pullRequestNumber],
    }) =>
      await getCommentsFromPullRequest({
        organization: organization as string,
        repository: repository as string,
        pullRequestNumber: pullRequestNumber as string,
      }),
  });
};
