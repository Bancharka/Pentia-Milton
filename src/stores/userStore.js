import { defineStore } from "pinia";
import { useUsers } from "@/firebaseLogic/useUsers";
import { ref } from "vue";
import { auth } from "@/firebase";

export const useUserStore = defineStore("user", () => {
  const userData = ref(null);
  const { fetchUser } = useUsers();

  async function loadUser() {
    userData.value = await fetchUser(auth.currentUser.uid);
  }

  return { userData, loadUser };
});