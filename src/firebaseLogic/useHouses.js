// useHouses.js
import { db } from "@/firebase";
import {
    collection,
    getDocs,
    addDoc,
    getDoc,
    query,
    orderBy,
    where,
    serverTimestamp,
} from "firebase/firestore";
import { auth } from "@/firebase";

export function useHouses() {

    async function fetchUserHouseTodos() {
        const snap = await getDocs(
            query(collection(db, "houses"), where("uid", "==", auth.currentUser.uid))
        );
        if (snap.empty) return [];
        return snap.docs[0].data().todos ?? [];
    }

    async function createHouseFromTemplate(address, city, postalCode, registration) {
        const templateTodos = await getDocs(
            query(
                collection(db, "houseTemplates", "default-house", "todos"),
                orderBy("order")
            )
        );

        const todos = [];

        for (const todoDoc of templateTodos.docs) {
            const subTodosSnap = await getDocs(
                collection(db, "houseTemplates", "default-house", "todos", todoDoc.id, "subTodos")
            );

            todos.push({
                title: todoDoc.data().title,
                order: todoDoc.data().order,
                done: false,
                subTodos: subTodosSnap.docs.map(subDoc => ({
                    title: subDoc.data().title,
                    order: subDoc.data().order,
                    done: false,
                }))
            });
        }

        const houseRef = await addDoc(collection(db, "houses"), {
            uid: auth.currentUser.uid,
            address,
            city,
            registration,
            "postal-code": postalCode,
            createdAt: serverTimestamp(),
            todos,
        });

        return houseRef.id;
    }

    return { fetchUserHouseTodos, createHouseFromTemplate };
} 