<template>
  <div class="login-input">
    <div class="input-field">
      <span class="icon">✉️</span>
      <input type="email" placeholder="Mail" v-model="email" />
    </div>

    <div class="input-field">
      <span class="icon">🔑</span>
      <input type="password" placeholder="Adgangskode" v-model="password" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
</script>
