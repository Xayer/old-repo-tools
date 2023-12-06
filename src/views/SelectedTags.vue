<script setup lang="ts">
import { computed } from 'vue'
import Tag from '@/components/Tag.vue'
import { useRouteParams } from '@vueuse/router'

const repository = useRouteParams('repository')
const organization = useRouteParams('organization')

const tags = computed(() => {
    const tags = useRouteParams('tags').value as string
    return tags ? tags.split(',') : []
})
</script>
<template>
    <div v-if="!!(organization && repository && tags)">
        <Tag
            :repository="repository"
            :organization="organization"
            v-for="tag in tags"
            :key="tag"
            :tag="tag"
        />
    </div>
    <p v-else>No tags found</p>
</template>
