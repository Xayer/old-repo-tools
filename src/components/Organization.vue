<script setup>
import { useFetchTags } from "@/queries/tags";
import { defineProps, computed } from "vue";
import Item from "@/components/Item.vue";
import Loader from "@/components/Loader.vue";
import ToolingIcon from "@/components/icons/IconTooling.vue";
const props = defineProps(["organization", "repository"]);
import { useFetchAllRepositoriesForOrganization } from "@/queries/repositories";

const organization = computed(() => props.organization);

const enableQuery = computed(() => !!organization.value);

const {
  isLoading,
  isFetching,
  isError,
  data: repositories,
  error,
} = useFetchAllRepositoriesForOrganization({
  organization: organization,
  enabled: enableQuery,
});
</script>
<template>
  <div v-if="isLoading || isFetching"><Loader /></div>
  <div v-if="isError">Error: {{ error }}</div>
  <div v-if="repositories">
    <ul>
      <Item v-for="repository in repositories" :key="repository.name">
        <template #icon>
          <ToolingIcon />
        </template>
        <router-link
          v-if="!!organization && !!repository"
          :to="`/${organization}/${repository.name}/`"
          >{{ repository.name }}</router-link
        >
      </Item>
    </ul>
  </div>
</template>
