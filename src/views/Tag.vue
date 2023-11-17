<script setup lang="ts">
import Tag from '@/components/Tag.vue'
import { useRouteParams } from '@vueuse/router'
import { computed } from 'vue'

const repository = useRouteParams('repository')
const organization = useRouteParams('organization')
const tag = useRouteParams('tag')
</script>

<template>
    <Tag :repository="repository" :organization="organization" :tag="tag" />
</template>
