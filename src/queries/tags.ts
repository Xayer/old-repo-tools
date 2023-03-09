import { getRefTag, getTag, getTags } from "@/api/github";
import { useQuery } from "@tanstack/vue-query";

export const useFetchTags = ({
  organization,
  repository,
  enabled,
}: {
  organization: string;
  repository: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["tags", organization, repository],
    queryFn: async ({ queryKey: [, organization, repository] }) => {
      return (await getTags({ organization, repository })).reverse();
    },
    enabled,
  });
};

export const useFetchTag = ({
  organization,
  repository,
  tag,
}: {
  organization: string;
  repository: string;
  tag: string;
}) => {
  return useQuery(
    ["tag", organization, repository, tag],
    ({ queryKey: [, organization, repository, tag] }) => {
      return getTag({ organization, repository, tag });
    }
  );
};

export const useFetchRefTag = ({
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
    queryKey: ["refTag", organization, repository, tag],
    queryFn: async ({ queryKey: [, organization, repository, tag] }) => {
      return getRefTag({ organization, repository, tag });
    },
    enabled,
  });
};
