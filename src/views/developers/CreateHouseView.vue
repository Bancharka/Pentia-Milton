/**
 * @component CreateHouseView
 * @description Form view for creating a new house from the default template.
 * Validates all fields before submission, then calls createHouseFromTemplate
 * which uploads the image, builds todos from the template, and saves the
 * house to Firestore. On success, redirects to the overview.
 *
 * @requires composables/useHouses - provides createHouseFromTemplate
 * @requires utils/validateHouseForm - validates form fields before submission
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
 * @description Captures the selected file from the image file input.
 * @param {Event} event - The file input change event
 */
function handleImage(event) {
    image.value = event.target.files[0]
}
/**
 * @function submitHouse
 * @description Validates the form, creates a new house from the default template,
 * and redirects to the overview on success. Alerts the user if validation fails.
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
