export default {
  namespaced: true,
  state: () => ({
    a: 123,
    b: []
  }),
  getters: {
    someGetter1(state, getters) {
      return state.a + 1;
    },
    someGetter2(state, getters) {
      return state.a + getters.someGetter1;
    }
  },
  mutations: {
    someMutations(state, payload) {
      state.a = 789;
      state.b.push(payload);
    }
  },
  actions: {
    someAction1(context, payload) {
      const { state, getters, commit, dispatch } = context;
      commit("someMutations", payload);
      dispatch("someAction1", payload);
    },
    someAction2({ state, getters, commit, dispatch }, payload) {
      commit("someMutations", payload);
      dispatch("someAction1", payload);
    },
    someAction3(context, payload) {
      context.commit("someMutations", payload);
      context.dispatch("someAction1", payload);
    }
  }
};
