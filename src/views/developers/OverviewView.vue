<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "@/firebase";
import BottomNav from "@/components/BottomNav.vue";
import Header from "@/components/Header.vue";
import HouseCard from "@/components/HouseCard.vue";
import SearchInput from "@/components/SearchInput.vue";

const houses = ref([]);

onMounted(async () => {
  const snap = await getDocs(
    query(collection(db, "houses"), where("uid", "==", auth.currentUser.uid))
  );
  houses.value = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});
</script>
<template>
  <div class="page-container">
    <Header />
    <div class="site-container site-container--primary">
      <div class="overview">
        <SearchInput placeholder="Søg efter hus" />
        <HouseCard
        v-for="house in houses"
        :key="house.id"
        :address="house.address"
        :postalCode="house.postalCode"
        :city="house.city"
        :registration="house.registration"
        :image="house.image"
        />
        <BottomNav />
      </div>
    </div>
  </div>
</template>
