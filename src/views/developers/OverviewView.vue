<script setup>
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { useHouseStore } from "@/stores/houseStore";
import Header from "@/components/Header.vue";
import BottomNav from "@/components/BottomNav.vue";
import HouseCard from "@/components/HouseCard.vue";
import SearchInput from "@/components/SearchInput.vue";

const store = useHouseStore();
const searchQuery = ref("");
const router = useRouter();

const filteredList = computed(() =>
  store.houses.filter((house) =>
    house.address.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  .sort((a, b) => Number(a['postal-code']) - Number(b['postal-code']))
);

function goToHouse(houseId) {
  router.push(`/houses/${houseId}`);
}



onMounted(async () => {
  await store.loadAllHouses();
});


</script>
<template>
  <div class="page-container">
    <Header />
    <div class="site-container site-container--primary">
      <div class="overview">
        <SearchInput v-model="searchQuery" placeholder="Search" />
        <HouseCard
        v-for="house in filteredList"
        :key="house.id"
        :address="house.address"
        :postalCode="house['postal-code']"
        :city="house.city"
        :registration="house.registration"
        :image="house.image"
        @click="goToHouse(house.id)"
        />
        <BottomNav />
      </div>
    </div>
  </div>
</template>
