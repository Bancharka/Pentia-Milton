<script setup>
import HeaderBack from '@/components/HeaderBack.vue'
import BottomNav from '@/components/BottomNav.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <div class="page-container">
        <HeaderBack />
        <div class="site-container site-container--primary">
            <div class="not-found">
                <div class="not-found__icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
                <h1 class="not-found__code">404</h1>
                <p class="not-found__title">Siden findes ikke</p>
                <p class="not-found__subtitle">Den side du leder efter eksisterer ikke eller er blevet flyttet.</p>
            </div>
        </div>
        <BottomNav />
    </div>
</template>