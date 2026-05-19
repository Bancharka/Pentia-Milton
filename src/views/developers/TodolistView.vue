/**
 * @component TodoListView
 * @description Displays a searchable list of todos for a specific house,
 * loaded by the houseId route parameter. Each todo links to its subTodo detail view.
 *
 * @requires stores/houseStore - loads house data and provides the todos array
 * @requires components/TodoCard - renders individual todo items
 * @requires components/SearchInput - filters the todo list by title
 */
<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import HeaderBack from '@/components/HeaderBack.vue'
import BottomNav from '@/components/BottomNav.vue'
import TodoCard from '@/components/TodoCard.vue'
import SearchInput from '@/components/SearchInput.vue'
import { useHouseStore } from '@/stores/houseStore'
import { computed } from 'vue'
const store = useHouseStore()
const searchQuery = ref('')
/**
 * @computed filteredList
 * @description Filters the store's todos array by matching the todo title
 * against the current search query (case-insensitive).
 * @returns {Array} Filtered array of todo objects
 */
const filteredList = computed(() =>
    store.todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
)
const route = useRoute()
onMounted(async () => {
    await store.loadHouseById(route.params.houseId)
})
</script>
<template>
    <div class="page-container">
        <HeaderBack />
        <div class="site-container site-container--secondary">
            <SearchInput v-model="searchQuery" placeholder="Search" />      <div class="todo-list">
                <TodoCard
                    v-for="(todo, index) in filteredList" 
                    :key="index"
                    :task="todo.title"
                    :checked="todo.done"
                    :link="`/houses/${route.params.houseId}/todos/${index}`"
                />
            </div>
        </div>
        <BottomNav />
    </div>
</template>