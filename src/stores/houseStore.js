import { defineStore } from "pinia";
import { useHouses } from "@/firebaseLogic/useHouses";
import { ref } from "vue";

export const useHouseStore = defineStore("house", () => {
    const house = ref(null);
    const todos = ref([]);

    async function loadTodos() {
        console.log("loadTodos called");
    const { fetchUserHouseTodos } = useHouses();
    console.log("fetchUserHouseTodos:", fetchUserHouseTodos);
    todos.value = await fetchUserHouseTodos();
}

return { house, todos, loadTodos };
});