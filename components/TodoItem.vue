<template>
  <div class="todo-item">
    <input type="checkbox" v-model="done" />
    <div class="item__title-wrap">
      <div class="item__title">{{todo.title}}</div>
      <div class="item__date">{{date}}</div>
    </div>
    <div class="item__actions">
      <button type="button" @click="onEditMode">수정</button>
      <button type="button" @click="deleteTodo">삭제</button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    todo: Object
  },
  computed: {
    done: {
      get() {
        return this.todo.done;
      },
      set(currentValueDone) {
        this.updateTodo({
          done: currentValueDone
        });
      }
    },
    date() {
      const date = dayjs(this.todo.createAt);
      const isSame = date.isSame(this.todo.updateAt);

      if (isSame) {
        return date.format("YYYY년 MM월 DD일");
      } else {
        return `${date.format("YYYY년 MM월 DD일")} (edited)`;
      }
    }
  },
  methods: {
    onEditMode() {},
    offEditMode() {},
    updateTodo(value) {
      this.$emit("update-todo", this.todo, value);
    },
    deleteTodo() {
      this.$emit("delete-todo", this.todo);
    }
  }
};
</script>