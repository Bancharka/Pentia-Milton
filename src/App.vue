<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="phone-wrapper">
    <div class="mobile-container">
      <img src="@/assets/status-bar.png" alt="Phone status bar" class="phone-status" />
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
