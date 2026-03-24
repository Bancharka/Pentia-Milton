<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const isHome = computed(() => route.name === "home" || route.name === "welcome");
const title = computed(() => route.meta.title);
</script>

<template>
  <button v-if="!isHome" @click="router.back()">
    <img src="@/assets/icons/back-arrow.svg" alt="back-arrow" />
  </button>
  <h1>{{ title }}</h1>
</template>
