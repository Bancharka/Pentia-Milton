<script setup>
import BaseButton from "@/components/BaseButton.vue";
import Header from "@/components/Header.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useHouses } from "@/firebaseLogic/useHouses";

const { createHouseFromTemplate } = useHouses();
const router = useRouter();

const address = ref("");
const city = ref("");
const postalCode = ref("");
const registration = ref("");
const image = ref(null);

function handleImage(event) {
  image.value = event.target.files[0];
}

async function submitHouse() {
  if (!address.value || !city.value || !postalCode.value || !registration.value || !image.value) {
    alert("Udfyld alle felter");
    return;
  }  
  await createHouseFromTemplate(
    address.value,
    city.value,
    postalCode.value,
    registration.value,
    image.value
  );
  router.push("/");
}

</script>

<template>
  <div class="page-container">
    <Header />
    <form @submit.prevent="submitHouse">
      <input v-model="address" type="text" placeholder="Adresse" />
      <input v-model="city" type="text" placeholder="By" />
      <input v-model="postalCode" type="number" placeholder="Post nummer" />
      <input v-model="registration" type="text" placeholder="Registreringsnummer" />
      <input type="file" accept="image/*" @change="handleImage">
      <BaseButton type="submit" text="Indsend" variant="primary" />
    </form>
  </div>
</template>
