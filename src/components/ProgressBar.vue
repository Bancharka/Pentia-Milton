<script setup>
import { computed } from "vue";
import { useHouseStore } from "@/stores/houseStore";


import houseFoundation from "../img/House-foundation.png";
import houseWalls from "../img/House-walls.png";
import houseWallsRoof from "../img/House-walls-roof.png";
import houseDone from "../img/House-done.png";

const houseStore = useHouseStore();





// max tager alle subtodos og lægger dem sammen til ét array
const max = computed(() => houseStore.todos.flatMap((todo) => todo.subTodos));
const done = computed(() => max.value.filter((todo) => todo.done === true));

// Regner procentværdien for todos - done/total*100
const fillPercent = computed(() => (done.value.length / max.value.length) * 100);



const dynamicHouse = computed(() => {
    if (fillPercent.value <= 25) return houseFoundation;
    if (fillPercent.value <= 50) return houseWalls;
    if (fillPercent.value <= 75) return houseWallsRoof;
    return houseDone; // 
});
</script>

<template>
   
  <div class="page-container"> 
    <div class="house-card">
      <h3>Her kan du følge med i byggeprocessen af dit hus</h3>

      <div>
        <img :src="dynamicHouse" />
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
  </div>
</template>
