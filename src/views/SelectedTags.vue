<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Tag from "@/components/Tag.vue";
import { useRouteQuery } from "@vueuse/router";

const repository = useRouteQuery("repository");
const organization = useRouteQuery("organization");

const tags = computed(() => {
  const tags = useRouteQuery("tags").value as string;
  return tags ? tags.split(",") : [];
});
</script>
<template>
  <div v-if="!!(organization && repository && tags)">
    <Tag
      :repository="repository"
      :organization="organization"
      v-for="tag in tags"
      :key="tag"
      :tag="tag"
    />
  </div>
  <p v-else>No tags found</p>
</template>
