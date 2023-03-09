<script setup>
import { useFetchTags } from "@/queries/tags";
import { defineProps, computed } from "vue";
import WelcomeItem from "@/components/WelcomeItem.vue";
import Loader from "@/components/Loader.vue";
import ToolingIcon from "@/components/icons/IconTooling.vue";
const props = defineProps(["organization", "repository"]);

const organization = computed(() => props.organization);
const repository = computed(() => props.repository);

const enableQuery = computed(() => !!organization && !!repository);

console.log({ enableQuery: enableQuery.value });

const { isLoading, isFetching, isError, data, error } = useFetchTags({
  organization: organization,
  repository: repository,
  enabled: enableQuery.value,
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
        <router-link
          v-if="!!organization && !!repository"
          :to="`/${organization}/${repository}/tags/${tag.name}`"
          >{{ tag.name }}</router-link
        >
      </WelcomeItem>
    </ul>
  </div>
</template>
