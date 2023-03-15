<script setup>
import { useFetchRefTag } from "@/queries/tags";
import { useFetchIssues } from "@/queries/issues";
import {
  useFetchPullRequestFromRefTag,
  useFetchCommentsWithTests,
} from "@/queries/pullRequests";
import WelcomeItem from "@/components/WelcomeItem.vue";
import ToolingIcon from "@/components/icons/IconTooling.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Loader from "@/components/Loader.vue";

const props = defineProps(["organization", "repository", "tag"]);

const organization = computed(() => props.organization);
const repository = computed(() => props.repository);
const currentTag = computed(() => props.tag);
const pullRequestLink = computed(() =>
  !pullRequestData.value ? null : pullRequestData?.value.html_url
);
const jiraTasks = computed(() => {
  return pullRequestData.value?.body
    ? pullRequestData.value?.body.match(/([A-Z]+-\d+)/g)
    : null;
});
const pullRequestChanges = computed(() => {
  if (!pullRequestData.value?.body) return null;

  const regex = /Changes in this PR:\r\n\r\n([\s\S]*?)(?=✂|$)/;
  const match = pullRequestData.value?.body.match(regex);

  return (match && match[1]) || "";
});

const pullRequestReference = computed(() =>
  pullRequestNumber.value && pullRequestLink.value ? pullRequestLink.value : ""
);

const tagDescription = computed(() => {
  return `- ${currentTag.value} ${
    jiraTasks.value ? `- ${jiraTasks.value.join(", ")}` : ""
  } (${pullRequestReference.value})
${
  pullRequestChanges
    ? `
  - changes:   ${pullRequestChanges.value}`
    : ""
}${latestTestReport.value ? `- Test Report: ${latestTestReport.value}` : ""}`;
});

const versionLink = computed(() =>
  !!organization.value && !!repository.value && !!currentTag.value
    ? `https://github.com/${organization.value}/${repository.value}/releases/tag/${currentTag.value}`
    : null
);

const pullRequestNumber = computed(() => {
  if (!pullRequestData.value) return null;
  return pullRequestData.value.number;
});

const {
  data: pullRequestData,
  isLoading,
  isFetching,
  isError,
} = useFetchPullRequestFromRefTag({
  organization,
  repository,
  tag: currentTag,
  enabled: !!organization.value && !!repository.value && !!currentTag.value,
});

const shouldFetchComments = computed(() => {
  return (
    !!organization.value && !!repository.value && !!pullRequestNumber.value
  );
});

const { data: commentsWithTests } = useFetchCommentsWithTests({
  organization,
  repository,
  pullRequestNumber: pullRequestNumber,
  enabled: shouldFetchComments,
});

const latestTestReport = computed(() => {
  return commentsWithTests.value && commentsWithTests.value?.length > 0
    ? commentsWithTests.value.at(-1).body.match(/Allure report: (.*)/)[1] || ""
    : "";
});
</script>

<template>
  <header>
    <h1>{{ currentTag }}</h1>
    <nav>
      <a :href="versionLink" v-if="versionLink">Version</a>
      <a :href="pullRequestLink" v-if="pullRequestLink">Pull Request</a>
      <a :href="latestTestReport" v-if="latestTestReport">Test Report</a>
    </nav>
  </header>
  <div v-if="isLoading || isFetching"><Loader /></div>
  <pre v-else>{{ tagDescription || "" }}</pre>
  <div v-if="isError">Error: {{ error }}</div>
</template>

<style scoped>
pre {
  background: #f6f8fa;
  color: #24292e;
  padding: 1rem;
  max-width: 100%;
  white-space: pre-wrap;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
