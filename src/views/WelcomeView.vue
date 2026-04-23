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
        <!-- Denne side burde vi reelt ikke have brug for, da vi bare kan route brugerne anderledes med auth, afhænging om de er byggeleder eller bygherre. Men det er beholdt  for at leve op til designet -->
        <BaseButton variant="secondary" text="Bygherre" link="/login" />
        <BaseButton variant="outline" text="Byggeleder" link="/login" />
      </div>
    </div>
  </div>
</template>
