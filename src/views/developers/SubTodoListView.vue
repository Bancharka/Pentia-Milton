<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import BottomNav from "@/components/BottomNav.vue";
import TodoCard from "@/components/TodoCard.vue";
import { useHouseStore } from "@/stores/houseStore";
import { useHouses } from "@/firebaseLogic/useHouses";
import { getSubTodos, applyToggle } from "@/utils/todoHelpers";

const store = useHouseStore();
const { updateSubTodoDone } = useHouses();
const { updateSubTodoDoneById } = useHouses();
const route = useRoute();
const subTodos = ref([]);
const todoTitle = ref("");
const todoIndex = Number(route.params.todoIndex);

onMounted(async () => {
  await store.loadHouseById(route.params.houseId);
  subTodos.value = getSubTodos(store.todos, todoIndex);
  todoTitle.value = store.todos[todoIndex]?.title ?? "";
});

async function handleCheck(subTodoIndex) {
  const { updated, newDone } = applyToggle(subTodos.value, subTodoIndex);
  subTodos.value = updated;
  await updateSubTodoDoneById(route.params.houseId, todoIndex, subTodoIndex, newDone);
}

</script>

<template>
  <div class="page-container">
    <div class="header">
      <button onclick="history.back()" class="header__button">
        <img src="@/assets/icons/back-arrow.svg" alt="back-arrow" />
      </button>
      <h2 class="header__title">{{ todoTitle }}</h2>
      <div class="header__spacer"></div>
    </div>
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