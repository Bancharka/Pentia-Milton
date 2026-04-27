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
                key="index"
                >
                <div class="build-overview__indicator">
                    
                </div>
                <div class="build-overview__content">
                    <h3 class="build-overview__title">
                        {{ todo.title }}
                    </h3>
                    <ul class="build-overview__subtodos">
                        <li
                        v-for="(sub, subIndex) in todo.subTodos"
                        :key="subIndex"
                        >{{ sub.title }}
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
        <BottomNav />
    </div>
</template>