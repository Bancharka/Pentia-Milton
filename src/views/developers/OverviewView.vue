<script setup>
import BottomNav from "@/components/BottomNav.vue";
import Header from "@/components/Header.vue";
import HouseCard from "@/components/HouseCard.vue";
import SearchInput from "@/components/SearchInput.vue";
</script>
<template>
  <div class="page-container">
    <Header />
    <div class="site-container site-container--primary">
      <div class="overview">
        <SearchInput placeholder="Søg efter hus" />
        <HouseCard />
        <HouseCard />
        <HouseCard />
        <HouseCard />
        <BottomNav />
      </div>
    </div>
  </div>
</template>
