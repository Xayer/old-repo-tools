<script setup lang="ts">
import { computed } from 'vue'
import WelcomeItem from '@/components/WelcomeItem.vue'
import Loader from '@/components/Loader.vue'
import ToolingIcon from '@/components/icons/IconTooling.vue'
import { useFetchAllRepositoriesForOrganization } from '@/queries/repositories'

const props = defineProps(['organization', 'repository'])

const organization = computed(() => props.organization)

const enableQuery = computed(() => !!organization.value)

const {
    isLoading,
    isFetching,
    isError,
    data: repositories,
    error,
} = useFetchAllRepositoriesForOrganization({
    organization: organization.value,
    enabled: enableQuery.value,
})
</script>
<template>
    <div v-if="isLoading || isFetching"><Loader /></div>
    <div v-if="isError">Error: {{ error }}</div>
    <div v-if="repositories">
        <ul>
            <WelcomeItem
                v-for="repository in repositories"
                :key="repository.name"
            >
                <template #icon>
                    <ToolingIcon />
                </template>
                <router-link
                    v-if="!!organization && !!repository"
                    :to="{
                        name: 'repository',
                        params: { organization, repository: repository.name },
                        query: { organization, repository: repository.name },
                    }"
                    >{{ repository.name }}</router-link
                >
            </WelcomeItem>
        </ul>
    </div>
</template>
