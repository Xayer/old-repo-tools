<script setup lang="ts">
import Tags from "@/components/Tags.vue";
import Organization from "@/components/Organization.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const repository = computed(() => useRoute().params.repository);
const organization = computed(() => useRoute().params.organization);
const selectedTags = computed(() => useStore().state.tags.selectedTags);
const store = useStore();

const resetSelectedTags = () => {
  store.dispatch("tags/resetTags");
};
</script>

<template>
  <aside class="greetings">
    <h1 class="green">Repo Tools</h1>
    <header>
      <div>
        <nav>
          <RouterLink
            v-if="organization"
            class="green"
            :to="`/${organization}`"
          >
            {{ organization }}
          </RouterLink>
          <RouterLink
            class="green"
            v-if="repository"
            :to="`/${organization}/${repository}`"
          >
            {{ repository }}
          </RouterLink>
        </nav>
      </div>
      <div>
        <nav>
          <a v-if="selectedTags.length">COMPARE</a>
          <a @click.stop.prevent="resetSelectedTags" v-if="selectedTags.length"
            >X</a
          >
        </nav>
      </div>
    </header>
    <hr />

    <Tags
      v-if="!!(organization && repository)"
      :organization="organization"
      :repository="repository"
    />
    <Organization
      v-if="!!organization && !repository"
      :organization="organization"
    />
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

aside header {
  display: flex;
  justify-content: space-between;
  align-items: self-end;
  margin-bottom: 1rem;
  padding-right: 0;
}
</style>
