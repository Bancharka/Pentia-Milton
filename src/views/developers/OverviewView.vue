<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHouseStore } from '@/stores/houseStore'
import HeaderBack from '@/components/HeaderBack.vue'
import BottomNav from '@/components/BottomNav.vue'
import HouseCard from '@/components/HouseCard.vue'
import SearchInput from '@/components/SearchInput.vue'
const store = useHouseStore()
const router = useRouter()
const searchQuery = ref('')
const filteredList = computed(() =>
    store.houses.filter((house) =>
        house.address.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
        .sort((a, b) => Number(a['postal-code']) - Number(b['postal-code']))
)
function goToHouse(houseId) {
    router.push(`/houses/${houseId}`)
}
onMounted(async () => {
    await store.loadDeveloperHouses()
})
</script>
<template>
    <div class="page-container">
        <HeaderBack />
        <div class="site-container site-container--primary">
            <div class="overview">
                <SearchInput v-model="searchQuery" placeholder="Search" />
                <HouseCard
                    v-for="house in filteredList"
                    :key="house.id"
                    :address="house.address"
                    :postalCode="house['postal-code']"
                    :city="house.city"
                    :registration="house.registration"
                    :image="house.image"
                    @click="goToHouse(house.id)"
                />
                <BottomNav />
            </div>
        </div>
    </div>
</template>
