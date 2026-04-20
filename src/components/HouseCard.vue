<script setup>
defineProps({ address: String, postalCode: String, city: String, registration: String });
</script>

<template>
  <div class="housecard">
    <img class="housecard__img" src="@/assets/img/house.png" alt="Hus" />
    <div class="housecard__title">
      <h4>{{ address }}, {{ city }} {{ postalCode }}</h4>
      <p class="subheading">{{ registration }}</p>
    </div>
  </div>
</template>
