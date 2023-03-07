<script setup>
import { useFetchRefTag } from "@/queries/tags";
import { useFetchIssues } from "@/queries/issues";
import { useFetchPullRequestFromRefTag } from "@/queries/pullRequests";
import WelcomeItem from "@/components/WelcomeItem.vue";
import ToolingIcon from "@/components/icons/IconTooling.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Loader from "@/components/Loader.vue";

const route = useRoute();
const currentTag = computed(() => route.params.tag);

const { isLoading, isFetching, isError, data } = useFetchRefTag({
  organization: "cardlay",
  repository: "web",
  tag: currentTag,
});

const { data: pullRequestData } = useFetchPullRequestFromRefTag({
  organization: "cardlay",
  repository: "web",
  tag: currentTag,
  enabled: !!currentTag,
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
});
</script>

<template>
  <main>
    <div v-if="isLoading || isFetching"><Loader /></div>
    <h1>{{ currentTag }}</h1>
    <div v-if="isError">Error: {{ error }}</div>
    <pre>{{ parsedPullRequestInfo }}</pre>
  </main>
</template>

<style>
pre {
  background: #f6f8fa;
  color: #24292e;
  padding: 1rem;
  max-width: 100%;
  white-space: pre-wrap;
}
</style>
