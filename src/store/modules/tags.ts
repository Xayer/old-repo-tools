import { createStore } from "vuex";

interface State {
  selectedTags: string[];
}

const store = createStore<State>({
  state: () => ({
    selectedTags: [],
  }),
  getters: {
    selectedTags: (state) => state.selectedTags,
  },
  actions: {
    setSelectedTags({ commit }, tags) {
      commit("setSelectedTags", tags);
    },
    resetTags({ commit }) {
      commit("resetTags");
    },
  },
  mutations: {
    setSelectedTags(state, tags) {
      state.selectedTags = tags;
    },
    resetTags: (state) => {
      state.selectedTags = [];
    },
  },
});

export default store;
