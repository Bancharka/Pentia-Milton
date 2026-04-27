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
      path: "/todos",
      name: "todos",
      component: () => import("../views/developers/TodolistView.vue"),
      meta: { title: "Tjekliste" },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/overview",
      name: "overview",
      component: () => import("../views/developers/OverviewView.vue"),
      meta: { title: "oversigt" },
    },
    {
      path: "/home-customer",
      name: "home-customer",
      component: () => import("../views/customers/HomeViewCustomer.vue"),
      meta: { title: "Hjem" },
    },
    {
      path: "/create-house",
      name: "create-house",
      component: () => import("../views/developers/CreateHouseView.vue"),
      meta: { title: "opret" },
    },
    {
      path: "/todos/:todoIndex",
      name: "sub-todos",
      component: () => import("../views/developers/SubTodoListView.vue"),
      meta: { title: "Subtodos" },
    },
    {
      path: "/dev-documents",
      name: "documents",
      component: () => import("../views/developers/DocumentsView.vue"),
      meta: { title: "Dokumenter" },
    },
  ],
});

export default router;
