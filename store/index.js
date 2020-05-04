import Vue from "vue"
import Vuex from "vuex"

import todoApp from "./todoApp"

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.node_env !== 'production',
  // // Data
  // state: {},
  // // Computed
  // getters: {},
  // // Methods: 실제 값을 변경할 때(비동기X, state 변경O)
  // mutations: {},
  // // Methods: 일반 로직(비동기O, state 변경X)
  // actions: {}
  modules: {
    todoApp
  }
});
