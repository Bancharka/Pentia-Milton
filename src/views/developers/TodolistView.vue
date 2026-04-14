<script setup>
import Header from "@/components/Header.vue";
import BottomNav from "@/components/BottomNav.vue";
import TodoCard from "@/components/TodoCard.vue";
import SearchInput from "@/components/SearchInput.vue";
</script>

<template>
  <div class="page-container">
    <Header />
    <div class="site-container site-container--secondary">
      <SearchInput placeholder="Search" />
      <div class="todo-list">
        <TodoCard task="Drik en monster" />
        <TodoCard task="Spis et ur" />
        <TodoCard task="Gør noget dumt" />
        <TodoCard task="Mob Clara" />
        <TodoCard task="Tegn en tegning" />
        <TodoCard task="Grib en ært" />
        <TodoCard task="Byg en urte" />
      </div>
    </div>
    <BottomNav />
  </div>
</template>
