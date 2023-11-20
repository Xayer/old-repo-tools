<script setup lang="ts">
import { computed } from 'vue'
import WelcomeItem from '@/components/WelcomeItem.vue'
import Loader from '@/components/Loader.vue'
import ToolingIcon from '@/components/icons/IconTooling.vue'
import { useFetchAllRepositoriesForOrganization } from '@/queries/repositories'
import OrganizationTable from '@/components/OrganizationTable.vue'

const props = defineProps(['organization', 'repository'])

const organization = computed(() => props.organization)
</script>
<template>
    <OrganizationTable :organization="organization" />
</template>
