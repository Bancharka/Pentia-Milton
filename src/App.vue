<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="phone-wrapper">
    <div class="mobile-container">
      <div class="page-container">
        <img
          src="@/assets/status-bar.png"
          alt="Phone status bar"
          class="page-container__phone-status"
        />
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
