<script setup>
import { ref, computed } from "vue";
let mitArray = ref([1, 2, 3, 4, 5, 6]);

const maxArray = 6;

const fillPercent = computed(() => (mitArray.value.length / maxArray) * 100);
console.log(fillPercent);
</script>

<template>
  <div class="progress-bar">
    <img
      class="progress_overlay"
      src="../img/progressbar_overlay_100_icons_lightergreen.svg"
      alt=""
    />
    <div class="progress_color" :style="{ width: fillPercent + '%' }"></div>
  </div>
</template>
