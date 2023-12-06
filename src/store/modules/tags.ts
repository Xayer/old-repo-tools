import type { GithubTag } from '@/api/github'
import type { ActionContext } from 'vuex'

interface State {
    selectedTags: string[]
}

const store = {
    namespaced: true,
    state: () => ({
        selectedTags: [],
    }),
    getters: {
        selectedTags: (state: State) => state.selectedTags,
    },
    actions: {
        setSelectedTags(
            { commit }: ActionContext<State, {}>,
            tags: GithubTag['name'][]
        ) {
            commit('setSelectedTags', tags)
        },
        resetTags({ commit }: ActionContext<State, {}>) {
            commit('resetTags')
        },
    },
    mutations: {
        setSelectedTags(state: State, tags: GithubTag['name'][]) {
            state.selectedTags = tags
        },
        resetTags: (state: State) => {
            state.selectedTags = []
        },
    },
}

export default store
