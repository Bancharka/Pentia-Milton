<script setup>
import { ref, onMounted } from "firebase/storage";
import BottomNav from "@/components/BottomNav.vue";
import Header from "@/components/Header.vue";
import HouseCard from "@/components/HouseCard.vue";
import SearchInput from "@/components/SearchInput.vue";
import { useHouses } from "@/firebaseLogic/useHouses";

const { fetchHouses, createHouseFromTemplate } = useHouses;
const houses = ref([]);
</script>
<template>
  <div class="page-container">
    <Header />
    <div class="site-container site-container--primary">
      <div class="overview">
        <SearchInput placeholder="Søg efter hus" />
        <HouseCard
          address="Emiliedalen 14"
          postal-code="1234"
          city="Varde"
          registration="12345678"
        />
        <HouseCard />
        <HouseCard />
        <HouseCard />
        <BottomNav />
      </div>
    </div>
  </div>
</template>
