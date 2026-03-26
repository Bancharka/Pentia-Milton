<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const isHome = computed(() => route.name === "home" || route.name === "welcome");
const title = computed(() => route.meta.title);
</script>

<template>
  <div class="header">
    <button class="header__button">
      <img src="@/assets/icons/back-arrow.svg" alt="back-arrow" />
    </button>
    <h2 class="header__title">{{ title }}</h2>
  </div>
</template>
