<template>
  <RouterLink
    :to="{
      name: 'organization',
      params: { organization: 'cardlay' },
      query: { organization: 'cardlay' },
    }"
    >cardlay</RouterLink
  >
</template>
