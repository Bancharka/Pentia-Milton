<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import BottomNav from '@/components/BottomNav.vue'
import TodoCard from '@/components/TodoCard.vue'
import { useHouseStore } from '@/stores/houseStore'
import { useHouses } from '@/composables/useHouses'
import { getSubTodos, applyToggle } from '@/utils/todoHelpers'
import SearchInput from '@/components/SearchInput.vue'
import { computed } from 'vue'
 
const store = useHouseStore()
const { updateSubTodoDone } = useHouses()
const route = useRoute()
const subTodos = ref([])
const todoIndex = Number(route.params.todoIndex)
const searchQuery = ref('')



const filteredList = computed(() =>
    subTodos.value.filter((sub) =>
        sub.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
)

 
onMounted(async () => {
    await store.loadHouse()
    subTodos.value = getSubTodos(store.todos, todoIndex)
})



 
async function handleCheck(subTodoIndex) {
    const { updated, newDone } = applyToggle(subTodos.value, subTodoIndex)
    subTodos.value = updated
    await updateSubTodoDone(todoIndex, subTodoIndex, newDone)
}

</script>

<template>
    <div class="page-container">
        <Header />
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