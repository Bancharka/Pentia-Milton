/**
 * @module SubTodoListView
 * @description Viser en søgbar liste af subTodos for et specifikt todo,
 * identificeret via houseId og todoIndex fra ruteparametrene.
 * Giver byggeleder mulighed for at toggle individuelle subTodos' fuldførelsesstatus,
 * som gemmes i Firestore via useHouses.
 *
 * @requires stores/houseStore - henter hus- og tododata
 * @requires composables/useHouses - leverer updateSubTodoDoneById
 * @requires utils/todoHelpers - getSubTodos og applyToggle hjælpefunktioner
 * @requires components/TodoCard - renderer individuelle subTodo-elementer med afkrydsningsboks
 * @requires components/SearchInput - filtrerer subTodo-listen efter titel
 */
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BottomNav from '@/components/BottomNav.vue'
import TodoCard from '@/components/TodoCard.vue'
import { useHouseStore } from '@/stores/houseStore'
import { useHouses } from '@/composables/useHouses'
import { getSubTodos, applyToggle } from '@/utils/todoHelpers'
import SearchInput from '@/components/SearchInput.vue'
import { computed } from 'vue'
const store = useHouseStore()
const { updateSubTodoDoneById } = useHouses()
const route = useRoute()
const subTodos = ref([])
const todoIndex = Number(route.params.todoIndex)
const searchQuery = ref('')
const todoTitle = ref('')
/**
 * @computed filteredList
 * @description Filtrerer subTodos-arrayet ved at matche subTodo-titlen
 * mod den aktuelle søgeforespørgsel (ufølsom over for store/små bogstaver).
 * @returns {Array} Filtreret array af subTodo-objekter
 */
const filteredList = computed(() =>
    subTodos.value.filter((sub) =>
        sub.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
)
onMounted(async () => {
    await store.loadHouseById(route.params.houseId)
    subTodos.value = getSubTodos(store.todos, todoIndex)
    todoTitle.value = store.todos[todoIndex]?.title ?? ''
})
/**
 * @function handleCheck
 * @async
 * @description Toggler done-status på en subTodo, opdaterer lokal tilstand
 * og gemmer ændringen i Firestore via updateSubTodoDoneById.
 * @param {number} subTodoIndex - Indeks for den subTodo der skal togles
 * @returns {Promise<void>}
 */
async function handleCheck(subTodoIndex) {
    const { updated, newDone } = applyToggle(subTodos.value, subTodoIndex)
    subTodos.value = updated
    await updateSubTodoDoneById(route.params.houseId, todoIndex, subTodoIndex, newDone)
}
</script>
<template>
    <div class="page-container">
        <div class="header">
            <button onclick="history.back()" class="header__button">
                <img src="@/assets/icons/back-arrow.svg" alt="back-arrow" >
            </button>
            <h2 class="header__title">{{ todoTitle }}</h2>
            <div class="header__spacer"/>
        </div>
        <div class="site-container site-container--secondary">
            <SearchInput v-model="searchQuery" placeholder="Search" />
            <div class="todo-list">
                <TodoCard
                    v-for="(sub, index) in filteredList"
                    :key="index"
                    :task="sub.title"
                    :checked="sub.done"
                    @change="handleCheck(index)"
                />
            </div>
        </div>
        <BottomNav />
    </div>
</template>