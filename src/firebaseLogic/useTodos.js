import { db } from "@/firebase";
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    query,
    orderBy
} from "firebase/firestore";

export function useTodos() {

    async function fetchHouseTodos(houseId) {
        const todoSnap = await getDocs(
            query(
                collection(db, "houses", houseId, "todos"),
                orderBy("order")
            )
        );
        return todoSnap.docs.map(todoDoc => ({
            id: todoDoc.id,
            ...todoDoc.data(),
        }));
    }

    async function fetchSubTodos(houseId, todoId) {
        const subTodoSnap = await getDocs(
            query(
                collection(db, "houses", houseId, "todos", todoId, "subTodos"),
                orderBy("order")
            )
        );
        return subTodoSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    }
}