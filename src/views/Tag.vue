<script setup lang="ts">
import Tag from "@/components/Tag.vue";
import { computed } from "vue";
import { useRouteQuery } from "@vueuse/router";

const repository = useRouteQuery("repository");
const organization = useRouteQuery("organization");
const tag = useRouteQuery("tag");
</script>

<template>
  <Tag :repository="repository" :organization="organization" :tag="tag" />
</template>
