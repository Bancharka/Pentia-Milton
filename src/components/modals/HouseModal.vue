<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  owners: {
    type: Array,
    default: () => [],
  },
  manager: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="house-modal" @click.self="emit('close')">
      <div class="house-modal__content">
        <button class="house-modal__close" @click="emit('close')">
          ✕
        </button>

        <h2 class="house-modal__title">Mit hus</h2>

        <div class="house-modal__section">
          <p class="house-modal__heading">Ejere</p>

          <div
            v-for="owner in owners"
            :key="owner.email"
            class="house-modal__person"
          >
            <div class="house-modal__person-info">
              <p class="house-modal__name">{{ owner.name }}</p>
              <p class="house-modal__email">{{ owner.email }}</p>
            </div>

            <img
              class="house-modal__avatar"
              :src="owner.image"
              :alt="owner.name"
            />
          </div>
        </div>

        <div class="house-modal__section">
          <p class="house-modal__heading">Byggeleder</p>

          <div class="house-modal__person">
            <div class="house-modal__person-info">
              <p class="house-modal__name">{{ manager.name }}</p>
              <p class="house-modal__email">{{ manager.email }}</p>
            </div>

            <img
              class="house-modal__avatar"
              :src="manager.image"
              :alt="manager.name"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>