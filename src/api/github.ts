export type GithubRefTag = {
  ref: string;
  node_id: string;
  url: string;
  object: {
    sha: string;
    type: string;
    url: string;
  };
};

export type GithubTag = GithubRefTag & {
  name: `v${number}.${number}.${number}`;
};

export interface PullRequest {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: unknown;
  labels?: unknown[] | null;
  state: string;
  locked: boolean;
  assignee?: null;
  assignees?: null[] | null;
  milestone?: null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  author_association: string;
  active_lock_reason?: null;
  draft: boolean;
  pull_request: {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    merged_at: string;
  };
  body: string;
  reactions: unknown;
  timeline_url: string;
  performed_via_github_app?: null;
  state_reason?: null;
  score: number;
}

export const getTags = async ({
  organization,
  repository,
}: {
  organization: string;
  repository: string;
}) => {
  return await fetch(
    `https://api.github.com/repos/${organization}/${repository}/git/refs/tags`,
    {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    }
  ).then(async (response) => {
    if (response.status === 200) {
      const allRefs = (await response.json()) as GithubRefTag[];
      // only return the general tags, and not the web-design-token, web-ui, and web-portal specific tags
      return allRefs.reduce((acc, ref) => {
        const refTag = ref.ref.match(/^refs\/tags\/(v\d+\.\d+\.\d+)$/);
        if (ref.object.type === "tag" && refTag) {
          acc.push({
            ...ref,
            name: refTag[1],
          });
        }
        return acc;
      }, []) as GithubTag[];
    } else {
      throw new Error(response.statusText);
    }
  });
};

export const getTag = async ({
  organization,
  repository,
  tag,
}: {
  organization: string;
  repository: string;
  tag: string;
}) => {
  return await fetch(
    `https://api.github.com/repos/${organization}/${repository}/git/tags/${tag}`,
    {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    }
  ).then(async (response) => {
    if (response.status === 200) {
      // only return the general tags, and not the web-design-token, web-ui, and web-portal specific tags
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  });
};

export const getRefTag = async ({
  organization,
  repository,
  tag,
}: {
  organization: string;
  repository: string;
  tag: string;
}) => {
  return await fetch(
    `https://api.github.com/repos/${organization}/${repository}/git/refs/tags/${tag}`,
    {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    }
  ).then(async (response) => {
    if (response.status === 200) {
      // only return the general tags, and not the web-design-token, web-ui, and web-portal specific tags
      return (await response.json()) as GithubRefTag[];
    } else {
      throw new Error(response.statusText);
    }
  });
};

// https://api.github.com/search/issues?q=

export const getIssuesFromCommit = async ({
  organization,
  repository,
  commit,
}: {
  organization: string;
  repository: string;
  commit: string;
}) => {
  return await fetch(
    `https://api.github.com/search/issues?q=repo:${organization}/${repository}+sha:${commit}`,
    {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    }
  ).then(async (response) => {
    if (response.status === 200) {
      return (await response.json()) as { items: PullRequest[] };
    } else {
      throw new Error(response.statusText);
    }
  });
};
