<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import BottomNav from "@/components/BottomNav.vue";
import TodoCard from "@/components/TodoCard.vue";
import SearchInput from "@/components/SearchInput.vue";
import { useHouseStore } from "@/stores/houseStore";

const store = useHouseStore();

onMounted(async () => {
  await store.loadHouse();
});
</script>

<template>
  <div class="page-container">
    <Header />
    <div class="site-container site-container--secondary">
      <SearchInput placeholder="Search" />
      <div class="todo-list">
        <TodoCard
          v-for="(todo, index) in store.todos"
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