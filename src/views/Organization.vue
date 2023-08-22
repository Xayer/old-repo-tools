<script setup>
import Organization from "@/components/Organization.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const repository = computed(() => useRoute().params.repository);
const organization = computed(() => useRoute().params.organization);
</script>
<template>
  <Organization
    v-if="!!organization && !repository"
    :organization="organization"
  />
  <router-view></router-view>
</template>
