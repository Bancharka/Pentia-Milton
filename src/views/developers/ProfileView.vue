<script setup>
import { ref } from "vue";
import Header from "@/components/Header.vue";
import BottomNav from "@/components/BottomNav.vue";
import HouseModal from "@/components/modals/HouseModal.vue";

const isHouseModalOpen = ref(false);

const owners = ref([
  {
    name: "Sofie Madsen",
    email: "Sofie_Madsen@gmail.dk",
    image: "/images/profile1.jpg",
  },
  {
    name: "Karsten Madsen",
    email: "Karsten_Madsen@gmail.dk",
    image: "/images/profile2.jpg",
  },
]);

const manager = ref({
  name: "Thomas Jensen",
  email: "Thomas_Jensen@milton.dk",
  image: "/images/manager.jpg",
});

const menuItems = [
  {
    label: "Mit hus",
    icon: "house",
    action: "modal",
  },
  {
    label: "Notifikationer",
    route: "/notifications",
    icon: "bell",
  },
  {
    label: "Sikkerhed",
    route: "/security",
    icon: "shield",
  },
  {
    label: "Privat indstillinger",
    route: "/privacy",
    icon: "key",
  },
  {
    label: "Hjælp",
    route: "/help",
    icon: "help",
  },
];

const handleItemClick = (item) => {
  if (item.action === "modal") {
    isHouseModalOpen.value = true;
  }
};
</script>

<template>
  <Header />
  <div class="site_container">
    <div class="profile-menu">
      <component
        v-for="item in menuItems"
        :key="item.label"
        :is="item.action === 'modal' ? 'button' : 'router-link'"
        :to="item.action !== 'modal' ? item.route : undefined"
        class="profile-menu__item"
        @click="handleItemClick(item)"
      >
        <div class="profile-menu__icon">
          <svg
            v-if="item.icon === 'house'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
            />
            <path
              d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
            />
          </svg>

          <svg
            v-else-if="item.icon === 'bell'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
              clip-rule="evenodd"
            />
          </svg>

          <svg
            v-else-if="item.icon === 'shield'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clip-rule="evenodd"
            />
          </svg>

          <svg
            v-else-if="item.icon === 'key'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
              clip-rule="evenodd"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <span class="profile-menu__label">{{ item.label }}</span>
      </component>
    </div>
  </div>
  <HouseModal
    :is-open="isHouseModalOpen"
    :owners="owners"
    :manager="manager"
    @close="isHouseModalOpen = false"
  />
  <BottomNav />
</template>
