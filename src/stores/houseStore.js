import { defineStore } from "pinia";
import { useFirestore } from "@/firebaseLogic/useFirestore";
import { ref } from "vue"



export const useHouseStore = defineStore("house", () => {


    const todos = ref([]);
    


    async function loadTodos() {

        const {fetchTodos} = useFirestore();
        todos.value = await fetchTodos();

    }

    

    return {todos, loadTodos}
});