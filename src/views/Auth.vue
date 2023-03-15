<script setup lang="ts">
import { getTokenFromStorage } from "@/config";
import { computed, ref } from "vue";
const hasToken = computed(() => !!getTokenFromStorage());

const newToken = ref("");

const setToken = () => {
  localStorage.setItem("token", newToken.value);
  window.location.reload();
};
</script>
<template>
  <div v-if="!hasToken">
    <p>
      Create
      <a href="https://github.com/settings/tokens/new"
        >a classic Github Access Token</a
      >
      and paste it here. Remember to enable SAML if required
    </p>
    <form @submit.stop.prevent="setToken">
      <input type="text" v-model="newToken" />
      <button type="submit">Save</button>
    </form>
  </div>
  <slot v-else />
</template>
