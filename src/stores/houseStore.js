import { defineStore } from "pinia";
import { useHouses } from "@/firebaseLogic/useHouses";
import { ref } from "vue";

export const useHouseStore = defineStore("house", () => {
    const house = ref(null);
    const todos = ref([]);

    async function loadHouse() {
        const { fetchUserHouse } = useHouses();
        house.value = await fetchUserHouse();
        todos.value = house.value?.todos ?? [];
    }


    return { house, todos, loadHouse };
});