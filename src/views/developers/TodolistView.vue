<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import BottomNav from "@/components/BottomNav.vue";
import TodoCard from "@/components/TodoCard.vue";
import { useTodos } from "@/firebaseLogic/useTodos";

const { fetchHouseTodos } = useTodos();
const router = useRouter();

const todos = ref([]);

onMounted(async () => {
  todos.value = await fetchHouseTodos();
});
</script>

<template>
  <div class="page-container">
    <Header />
    <div class="site-container site-container--secondary">
      <div class="todo-list">
        <TodoCard
          v-for="(todo, index) in todos"
          :key="index"
          :task="todo.title"
          :checked="todo.done"
          :link="`/todos/${index}`"
        />
      </div>
    </div>
    <BottomNav />
  </div>
</template>