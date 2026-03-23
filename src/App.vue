<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <img class="mobile-frame" src="@/assets/mobile-frame.png" alt="mobile frame" />
  <div class="phone-wrapper">
    <div class="mobile-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
