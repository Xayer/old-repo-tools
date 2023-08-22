<script setup>
import Tag from "@/components/Tag.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const repository = computed(() => useRoute().params.repository);
const organization = computed(() => useRoute().params.organization);

const tabs = {
  tags: "Tags",
  pulls: "Pull Requests",
};

const tabRef = ref(tabs.tags);
const selectedTab = computed(() => tabRef.value);
</script>

<template>
  <h2>{{ repository }}</h2>
  <RouterLink
    v-if="organization && repository"
    v-for="(tab, slug) in tabs"
    :key="tab"
    :to="{
      name: slug,
      params: { organization, repository },
    }"
    :class="{ active: selectedTab === tab }"
    @click="tabRef = slug"
    >{{ tab }}</RouterLink
  >
  <router-view></router-view>
</template>
