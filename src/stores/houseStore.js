import { defineStore } from 'pinia'
import { useHouses } from '@/composables/useHouses'
import { ref } from 'vue'
export const useHouseStore = defineStore('house', () => {
    const house = ref(null)
    const todos = ref([])
    const houses = ref([])
    // Henter det hus der tilhører den nuværende bruger baseret på uid
    async function loadHouse() {
        const { fetchUserHouse } = useHouses()
        house.value = await fetchUserHouse()
        todos.value = house.value?.todos ?? []
    }
    // Henter et specifikt hus fra Firestore baseret på hus-id
    async function loadHouseById(houseId) {
        const { fetchHouseById } = useHouses()
        house.value = await fetchHouseById(houseId)
        todos.value = house.value?.todos ?? []
    }
    // Henter alle huse fra Firestore
    async function loadAllHouses() {
        const { fetchAllHouses } = useHouses()
        houses.value = await fetchAllHouses()
    }
    // Henter kun de huse der er tilknyttet den indloggede byggeleder    
    async function loadDeveloperHouses() {
        const { fetchDeveloperHouses } = useHouses()
        houses.value = await fetchDeveloperHouses()
    }

    return { house, houses, todos, loadHouse, loadAllHouses, loadHouseById, loadDeveloperHouses }
})
