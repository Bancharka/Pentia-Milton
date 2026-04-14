import { createRouter, createWebHistory } from "vue-router";
import WelcomeView from "../views/WelcomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: WelcomeView,
    },
    {
      path: "/dev-home",
      name: "home",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/developers/HomeView.vue"),
      meta: { title: "Hjem" },
    },
    {
      path: "/dev-profile",
      name: "profile",
      component: () => import("../views/developers/ProfileView.vue"),
      meta: { title: "Profil" },
    },
    {
      path: "/dev-todo",
      name: "checklist",
      component: () => import("../views/developers/TodolistView.vue"),
      meta: { title: "Tjekliste" },
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
    }, //TODO add paths
    {
      path: "/overview",
      name: "overview",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/developers/OverviewView.vue"),
      meta: { title: "oversigt" },
    },
    {
      path: "/home-customer",
      name: "home-customer",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/customers/HomeViewCustomer.vue"),
      meta: {title:"Hjem"},
    },
    
  ],
});

export default router;
