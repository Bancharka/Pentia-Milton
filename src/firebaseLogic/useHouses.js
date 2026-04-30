import { db, auth, storage } from "@/firebase";
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    addDoc,
    query,
    orderBy,
    where,
    serverTimestamp,
} from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

export function useHouses() {

    function getCurrentUser() {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => resolve(user));
        });
    }

    async function fetchUserHouse() {
        const user = await getCurrentUser();
        if (!user) return null;
        const snap = await getDocs(
            query(collection(db, "houses"), where("uid", "==", user.uid))
        );
        if (snap.empty) return null;
        return { id: snap.docs[0].id, ...snap.docs[0].data() };
    }

    async function fetchUserHouseTodos() {
        const house = await fetchUserHouse();
        if (!house) return [];
        return house.todos ?? [];
    }

    async function uploadHouseImage(registration, image) {
        const imageRef = storageRef(storage, `houses/${registration}_${image.name}`);
        await uploadBytes(imageRef, image);
        return await getDownloadURL(imageRef);
    }

    async function buildTodosFromTemplate() {
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
        return todos;
    }
    async function saveHouseToFirestore(user, address, city, postalCode, registration, imageUrl, todos) {
        const houseRef = await addDoc(collection(db, "houses"), {
            uid: user.uid,
            address,
            city,
            registration,
            "postal-code": postalCode,
            image: imageUrl,
            createdAt: serverTimestamp(),
            todos,
        });
        return houseRef.id;
    }

    async function createHouseFromTemplate(address, city, postalCode, registration, image) {
        const user = await getCurrentUser();
        const imageUrl = await uploadHouseImage(registration, image);
        const todos = await buildTodosFromTemplate();
        return await saveHouseToFirestore(user, address, city, postalCode, registration, imageUrl, todos);
    }

    async function updateSubTodoDone(todoIndex, subTodoIndex, done) {
        const house = await fetchUserHouse();
        if (!house) return;
        const todos = house.todos;
        todos[todoIndex].subTodos[subTodoIndex].done = done;
        const allDone = todos[todoIndex].subTodos.every(s => s.done);
        todos[todoIndex].done = allDone;
        const houseRef = doc(db, "houses", house.id);
        await updateDoc(houseRef, { todos });
    }

    return { fetchUserHouse, fetchUserHouseTodos, createHouseFromTemplate, updateSubTodoDone };
}