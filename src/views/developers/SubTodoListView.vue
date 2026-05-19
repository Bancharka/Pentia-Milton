/**
 * @component SubTodoListView
 * @description Displays a searchable list of subTodos for a specific todo,
 * identified by houseId and todoIndex from the route parameters.
 * Allows the developer to toggle individual subTodo completion status,
 * which is persisted to Firestore via useHouses.
 *
 * @requires stores/houseStore - loads house and todo data
 * @requires composables/useHouses - provides updateSubTodoDoneById
 * @requires utils/todoHelpers - getSubTodos and applyToggle utilities
 * @requires components/TodoCard - renders individual subTodo items with checkbox
 * @requires components/SearchInput - filters the subTodo list by title
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
 * @description Filters the subTodos array by matching the subTodo title
 * against the current search query (case-insensitive).
 * @returns {Array} Filtered array of subTodo objects
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
 * @description Toggles the done status of a subTodo, updates local state,
 * and persists the change to Firestore via updateSubTodoDoneById.
 * @param {number} subTodoIndex - Index of the subTodo to toggle
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