<script setup>
import BaseButton from "@/components/BaseButton.vue";
import LoginInput from "@/components/LoginInput.vue";
import BottomNav from "@/components/BottomNav.vue";
import TodoCard from "@/components/TodoCard.vue";
</script>
<template>
  <div class="todo-list">
    <TodoCard task="Gør noget" />
    <TodoCard task="Pap væg" />
    <TodoCard task="Hammer noget" />
  </div>

  <BaseButton text="Klik" variant="primary" link="/home" />

  <BaseButton text="På" variant="secondary" link="/about" />

  <BaseButton text="Mig" variant="outline" link="/contact" />

  <LoginInput />

  <BottomNav />
</template>
<script>
export default {
  components: {
    TodoCard,
  },
};
</script>
