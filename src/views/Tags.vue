<script>
import Tags from "@/components/Tags.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const repository = computed(() => useRoute().params.repository);
const organization = computed(() => useRoute().params.organization);
const tag = computed(() => useRoute().params.tag);
const store = useStore();
const selectedTags = computed(() => store.state.tags.selectedTags);

const resetSelectedTags = () => {
  store.dispatch("tags/resetTags");
};

console.log(selectedTags.value);
</script>
<template>
  <nav>
    <RouterLink
      v-if="(selectedTags.value || []).length > 0 && organization && repository"
      :to="`/${organization}/${repository}/tags/selected/${selectedTags.join(
        ','
      )}`"
      >COMPARE</RouterLink
    >
    <a
      v-if="selectedTags.length && organization && repository"
      @click.stop.prevent="resetSelectedTags"
      >X</a
    >
  </nav>
  <Tags
    v-if="!!repository && !!organization"
    :organization="organization"
    :repository="repository"
  />
</template>
