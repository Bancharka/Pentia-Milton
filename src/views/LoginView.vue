<script setup>
import BaseButton from "@/components/BaseButton.vue";
import LoginInput from "@/components/LoginInput.vue";
</script>
<template>
  <img src="@/assets/img/house4.png" alt="hus" class="login__background" />
  <div class="login">
    <h1 class="login__title">Kom i gang</h1>
    <div class="login__container">
      <div class="login__input">
        <LoginInput />
      </div>
    </div>
  </div>
</template>
