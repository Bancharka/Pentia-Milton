<script setup>
import { ref, computed } from "vue";
import { defineStore } from "pinia";

import houseFoundation from "../img/House-foundation.png";
import houseWalls from "../img/House-walls.png";
import houseWallsRoof from "../img/House-walls-roof.png";
import houseDone from "../img/House-done.png";


let mitArray = ref([1, 2, 3, 4, 5, 6]); //navngiv noget mere sigende, skift steder det er brugt

const maxArray = 6; // den her skal ideelt være dynamisk, hvis der bliver tilføjet flere poster

const fillPercent = computed(() => (mitArray.value.length / maxArray) * 100);
console.log(fillPercent.value + "%");

const dynamicHouse = computed(() => {    
  if (fillPercent.value <= 25) return houseFoundation;
  if (fillPercent.value <= 50) return houseWalls;
  if (fillPercent.value <= 75) return houseWallsRoof;
  if (fillPercent.value = 100) return houseDone;
  
});
</script>

<template>
<div class="house-card">
  <h3>Her kan du følge med i byggeprocessen af dit hus</h3>

  <div>
    <img :src="dynamicHouse">
  </div>

  <div class="house-card__progress-bar">
    <img
      class="house-card__progress-bar__overlay"
      src="../img/progressbar_overlay_100_icons_lightergreen.svg"
      alt=""
    />
    <div class="house-card__progress-bar__fill" :style="{ width: fillPercent + '%' }"></div>
  </div>

</div>
</template>
