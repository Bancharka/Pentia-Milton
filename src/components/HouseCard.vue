<script setup>
//fallback house image
import defaultHouse from "@/assets/img/house.png"

defineProps({ address: String, postalCode: [String, Number], city: String, registration: String, image: String });
</script>

<template>
  <div class="housecard">
    <img class="housecard__img" :src="image || defaultHouse" alt="Hus" />
    <div class="housecard__title">
      <h4>{{ address }}, {{ city }} {{ postalCode }}</h4>
      <p class="subheading">{{ registration }}</p>
    </div>
  </div>
</template>
