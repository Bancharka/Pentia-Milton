<script setup>
import BaseButton from "@/components/BaseButton.vue";
</script>

<template>
  <img src="@/assets/img/house3.png" alt="hus" class="welcome__background" />
  <div class="welcome">
    <img src="@/assets/icons/logo.png" alt="" class="welcome__logo" />
    <div class="welcome__container">
      <div class="page-container">
        <h1 class="welcome__title">Velkommen</h1>
        <BaseButton variant="secondary" text="Bygherre" link="/home" />
        <BaseButton variant="outline" text="Byggeleder" link="/home" />
      </div>
    </div>
  </div>
</template>
