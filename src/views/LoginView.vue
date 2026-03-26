<script setup>
import BaseButton from "@/components/BaseButton.vue";
import LoginInput from "@/components/LoginInput.vue";
</script>
<template>
  <BaseButton text="Klik" variant="primary" link="/home" />

  <BaseButton text="På" variant="secondary" link="/about" />

  <BaseButton text="Mig" variant="outline" link="/contact" />

  <LoginInput />
</template>
