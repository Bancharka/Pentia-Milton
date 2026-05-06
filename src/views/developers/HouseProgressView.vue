<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import BottomNav from "@/components/BottomNav.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useHouseStore } from "@/stores/houseStore";

const store = useHouseStore();
const route = useRoute();

onMounted(async () => {
  await store.loadHouseById(route.params.houseId);
});

function goToTodos() {
  router.push(`/houses/${route.params.houseId}/todos`);
}
</script>

<template>
  <div class="page-container">
    <Header />
    <ProgressBar :withButton="true" />
    <BottomNav />
  </div>
</template>