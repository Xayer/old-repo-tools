<script setup>
import Organization from "@/components/Organization.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
const organization = computed(() => useRoute().params.organization);
</script>
<template>Select a Repository from the left</template>
