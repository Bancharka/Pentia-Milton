<template>
  <router-link :to="link" :class="['btn', `btn--${variant}`]">
    {{ text }}
  </router-link>
</template>

<script setup>
defineProps({
  text: String,
  link: String,
  variant: {
    type: String,
    default: "primary",
  },
});
</script>
