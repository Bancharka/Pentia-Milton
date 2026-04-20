<template>
  <router-link v-if="link" :to="link" :class="['btn', `btn--${variant}`]">
    {{ text }}
  </router-link>
 <button v-else :type="type" :class="['btn', `btn--${variant}`]">
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: String,
  link: String,
  variant: {
    type: String,
    default: "primary",
  },
  type: {
    type: String,
    default: "button",
  },
});
</script>
