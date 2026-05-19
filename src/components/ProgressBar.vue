<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHouseStore } from '@/stores/houseStore'
import BaseButton from './BaseButton.vue'
import houseFoundation from '../img/House-foundation.png'
import houseWalls from '../img/House-walls.png'
import houseWallsRoof from '../img/House-walls-roof.png'
import houseDone from '../img/House-done.png'
const houseStore = useHouseStore()
const route = useRoute()
const props = defineProps({
    withButton: {
        type: Boolean,
        default: false,
    },
})
// max tager alle subtodos og lægger dem sammen til ét array
const max = computed(() => houseStore.todos.flatMap((todo) => todo.subTodos))
const done = computed(() => max.value.filter((todo) => todo.done === true))
// Regner procentværdien for todos - done/total*100
const fillPercent = computed(() => (done.value.length / max.value.length) * 100)
const dynamicHouse = computed(() => {
    if (fillPercent.value <= 25) return houseFoundation
    if (fillPercent.value <= 50) return houseWalls
    if (fillPercent.value <= 75) return houseWallsRoof
    return houseDone // 
})
</script>
<template>
    <div class="progress" :class="{ 'progress--with-button': props.withButton }">
        <h3>Her kan du følge med i byggeprocessen af dit hus</h3>
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
