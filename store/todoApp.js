import lowdb from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
import cryptoRandomString from "crypto-random-string";
import _assign from "lodash/assign";
import _findIndex from "lodash/findIndex";

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
    updateDB(state, { todo, value }) {
      state.db
        .get("todos")
        .find({
          id: todo.id
        })
        .assign(value)
        .write();
    },
    assignTodo(state, { foundTodo, value }){
      _assign(foundTodo, value);
    },
    assignTodos(state, todos) {
      state.todos = todos;
    },
    createDB(state, newTodo) {
      state.db
        .get("todos")
        .push(newTodo)
        .write();
    },
    pushTodo(state, newTodo) {
      state.todos.push(newTodo);
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
    },
    createTodo({ state, commit }, title) {
      const newTodo = {
        id: cryptoRandomString({ length: 10 }),
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
        done: false
      };

      // Create DB
      // state.db
      //   .get("todos")
      //   .push(newTodo)
      //   .write();
      commit("createDB", newTodo);

      // Create Client
      // state.todos.push(newTodo);
      commit("pushTodo", newTodo);
    },
    updateTodo({ state, commit }, { todo, value }) {
      // state.db
      //   .get("todos")
      //   .find({
      //     id: todo.id
      //   })
      //   .assign(value)
      //   .write();
      commit("updateDB", { todo, value });

      const foundTodo = _find(state.todos, { id: todo.id });
      
      // _assign(foundTodo, value);
      commit("assignTodo", { foundTodo, value });
    }
  }
}