import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import { auth } from '@/firebase'
import { useUserStore } from '@/stores/userStore'
import { onAuthStateChanged } from 'firebase/auth'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: WelcomeView,
        },
        {
            path: '/dev-home',
            name: 'home',
            component: () => import('../views/developers/OverviewView.vue'),
            meta: { title: 'Hjem', requiresAuth: true, devOnly: true },
        },
        {
            path: '/dev-profile',
            name: 'dev-profile',
            component: () => import('../views/developers/ProfileView.vue'),
            meta: { title: 'Profil', requiresAuth: true, devOnly: true },
        },
        {
            path: '/cus-profile',
            name: 'cus-profile',
            component: () => import('../views/customers/ProfileViewCustomer.vue'),
            meta: { title: 'Profil', requiresAuth: true, customerOnly: true },
        },
        {
            path: '/todos',
            name: 'todos',
            component: () => import('../views/developers/TodolistView.vue'),
            meta: { title: 'Tjekliste', requiresAuth: true, devOnly: true },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
        },
        {
            path: '/overview',
            name: 'overview',
            component: () => import('../views/developers/OverviewView.vue'),
            meta: { title: 'oversigt', requiresAuth: true, devOnly: true },
        },
        {
            path: '/home-customer',
            name: 'home-customer',
            component: () => import('../views/customers/HomeViewCustomer.vue'),
            meta: { title: 'Hjem', requiresAuth: true, customerOnly: true },
        },
        {
            path: '/create-house',
            name: 'create-house',
            component: () => import('../views/developers/CreateHouseView.vue'),
            meta: { title: 'opret' },
        },
        {
            path: '/todos/:todoIndex',
            name: 'sub-todos',
            component: () => import('../views/developers/SubTodoListView.vue'),
            meta: { title: 'Subtodos', requiresAuth: true, devOnly: true },
        },
        {
            path: '/dev-documents',
            name: 'dev-documents',
            component: () => import('../views/developers/DocumentsView.vue'),
            meta: { title: 'Dokumenter', requiresAuth: true, devOnly: true },
        },
        {
            path: '/cus-documents',
            name: 'cus-documents',
            component: () => import('../views/customers/DocumentsViewCustomer.vue'),
            meta: { title: 'Dokumenter', requiresAuth: true, customerOnly: true },
        },
        {
            path: '/build-overview',
            name: 'build-overview',
            component: () => import('../views/customers/BuildOverviewView.vue'),
            meta: { title: 'Bygge oversigt', requiresAuth: true, customerOnly: true },
        },
        {
            path: '/houses/:houseId',
            name: 'house-progress',
            component: () => import('../views/developers/HouseProgressView.vue'),
            meta: { title: 'Byggeprogres', requiresAuth: true, devOnly: true },
        },
        {
            path: '/houses/:houseId/todos',
            name: 'house-todos',
            component: () => import('../views/developers/TodolistView.vue'),
            meta: { title: 'Tjekliste', requiresAuth: true, devOnly: true },
        },
        {
            path: '/houses/:houseId/todos/:todoIndex',
            name: 'house-sub-todos',
            component: () => import('../views/developers/SubTodoListView.vue'),
            meta: { title: 'Subtodos', requiresAuth: true, devOnly: true },
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('../views/NotFoundView.vue')
        },
    ],
})
function waitForAuth() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe()
            resolve(user)
        })
    })
}

router.beforeEach(async (to) => {
    const userStore = useUserStore()
    const currentUser = await waitForAuth()

     console.log('currentUser:', currentUser)
    console.log('userData:', userStore.userData)
    console.log('navigating to:', to.path)
    if (to.meta.requiresAuth && !currentUser) {
        return '/login'
    }
    if (currentUser && !userStore.userData) {
        await userStore.loadUser()
    }
    if (to.meta.customerOnly && !userStore.userData?.customer) {
        return '/dev-home'
    }
    if (to.meta.devOnly && userStore.userData?.customer) {
        return '/home-customer'
    }
})
export default router
