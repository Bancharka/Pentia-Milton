/**
 * @component ProgressBar
 * @description Displays the overall build progress of a house based on completed sub-todos.
 * Shows a dynamically changing house illustration and a progress bar that fills
 * proportionally to how many sub-todos have been marked as done.
 * Optionally renders a button linking to the todo checklist.
 *
 * @requires stores/houseStore - provides todos and house data
 * @requires stores/userStore - determines whether the user is a customer or employee
 */
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHouseStore } from '@/stores/houseStore'
import BaseButton from './BaseButton.vue'
import houseFoundation from '../img/House-foundation.png'
import houseWalls from '../img/House-walls.png'
import houseWallsRoof from '../img/House-walls-roof.png'
import houseDone from '../img/House-done.png'
import { useUserStore } from '@/stores/userStore'


const userStore = useUserStore()
const houseStore = useHouseStore()
const route = useRoute()
const props = defineProps({
    /**
 * @prop {Boolean} [withButton=false] - When true, renders a button linking to the house todo list
 */
    withButton: {
        type: Boolean,
        default: false,
    },
})


/**
 * @computed max
 * @description Flattens all subTodos from every todo into a single array,
 * representing the total number of tasks.
 * @returns {Array} All subTodos across all todos
 */
const max = computed(() => houseStore.todos.flatMap((todo) => todo.subTodos))
/**
 * @computed done
 * @description Filters the flattened subTodos array for items marked as done.
 * @returns {Array} Completed subTodos
 */
const done = computed(() => max.value.filter((todo) => todo.done === true))
/**
 * @computed fillPercent
 * @description Calculates the progress percentage as (done / total) * 100.
 * @returns {number} A percentage value between 0 and 100
 */
const fillPercent = computed(() => (done.value.length / max.value.length) * 100)
/**
 * @computed dynamicHouse
 * @description Returns a house illustration based on the current fill percentage.
 * - 0–25%: foundation
 * - 26–50%: walls
 * - 51–75%: walls with roof
 * - 76–100%: completed house
 * @returns {string} Path to the relevant house image asset
 */
const dynamicHouse = computed(() => {
    if (fillPercent.value <= 25) return houseFoundation
    if (fillPercent.value <= 50) return houseWalls
    if (fillPercent.value <= 75) return houseWallsRoof
    return houseDone // 
})
</script>
<template>
    <div class="progress" :class="{ 'progress--with-button': props.withButton }">
        <h3 v-if="userStore.userData.customer === true">Her kan du følge med i byggeprocessen af dit hus</h3>
        <h3 v-else>{{ houseStore.house.address }}, {{ houseStore.house.postalCode }}</h3>
        <div>
            <Transition name="house" mode="out-in">
                <img :src="dynamicHouse" :key="dynamicHouse" >
            </Transition>
        </div>
        <div class="progress__bar">
            <img
                class="progress__bar__overlay"
                src="../img/progressbar_overlay_100_icons_lightergreen.svg"
                alt=""
            > 
            <div class="progress__bar__fill" :style="{ width: fillPercent + '%' }"/>
        </div>
        <div class="house-card__button">
            <BaseButton
                v-if="props.withButton"
                text="Gennemgå tjekliste"
                variant="primary"
                :link="`/houses/${route.params.houseId}/todos`"
            />
        </div>
    </div>
</template>
