<script setup>    
import { ref } from 'vue';

const props = defineProps({
  task: { type: String, required: true,}, 
  checked: { type: Boolean, default: false,},
  link: { type: String, default: null },
});

const isChecked = ref(props.checked)
</script>

<template>
  <RouterLink v-if="link" :to="link" class="todo-card" :class="{ 'todo-card--checked': isChecked }">
    <input type="checkbox" class="todo-card__checkbox" :checked="checked" disabled />   
    <span class="todo-card__text">{{ task }}</span>
  </RouterLink>

  <label v-else class="todo-card" :class="{ 'todo-card--checked': isChecked }">
    <input v-model="isChecked" type="checkbox" class="todo-card__checkbox" />
    <span class="todo-card__text">{{ task }}</span>
  </label>
</template>

