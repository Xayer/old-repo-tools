<script setup lang="ts">
import Tags from "@/components/Tags.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const repository = computed(() => useRoute().params.repository);
const organization = computed(() => useRoute().params.organization);
</script>

<template>
  <aside class="greetings">
    <h1 class="green">Repo Tools</h1>
    <h4>Because we all hate our manual deployments</h4>
    <hr />

    <Tags :organization="organization" :repository="repository" />
  </aside>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
