<template>
  <label class="todo-card" :class="{ 'todo-card--checked': isChecked }">
    <input v-model="isChecked" type="checkbox" class="todo-card__checkbox" />

    <span class="todo-card__text">{{ task }}</span>
  </label>
</template>

<script>
export default {
  name: "TodoCard",
  props: {
    task: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isChecked: this.checked,
    };
  },
};
</script>
