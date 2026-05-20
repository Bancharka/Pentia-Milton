/**
 * @module CreateHouseView
 * @description Formularvisning til oprettelse af et nyt hus fra standard-skabelonen.
 * Validerer alle felter inden indsendelse og kalder createHouseFromTemplate,
 * som uploader billedet, bygger todos fra skabelonen og gemmer huset i Firestore.
 * Ved succes omdirigeres til oversigtssiden.
 *
 * @requires composables/useHouses - leverer createHouseFromTemplate
 * @requires utils/validateHouseForm - validerer formularfelter inden indsendelse
 */
<script setup>
import BaseButton from '@/components/BaseButton.vue'
import HeaderBack from '@/components/HeaderBack.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHouses } from '@/composables/useHouses'
import { validateHouseForm } from '@/utils/validateHouseForm'
const { createHouseFromTemplate } = useHouses()
const router = useRouter()
const address = ref('')
const city = ref('')
const postalCode = ref('')
const registration = ref('')
const image = ref(null)
/**
 * @function handleImage
 * @description Henter den valgte fil fra billedfilens input-felt.
 * @param {Event} event - Change-eventet fra filinputtet
 */
function handleImage(event) {
    image.value = event.target.files[0]
}
/**
 * @function submitHouse
 * @async
 * @description Validerer formularen, opretter et nyt hus fra standard-skabelonen
 * og omdirigerer til oversigtssiden ved succes. Viser en alert hvis validering fejler.
 * @returns {Promise<void>}
 */
async function submitHouse() {
    const error = validateHouseForm({
        address: address.value,
        city: city.value,
        postalCode: postalCode.value,
        registration: registration.value,
        image: image.value
    })
    if (error) {
        alert(error)
        return
    }
    await createHouseFromTemplate(
        address.value,
        city.value,
        postalCode.value,
        registration.value,
        image.value
    )
    router.push('/overview')
}
</script>
<template>
    <div class="page-container">
        <HeaderBack />
        <form @submit.prevent="submitHouse">
            <input v-model="address" type="text" placeholder="Adresse" >
            <input v-model="city" type="text" placeholder="By" >
            <input v-model="postalCode" type="number" placeholder="Post nummer" >
            <input v-model="registration" type="text" placeholder="Registreringsnummer" >
            <input type="file" accept="image/*" @change="handleImage">
            <BaseButton type="submit" text="Indsend" variant="primary" />
        </form>
    </div>
</template>
