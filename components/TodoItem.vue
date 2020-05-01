<template>
  <div class="todo-item">
    <div v-if="isEditMode" class="item__inner item--edit">
      <input
        ref="titleInput"
        :value="editedTitle"
        type="text"
        @input="editedTitle = $event.target.value"
        @keypress.enter="editedTodo"
        @keypress.esc="offEditMode"
      />
      <div class="item__actions">
        <button key="complete" type="button" @click="editedTodo">완료</button>
        <button key="cancel" type="button" @click="offEditMode">취소</button>
      </div>
    </div>
    <div v-else class="item__inner item--normal">
      <input type="checkbox" v-model="done" />
      <div class="item__title-wrap">
        <div class="item__title">{{todo.title}}</div>
        <div class="item__date">{{date}}</div>
      </div>
      <div class="item__actions">
        <button key="update" type="button" @click="onEditMode">수정</button>
        <button key="delete" type="button" @click="deleteTodo">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    todo: Object
  },
  data() {
    return {
      isEditMode: false,
      editedTitle: ""
    };
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
    editedTodo() {
      if (this.todo.title !== this.editedTitle) {
        this.updateTodo({
          title: this.editedTitle,
          updateAt: new Date()
        });
      }

      this.offEditMode();
    },
    onEditMode() {
      this.isEditMode = true;
      this.editedTitle = this.todo.title;

      this.$nextTick(() => {
        this.$refs.titleInput.focus();
      });
    },
    offEditMode() {
      this.isEditMode = false;
    },
    updateTodo(value) {
      this.$emit("update-todo", this.todo, value);
    },
    deleteTodo() {
      this.$emit("delete-todo", this.todo);
    }
  }
};
</script>