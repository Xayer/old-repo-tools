<script setup>
import { useFetchRefTag } from "@/queries/tags";
import { useFetchIssues } from "@/queries/issues";
import { useFetchPullRequestFromRefTag } from "@/queries/pullRequests";
import WelcomeItem from "@/components/WelcomeItem.vue";
import ToolingIcon from "@/components/icons/IconTooling.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Loader from "@/components/Loader.vue";

const props = defineProps(["organization", "repository", "tag"]);

const organization = computed(() => props.organization);
const repository = computed(() => props.repository);
const currentTag = computed(() => props.tag);

const { isLoading, isFetching, isError, data } = useFetchRefTag({
  organization,
  repository,
  tag: currentTag.value,
  enabled: !!organization && !!repository && !!currentTag,
});

const { data: pullRequestData } = useFetchPullRequestFromRefTag({
  organization,
  repository,
  tag: currentTag,
  enabled: !!organization && !!repository && !!currentTag,
});

const pullRequestLink = computed(() => {
  if (!pullRequestData.value) return null;

  return pullRequestData?.value.html_url;
});

const versionLink = computed(() => {
  return `https://github.com/${organization.value}/${repository.value}/releases/tag/${currentTag.value}`;
});

const parsedPullRequestInfo = computed(() => {
  const body = pullRequestData.value?.body;
  if (!body) return null;
  const regex = /Changes in this PR:\r\n\r\n([\s\S]*?)(?=✂|$)/;
  const match = body.match(regex);

  if (match) {
    const changes = match[1]
      .trim()
      .replace("-", "")
      .split(/\r\n/g)
      .filter(Boolean)
      .join("\n   ");
    return `- ${currentTag.value}\n   -${changes}`;
  }
  return `- ${currentTag.value}\n   -`;
});
</script>

<template>
  <header>
    <h1>{{ currentTag }}</h1>
    <nav>
      <a :href="pullRequestLink" v-if="pullRequestLink">Pull Request</a>
      <a :href="versionLink" v-if="versionLink">Version</a>
    </nav>
  </header>
  <div v-if="isLoading || isFetching"><Loader /></div>
  <pre v-else>{{ parsedPullRequestInfo || "" }}</pre>
  <div v-if="isError">Error: {{ error }}</div>
</template>

<style>
pre {
  background: #f6f8fa;
  color: #24292e;
  padding: 1rem;
  max-width: 100%;
  white-space: pre-wrap;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
}
</style>
