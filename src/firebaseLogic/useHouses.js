import { db, storage } from "@/firebase";
import {
    collection,
    getDocs,
    addDoc,
    query,
    orderBy,
    serverTimestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function useHouses() {
    async function fetchHouseTodos(houseId) {
        const todoSnap = await getDocs(
            query(
                collection(db, "houses", houseId, "todos"),
                orderBy("order")
            )
        );
        const todos = todoSnap.docs.map(todoDoc => ({
            id: todoDoc.id,
            ...todoDoc.data(),
            subTodos: []
        }));
        for (const todo of todos) {
            const subTodosSnap = await getDocs(
                query(
                    collection(db, "houses", houseId, "todos", todo.id, "subTodos"),
                    orderBy("order")
                )
            );
            todo.subTodos = subTodosSnap.docs.map(subDoc => ({
                id: subDoc.id,
                ...subDoc.data()
            }));
        }
        return todos;
    }

    async function createHouseFromTemplate(address, city, postalCode, registration) {
        const imageRef = ref(storage, `houses/${registration}_${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        const templateTodos = await getDocs(
            query(
                collection(db, "houseTemplates", "default-house", "todos"),
                orderBy("order")
            )
        );

        const houseRef = await addDoc(collection(db, "houses"), {
            address,
            city,
            registration,
            "postal-code": postalCode,
            image: imageUrl,
            createdAt: serverTimestamp(),
        });

        for (const todoDoc of templateTodos.docs) {
            const newTodoRef = await addDoc(
                collection(db, "houses", houseRef.id, "todos"),
                {
                    title: todoDoc.data().title,
                    order: todoDoc.data().order,
                    done: false,
                }
            );
            const subTodos = await getDocs(
                collection(db, "houseTemplates", "default-house", "todos", todoDoc.id, "subTodos")
            );
            for (const subDoc of subTodos.docs) {
                await addDoc(
                    collection(db, "houses", houseRef.id, "todos", newTodoRef.id, "subTodos"),
                    {
                        title: subDoc.data().title,
                        order: subDoc.data().order,
                        done: false,
                    }
                );
            }
        }

        return houseRef.id;
    }

    return { fetchHouseTodos, createHouseFromTemplate };
}