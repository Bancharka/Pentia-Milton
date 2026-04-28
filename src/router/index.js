import { createRouter, createWebHistory } from "vue-router";
import WelcomeView from "../views/WelcomeView.vue";
import { auth } from "@/firebase";
import { useUserStore } from "@/stores/userStore";
import { onAuthStateChanged } from "firebase/auth";



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
      meta: { title: "Hjem", requiresAuth:true, notCustomerOnly:true },
    },
    {
      path: "/dev-profile",
      name: "profile",
      component: () => import("../views/developers/ProfileView.vue"),
      meta: { title: "Profil", requiresAuth:true, notCustomerOnly:true },
    },
    {
      path: "/todos",
      name: "todos",
      component: () => import("../views/developers/TodolistView.vue"),
      meta: { title: "Tjekliste", requiresAuth:true, notCustomerOnly:true },
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
      meta: { title: "oversigt", requiresAuth:true, notCustomerOnly:true },
    },
    {
      path: "/home-customer",
      name: "home-customer",
      component: () => import("../views/customers/HomeViewCustomer.vue"),
      meta: { title: "Hjem", requiresAuth:true, customerOnly:true },
    },
    // Her skal vi beslutte os for om den kun skal kunne tilgås af den ene eller anden, eller hvad den skal bruges til
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
      meta: { title: "Subtodos", requiresAuth:true, notCustomerOnly:true },
    },
    {
      path: "/documents",
      name: "documents",
      component: () => import("../views/developers/DocumentsView.vue"),
      meta: { title: "Subtodos", requiresAuth:true, notCustomerOnly:true },
    },
    {
      path: "/build-overview",
      name: "build-overview",
      component: () => import("../views/customers/BuildOverviewView.vue"),
      meta: { title: "Bygge oversigt", requiresAuth:true, customerOnly:true  },
    },
  ],
});

function waitForAuth() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
}

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  const currentUser = await waitForAuth();

  if (to.meta.requiresAuth && !currentUser) {
    return "/login";
    
  }

  if (currentUser && !userStore.userData) {
    await userStore.loadUser();
  }

  if (to.meta.custumerOnly && !userStore.userData?.customer) {
    return "/dev-home";
    
  }

  if (to.meta.notCustomerOnly && userStore.userData?.customer) {
    return "/home-customer";
    
  }
  


})

export default router;
