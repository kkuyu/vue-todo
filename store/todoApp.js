import Vue from "vue";
import lowdb from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
import cryptoRandomString from "crypto-random-string";
import _assign from "lodash/assign";
import _findIndex from "lodash/findIndex";
import _cloneDeep from "lodash/cloneDeep";
import _find from "lodash/find";
import _forEachRight from "lodash/forEachRight";

export default {
  namespaced: true,
  state: () => ({
    db: null,
    todos: [],
    filter: "all"
  }),
  getters: {
    filteredTodos(state) {
      switch (state.filter) {
        case "all":
        default:
          return state.todos;
        case "active":
          return state.todos.filter(todo => !todo.done);
        case "completed":
          return state.todos.filter(todo => todo.done);
      }
    },
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
    createDB(state, newTodo) {
      state.db
        .get("todos")
        .push(newTodo)
        .write();
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
    deleteDB(state, todo){
      state.db
        .get("todos")
        .remove({ id: todo.id })
        .write();
    },
    assignTodos(state, todos) {
      state.todos = todos;
    },
    assignTodo(state, { foundTodo, value }) {
      _assign(foundTodo, value);
    },
    updateTodo(state, { todo, key, value }) {
      todo[key] = value;
    },
    deleteTodo(state, foundIndex) {
      Vue.delete(state.todos, foundIndex);
    },
    pushTodo(state, newTodo) {
      state.todos.push(newTodo);
    },
    updateFilter(state, filter) {
      state.filter = filter;
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
    },
    deleteTodo({ state, commit }, todo) {
      // state.db
      //   .get("todos")
      //   .remove({ id: todo.id })
      //   .write();
      commit("deleteDB", todo);

      const foundIndex = _findIndex(state.todos, { id: todo.id });

      // Vue.delete(state.todos, foundIndex);
      commit("deleteTodo", foundIndex);
    },
    completeAll({ state, commit }, checked) {
      // DB
      const newTodos = state.db
        .get("todos")
        .forEach(todo => {
          // todo.done = checked;
          commit("updateTodo", {
            todo,
            key: "done",
            value: checked
          })
        })
        .write();

      // Local todos
      //   this.todos.forEach(todo => {
      //     todo.done = checked;
      //   });
	  //   state.todos = _cloneDeep(newTodos);
	  commit("assignTodos", _cloneDeep(newTodos));
    },
    clearCompleted({ state, dispatch }) {
      _forEachRight(state.todos, todo => {
        if (todo.done) {
          // this.deleteTodo(todo);
          dispatch("deleteTodo", todo);
        }
      });
    }
  }
}
