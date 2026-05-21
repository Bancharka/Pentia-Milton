/**
 * @component ProgressBar
 * @description Viser den samlede byggefremdrift for et hus baseret på fuldførte subTodos.
 * Viser en dynamisk skiftende husillustration og en fremskridtslinje der fyldes
 * proportionalt med hvor mange subTodos der er markeret som færdige.
 * Viser valgfrit en knap der linker til opgavetjeklisten.
 *
 * @requires stores/houseStore - leverer todos og husdata
 * @requires stores/userStore - afgør om brugeren er kunde eller byggeleder
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
 * @prop {Boolean} [withButton=false] - Når true, vises en knap der linker til hussets todo-liste
 */
    withButton: {
        type: Boolean,
        default: false,
    },
})


/**
 * @computed max
 * @description Flader alle subTodos fra samtlige todos ud til ét samlet array,
 * der repræsenterer det samlede antal opgaver.
 * @returns {Array} Alle subTodos på tværs af alle todos
 */
const max = computed(() => houseStore.todos.flatMap((todo) => todo.subTodos))

/**
 * @computed done
 * @description Filtrerer det fladede subTodos-array for elementer markeret som færdige.
 * @returns {Array} Fuldførte subTodos
 */const done = computed(() => max.value.filter((todo) => todo.done === true))
const fillPercent = computed(() => (done.value.length / max.value.length) * 100)

/**
 * @computed fillPercent
 * @description Beregner fremskridtsprocenten som (færdige / total) * 100.
 * @returns {number} En procentværdi mellem 0 og 100
 */
/**
 * @computed dynamicHouse
 * @description Returnerer en husillustration baseret på den aktuelle fremskridtsprocent.
 * - 0–25%: fundament
 * - 26–50%: vægge
 * - 51–75%: vægge med tag
 * - 76–100%: færdigt hus
 * @returns {string} Sti til det relevante husillustrationsbillede
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
