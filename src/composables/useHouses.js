/**
 * @module useHouses
 * @description Composable for all house-related Firestore operations.
 * Handles fetching, creating, and updating houses and their todos,
 * as well as uploading house images to Firebase Storage.
 * @returns {{
 *   fetchUserHouse: Function,
 *   fetchHouseById: Function,
 *   fetchAllHouses: Function,
 *   fetchUserHouseTodos: Function,
 *   fetchDeveloperHouses: Function,
 *   createHouseFromTemplate: Function,
 *   updateSubTodoDone: Function,
 *   updateSubTodoDoneById: Function
 * }}
 */
import { db, auth, storage } from '@/firebase'
import {
    collection,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    addDoc,
    query,
    orderBy,
    where,
    serverTimestamp,
} from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { onAuthStateChanged } from 'firebase/auth'
export function useHouses() {
    /**
     * @function getCurrentUser
     * @description Resolves the currently authenticated Firebase user via a Promise wrapper around onAuthStateChanged.
     * @returns {Promise<Object|null>} The authenticated Firebase user, or null if not signed in
     */
    function getCurrentUser() {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => resolve(user))
        })
    }
    /**
 * @function fetchUserHouse
 * @description Fetches the house associated with the current user.
 * Determines whether the user is a customer (matches on cuid) or a developer (matches on uid).
 * @returns {Promise<{id: string}|null>} House object with Firestore id, or null if not found
 */
    async function fetchUserHouse() {
        const user = await getCurrentUser()
        if (!user) return null
        // Check if user is a customer or developer
        const userDoc = await getDocs(
            query(collection(db, 'users'), where('__name__', '==', user.uid))
        )
        const isCustomer = userDoc.docs[0]?.data()?.customer === true
        const field = isCustomer ? 'cuid' : 'uid'
        const snap = await getDocs(
            query(collection(db, 'houses'), where(field, '==', user.uid))
        )
        if (snap.empty) return null
        return { id: snap.docs[0].id, ...snap.docs[0].data() }
    }
    /**
 * @function fetchHouseById
 * @description Fetches a single house document by its Firestore document ID.
 * @param {string} houseId - The Firestore document ID of the house
 * @returns {Promise<{id: string}|null>} House object or null if not found
 */
    async function fetchHouseById(houseId) {
        const snap = await getDoc(doc(db, 'houses', houseId))
        if (!snap.exists()) return null
        return { id: snap.id, ...snap.data() }
    }
    /**
 * @function fetchAllHouses
 * @description Fetches all house documents from the Firestore houses collection.
 * @returns {Promise<Array<{id: string}>>} Array of all house objects
 */
    async function fetchAllHouses() {
        const snap = await getDocs(collection(db, 'houses'))
        return snap.docs.map(d => ({ id: d.id, ...d.data() }))
    }
    /**
 * @function fetchUserHouseTodos
 * @description Fetches the todos array from the current user's associated house.
 * @returns {Promise<Array>} Array of todos, or empty array if no house is found
 */
    async function fetchUserHouseTodos() {
        const house = await fetchUserHouse()
        if (!house) return []
        return house.todos ?? []
    }
    /**
 * @function uploadHouseImage
 * @description Uploads a house image to Firebase Storage under `houses/{registration}_{filename}`.
 * @param {string} registration - The house registration number used as part of the storage path
 * @param {File} image - The image file to upload
 * @returns {Promise<string>} The public download URL of the uploaded image
 */
    async function uploadHouseImage(registration, image) {
        const imageRef = storageRef(storage, `houses/${registration}_${image.name}`)
        await uploadBytes(imageRef, image)
        return await getDownloadURL(imageRef)
    }
    /**
 * @function buildTodosFromTemplate
 * @description Builds a todos array from the default house template in Firestore,
 * including nested subTodos. All todos and subTodos are initialized with done: false.
 * @returns {Promise<Array<{title: string, order: number, done: boolean, subTodos: Array}>>}
 */
    async function buildTodosFromTemplate() {
        const templateTodos = await getDocs(
            query(
                collection(db, 'houseTemplates', 'default-house', 'todos'),
                orderBy('order')
            )
        )
        const todos = []
        for (const todoDoc of templateTodos.docs) {
            const subTodosSnap = await getDocs(
                collection(db, 'houseTemplates', 'default-house', 'todos', todoDoc.id, 'subTodos')
            )
            todos.push({
                title: todoDoc.data().title,
                order: todoDoc.data().order,
                done: false,
                subTodos: subTodosSnap.docs.map(subDoc => ({
                    title: subDoc.data().title,
                    order: subDoc.data().order,
                    done: false,
                }))
            })
        }
        return todos
    }
    /**
     * @function saveHouseToFirestore
     * @description Saves a new house document to Firestore with the provided data.
     * @param {Object} user - The authenticated Firebase user (uid is used as the developer reference)
     * @param {string} address
     * @param {string} city
     * @param {string} postalCode
     * @param {string} registration
     * @param {string} imageUrl - Public URL of the uploaded house image
     * @param {Array} todos - Pre-built todos array from the template
     * @returns {Promise<string>} The new Firestore document ID
     */
    async function saveHouseToFirestore(user, address, city, postalCode, registration, imageUrl, todos) {
        const houseRef = await addDoc(collection(db, 'houses'), {
            uid: user.uid,
            address,
            city,
            registration,
            'postal-code': postalCode,
            image: imageUrl,
            createdAt: serverTimestamp(),
            todos,
        })
        return houseRef.id
    }
    /**
 * @function createHouseFromTemplate
 * @description Orchestrates the full house creation flow: uploads the image,
 * builds todos from the default template, and saves the house to Firestore.
 * @param {string} address
 * @param {string} city
 * @param {string} postalCode
 * @param {string} registration
 * @param {File} image
 * @returns {Promise<string>} The new house's Firestore document ID
 */
    async function createHouseFromTemplate(address, city, postalCode, registration, image) {
        const user = await getCurrentUser()
        const imageUrl = await uploadHouseImage(registration, image)
        const todos = await buildTodosFromTemplate()
        return await saveHouseToFirestore(user, address, city, postalCode, registration, imageUrl, todos)
    }
    /**
 * @function updateSubTodoDone
 * @description Updates a subTodo's done status for the current user's house.
 * Also updates the parent todo's done status if all subTodos are completed.
 * Intended for use in the customer view.
 * @param {number} todoIndex - Index of the parent todo
 * @param {number} subTodoIndex - Index of the subTodo to update
 * @param {boolean} done - The new done status
 * @returns {Promise<void>}
 */
    async function updateSubTodoDone(todoIndex, subTodoIndex, done) {
        const house = await fetchUserHouse()
        if (!house) return
        const todos = house.todos
        todos[todoIndex].subTodos[subTodoIndex].done = done
        const allDone = todos[todoIndex].subTodos.every(s => s.done)
        todos[todoIndex].done = allDone
        const houseRef = doc(db, 'houses', house.id)
        await updateDoc(houseRef, { todos })
    }
    /**
 * @function updateSubTodoDoneById
 * @description Updates a subTodo's done status for a specific house by ID.
 * Also updates the parent todo's done status if all subTodos are completed.
 * Intended for use in the developer view.
 * @param {string} houseId - Firestore document ID of the house
 * @param {number} todoIndex - Index of the parent todo
 * @param {number} subTodoIndex - Index of the subTodo to update
 * @param {boolean} done - The new done status
 * @returns {Promise<void>}
 */
    async function updateSubTodoDoneById(houseId, todoIndex, subTodoIndex, done) {
        const house = await fetchHouseById(houseId)
        if (!house) return
        const todos = house.todos
        todos[todoIndex].subTodos[subTodoIndex].done = done
        const allDone = todos[todoIndex].subTodos.every(s => s.done)
        todos[todoIndex].done = allDone
        const houseRef = doc(db, 'houses', houseId)
        await updateDoc(houseRef, { todos })
    }
    /**
 * @function fetchDeveloperHouses
 * @description Fetches all houses where the uid matches the current authenticated user.
 * Used to list all houses belonging to a developer.
 * @returns {Promise<Array<{id: string}>>} Array of house objects
 */
    async function fetchDeveloperHouses() {
        const user = await getCurrentUser()
        if (!user) return []
        const snap = await getDocs(
            query(collection(db, 'houses'), where('uid', '==', user.uid))
        )
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
    return {
        fetchUserHouse,
        fetchHouseById,
        fetchAllHouses,
        fetchUserHouseTodos,
        fetchDeveloperHouses,
        createHouseFromTemplate,
        updateSubTodoDone,
        updateSubTodoDoneById
    }
}
