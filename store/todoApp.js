export default {
  namespaced: true,
  state: () => ({
    db: null,
    todos: []
  }),
  getters: {
    total(state) {
      return state.todos.length;
    },
    activeCount(state) {
      return state.todos.filter(todo => !todo.done).length;
    },
    completedCount(state, getters) {
      return getters.total - getters.activeCount;
    }
  },
  mutations: {
    assignDB(state, db) {
      state.db = db;
    },
    assignTodos(state, todos) {
      state.todos = todos;
    }
  },
  actions: {
    initDB({ state, commit }) {
      const adapter = new LocalStorage("todo-app");
      // state.db = lowdb(adapter);
      commit("assignDB", lowdb(adapter));

      const hasTodos = state.db.has("todos").value();

      if (hasTodos) {
        // state.todos = _cloneDeep(state.db.getState().todos);
        commit("assignTodos", _cloneDeep(state.db.getState().todos))
      } else {
        // Local DB 초기화
        state.db
          .defaults({
            todos: [] // Collection
          })
          .write();
      }
    }
  }
}