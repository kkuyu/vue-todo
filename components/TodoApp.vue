<template>
  <div>
    <todo-item />
    <todo-creator @create-todo="createTodo" />
  </div>
</template>

<script>
import lowdb from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
import CryptoRandomString from "crypto-random-string";

import TodoCreator from "./TodoCreator";
import TodoItem from "./TodoItem";

export default {
  components: {
    TodoCreator,
    TodoItem
  },
  data() {
    return {
      db: null
    };
  },
  created() {
    this.initDB();
  },
  methods: {
    initDB() {
      const adapter = new LocalStorage("todo-app");
      this.db = lowdb(adapter);

      // Local DB 초기화
      this.db
        .defaults({
          todos: [] // Collection
        })
        .write();
    },
    createTodo(title) {
      const newTodo = {
        id: CryptoRandomString({ length: 10 }),
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
        done: false
      };

      this.db
        .get("todos")
        .push(newTodo)
        .write();
    }
  }
};
</script>