/**
 * @module useFirestore
 * @description Composable til at hente todo-skabeloner fra Firestore.
 * Henter standard-husskabelonen inklusiv alle todos og deres nestede subTodos,
 * sorteret efter det definerede order-felt.
 * @returns {{ fetchTodos: Function }}
 */
import { db } from '@/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
export function useFirestore() {
    /**
     * @function fetchTodos
     * @description Henter alle todos fra standard-husskabelonen i Firestore,
     * inklusiv hver todos nestede subTodos-collection. Både todos og subTodos
     * sorteres efter deres order-felt.
     * @returns {Promise<Array<{id: string, subTodos: Array<{id: string}>}>>}
     * Array af todo-objekter med nestede subTodos
     */
    async function fetchTodos() {
        const todoSnap = await getDocs(
            query(
                collection(db, 'houseTemplates', 'default-house', 'todos'),
                orderBy('order')
            )
        )
        const todos = todoSnap.docs.map(todoDoc => ({
            id: todoDoc.id,
            ...todoDoc.data(),
            subTodos: []
        }))
        for (const todo of todos) {
            const subTodosSnap = await getDocs(
                query(
                    collection(db, 'houseTemplates', 'default-house', 'todos', todo.id, 'subTodos'),
                    orderBy('order')
                )
            )
            todo.subTodos = subTodosSnap.docs.map(subDoc => ({
                id: subDoc.id,
                ...subDoc.data()
            }))
        }
        return todos
    }
    return { fetchTodos }
}
