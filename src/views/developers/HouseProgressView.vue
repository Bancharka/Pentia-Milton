/**
 * @component HouseDetailView
 * @description Displays the detail view for a specific house, showing the
 * build progress via the ProgressBar component. House data is loaded on mount
 * using the houseId route parameter.
 *
 * @requires stores/houseStore - loads house data by ID
 * @requires components/ProgressBar - displays todo completion progress
 */
<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import HeaderBack from '@/components/HeaderBack.vue'
import BottomNav from '@/components/BottomNav.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { useHouseStore } from '@/stores/houseStore'
const store = useHouseStore()
const route = useRoute()
onMounted(async () => {
    await store.loadHouseById(route.params.houseId)
})
</script>
<template>
    <div class="page-container">
        <HeaderBack />
        <div class="site-container site-container--secondary">
            <ProgressBar :withButton="true" />
        </div>
        <BottomNav />
    </div>
</template>