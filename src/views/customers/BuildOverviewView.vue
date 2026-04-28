<script setup>
import { onMounted } from 'vue';
import { useHouseStore } from '@/stores/houseStore';
import Header from '@/components/Header.vue';
import BottomNav from '@/components/BottomNav.vue';

const store = useHouseStore();

onMounted(async() => {
    await store.loadHouse();
})

</script>

<template>
    <div class="page-container">
        <Header />
        <div class="site-container site-container--primary">
            <div class="build-overview">
    <div
      v-for="(todo, index) in store.todos"
      :key="index"
      class="build-overview__item"
    >
        <div class="build-overview__indicator">
            <img v-if="todo.done" class="build-overview__icon" src="@/assets/icons/done.png" alt="done" />
            <img v-else-if="todo.subTodos.some(s => s.done)" class="build-overview__icon" src="@/assets/icons/doing.png" alt="active" />
            <img v-else class="build-overview__icon" src="@/assets/icons/todo.png" alt="todo" />
                <div class="build-overview__line"></div>
        </div>
        <div class="build-overview__content">
            <h3 class="build-overview__title">{{ todo.title }}</h3>
            <ul class="build-overview__subtodos">
                <li v-for="(sub, subIndex) in todo.subTodos" :key="subIndex">
                    {{ sub.title }}
                </li>
            </ul>
        </div>
    </div>
</div>
        </div>
        <BottomNav />
    </div>
</template>