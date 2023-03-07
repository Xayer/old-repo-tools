<script setup>
import { useFetchTags } from "@/queries/tags";
import WelcomeItem from "@/components/WelcomeItem.vue";
import Loader from "@/components/Loader.vue";
import ToolingIcon from "@/components/icons/IconTooling.vue";
const { organization, repository } = defineProps([
  "organization",
  "repository",
]);

const { isLoading, isFetching, isError, data, error } = useFetchTags({
  organization,
  repository,
});
</script>
<template>
  <div v-if="isLoading || isFetching"><Loader /></div>
  <div v-if="isError">Error: {{ error }}</div>
  <div v-if="data">
    <ul>
      <WelcomeItem v-for="tag in data" :key="tag.name">
        <template #icon>
          <ToolingIcon />
        </template>
        <router-link :to="`/tags/${tag.name}`">{{ tag.name }}</router-link>
      </WelcomeItem>
    </ul>
  </div>
</template>
