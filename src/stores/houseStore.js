import { defineStore } from 'pinia'
import { useHouses } from '@/composables/useHouses'
import { ref } from 'vue'

export const useHouseStore = defineStore('house', () => {
    const house = ref(null)
    const todos = ref([])
    const houses = ref([])

    async function loadHouse() {
        const { fetchUserHouse } = useHouses()
        house.value = await fetchUserHouse()
        todos.value = house.value?.todos ?? []
    }

    async function loadAllHouses() {
        const { fetchAllHouses } = useHouses()
        houses.value = await fetchAllHouses()
    }

    return { house, houses, todos, loadHouse, loadAllHouses }
})