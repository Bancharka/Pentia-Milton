<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import BottomNav from "@/components/BottomNav.vue";
import TodoCard from "@/components/TodoCard.vue";
import { useTodos } from "@/firebaseLogic/useTodos";

const route = useRoute();
const { fetchSubTodos, updateSubTodoDone } = useTodos();

const subTodos = ref([]);
const todoIndex = Number(route.params.todoIndex);

onMounted(async () => {
  subTodos.value = await fetchSubTodos(todoIndex);
});

async function handleCheck(subTodoIndex) {
  const current = subTodos.value[subTodoIndex].done;
  await updateSubTodoDone(todoIndex, subTodoIndex, !current);
  subTodos.value[subTodoIndex].done = !current;
}
</script>

<template>
  <div class="page-container">
    <Header />
    <div class="site-container site-container--secondary">
      <div class="todo-list">
        <TodoCard
          v-for="(sub, index) in subTodos"
          :key="index"
          :task="sub.title"
          :checked="sub.done"
          @change="handleCheck(index)"
        />
      </div>
    </div>
    <BottomNav />
  </div>
</template>