<script setup>
import { ref, onMounted } from "vue";
import Header from "@/components/Header.vue";
import BottomNav from "@/components/BottomNav.vue";
import TodoCard from "@/components/TodoCard.vue";
import SearchInput from "@/components/SearchInput.vue";
import { useHouseStore } from "@/stores/houseStore";
import { computed } from "vue";

const store = useHouseStore();
const searchQuery = ref("");


const filteredList = computed(() =>
  store.todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

onMounted(async () => {
  await store.loadHouse();
});
</script>

<template>
  <div class="page-container">
    <Header />
    <div class="site-container site-container--secondary">
      <SearchInput v-model="searchQuery" placeholder="Search" />      <div class="todo-list">
        <TodoCard
          v-for="(todo, index) in filteredList" 
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