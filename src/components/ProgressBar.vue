<script setup>
import { ref, computed, watch, watchEffect, onMounted } from "vue";
import { useHouseStore } from "@/stores/houseStore";
import { useUserStore } from "@/stores/userStore";

import houseFoundation from "../img/House-foundation.png";
import houseWalls from "../img/House-walls.png";
import houseWallsRoof from "../img/House-walls-roof.png";
import houseDone from "../img/House-done.png";

const houseStore = useHouseStore();
const userStore = useUserStore();

onMounted(() => {
    houseStore.loadTodos();
    userStore.loadUser();
});

watchEffect(() => console.log("Velkommen til", userStore.userData?.name, "!"));

const maxArray = computed(() => houseStore.todos.flatMap((todo) => todo.subTodos));
const mitArray = computed(() => maxArray.value.filter((todo) => todo.done === true));

const fillPercent = computed(() => (mitArray.value.length / maxArray.value.length) * 100);

watchEffect(() => console.log("Procent færdigt:", fillPercent.value));


const dynamicHouse = computed(() => {
    if (fillPercent.value <= 25) return houseFoundation;
    if (fillPercent.value <= 50) return houseWalls;
    if (fillPercent.value <= 75) return houseWallsRoof;
    return houseDone; // covers 75-100%
});
</script>

<template>
  <!-- <div v-for="todo in store.todos" :key="todo.id">
      <h3> {{ todo.title }}</h3>
      <p v-for="sub in todo.subTodos" :key="sub.id">
        {{ sub.title }}
        <p v-if="sub.done == false"> Mangler </p>
        <p v-else> Færdig</p>
      </p>
    </div> -->
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
