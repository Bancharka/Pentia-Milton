/**
 * @module OverviewView
 * @description Viser en søgbar, sorteret liste over alle huse tilhørende
 * den indloggede byggeleder. Huse filtreres efter adresse og sorteres
 * efter postnummer. Klik på et hus navigerer til dets detaljevisning.
 *
 * @requires stores/houseStore - henter og leverer byggelederens husliste
 * @requires components/HouseCard - renderer individuelle husindgange
 * @requires components/SearchInput - filtrerer huslisten efter adresse
 */
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
/**
 * @computed filteredList
 * @description Filtrerer huslistens array efter adresse (ufølsom over for store/små bogstaver)
 * og sorterer resultaterne efter postnummer i stigende orden.
 * @returns {Array} Filtreret og sorteret array af husobjekter
 */
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
