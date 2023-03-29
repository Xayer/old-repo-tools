<script setup lang="ts">
import Tag from "@/components/Tag.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const repository = computed(() => useRoute().params.repository);
const organization = computed(() => useRoute().params.organization);
const tag = computed(() => useRoute().params.tag);
</script>

<template>
  <Tag :repository="repository" :organization="organization" :tag="tag" />
</template>
