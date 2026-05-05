import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export function useUsers() {
  async function fetchUser(uid) {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.data();
  }

  return { fetchUser };
}