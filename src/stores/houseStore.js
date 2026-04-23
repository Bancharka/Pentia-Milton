import { defineStore } from "pinia";
import { useHouses } from "@/firebaseLogic/useHouses";
import { ref } from "vue";

export const useHouseStore = defineStore("house", () => {
    const house = ref(null);
    const todos = ref([]);

    async function loadHouse() {
        const { fetchUserHouseTodos } = useHouses();
        todos.value = await fetchUserHouseTodos();
    }

    return { house, todos, loadHouse };
});