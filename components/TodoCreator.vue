<template>
  <div>
    <!-- <input type="text" v-model="title"/> -->
    <input
      :value="title"
      type="text"
      :placeholder="placeholder"
      @input="title = $event.target.value"
      @keypress.enter="createTodo"
    />
    <button type="button" @click="createTodo">추가</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      placeholder: "할 일을 입력하세요"
    };
  },
  methods: {
    createTodo() {
      const validTitle = this.title && this.title.trim();

      if (!validTitle) {
        alert("유효하지 않은 제목입니다.");
        this.title = this.title.trim();
        return;
      }

      this.$emit("create-todo", this.title);
      this.title = "";
    }
  }
};
</script>