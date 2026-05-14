<script setup>
import BottomNav from '@/components/BottomNav.vue'
import HeaderBack from '@/components/HeaderBack.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { useHouseStore } from '@/stores/houseStore'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'
const houseStore = useHouseStore()
const userStore = useUserStore()
onMounted(() => {
    houseStore.loadHouse()
    userStore.loadUser()
})
</script>
<template>
    <div class="page-container">
        <HeaderBack />
        <div class="site-container site-container--primary">
            <ProgressBar/>
        </div>
        <BottomNav />
    </div>  
</template>
