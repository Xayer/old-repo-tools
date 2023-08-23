<script setup lang="ts">
import { useFetchTags } from "@/queries/tags";
import { defineProps, computed } from "vue";
import { useStore } from "vuex";
import WelcomeItem from "@/components/WelcomeItem.vue";
import Loader from "@/components/Loader.vue";
import ToolingIcon from "@/components/icons/IconTooling.vue";
const props = defineProps(["organization", "repository"]);
import type { GithubTag } from "@/api/github";

const organization = computed(() => props.organization).value;
const repository = computed(() => props.repository).value;

const enableQuery = !!organization.value && !!repository.value;

const store = useStore();

const selectedTags = computed(() => store.state.tags.selectedTags);

const isTagChecked = (tag: GithubTag["name"]) => {
  return (selectedTags.value || []).length > 0
    ? selectedTags.value.includes(tag)
    : false;
};

const updateTags = (payload: Event) => {
  let newSelectedTags = [...selectedTags.value];
  const { checked, value } = payload.target as HTMLInputElement;
  if (checked) {
    newSelectedTags.push(value);
  } else {
    newSelectedTags = newSelectedTags.filter((tag) => tag !== value);
  }
  store.dispatch("tags/setSelectedTags", newSelectedTags);
};

const { isLoading, isFetching, isError, data, error } = useFetchTags({
  organization: organization,
  repository: repository,
  enabled: enableQuery,
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
        <div class="tag-wrapper">
          <router-link
            v-if="!!organization && !!repository"
            :to="`/${organization}/${repository}/tags/${tag.name}`"
            >{{ tag.name }}</router-link
          ><input
            type="checkbox"
            @input="updateTags"
            :checked="isTagChecked(tag.name)"
            :value="tag.name"
          />
        </div>
      </WelcomeItem>
    </ul>
  </div>
</template>
<style>
.tag-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: end;
}
</style>
