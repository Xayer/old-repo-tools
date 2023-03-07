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
      Create [a classic Github Access
      Token](https://github.com/settings/tokens/new) and paste it here. Remember
      to enable SAML if required
    </p>
    <form @submit.stop.prevent="setToken">
      <input type="text" v-model="newToken" />
      <button type="submit">Save</button>
    </form>
    <pre>{{
      {
        newToken,
      }
    }}</pre>
  </div>
  <slot v-else />
</template>
