<script setup>
defineProps({
  placeholder: {
    type: String,
    default: "Søg...",
  },
});
</script>
<template>
  <div class="searchinput">
    <span>
      <img
        src="@/assets/icons/magnifyingglass.svg"
        alt="Forstørrelsesglas"
        class="searchinput__icon"
      />
    </span>
    <input type="text" :placeholder="placeholder" />
  </div>
</template>
