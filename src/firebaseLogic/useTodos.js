import { db, auth } from "@/firebase";
import {
    collection,
    getDocs,
    getDoc,
    updateDoc,
    query,
    where,
    doc,
} from "firebase/firestore";

export function useTodos() {

    // Get the house document for the current user
    async function fetchUserHouse() {
        const snap = await getDocs(
            query(collection(db, "houses"), where("uid", "==", auth.currentUser.uid))
        );
        if (snap.empty) return null;
        return { id: snap.docs[0].id, ...snap.docs[0].data() };
    }

    // Get all todos for the current user's house
    async function fetchHouseTodos() {
        const house = await fetchUserHouse();
        if (!house) return [];
        return house.todos ?? [];
    }

    // Get subtodos for a specific todo by index
    async function fetchSubTodos(todoIndex) {
        const house = await fetchUserHouse();
        if (!house) return [];
        return house.todos[todoIndex]?.subTodos ?? [];
    }

    // Update a subtodo's done field and auto-check parent if all done
    async function updateSubTodoDone(todoIndex, subTodoIndex, done) {
        const house = await fetchUserHouse();
        if (!house) return;

        const todos = house.todos;
        todos[todoIndex].subTodos[subTodoIndex].done = done;

        // Check if all subtodos are done
        const allDone = todos[todoIndex].subTodos.every(s => s.done);
        todos[todoIndex].done = allDone;

        // Save the whole updated todos array back
        const houseRef = doc(db, "houses", house.id);
        await updateDoc(houseRef, { todos });
    }

    return { fetchHouseTodos, fetchSubTodos, updateSubTodoDone };
}