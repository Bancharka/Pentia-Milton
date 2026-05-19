/**
 * @module useFirestore
 * @description Composable for fetching todo templates from Firestore.
 * Retrieves the default house template including all todos and their nested subTodos,
 * ordered by their defined order field.
 * @returns {{ fetchTodos: Function }}
 */
import { db } from '@/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
export function useFirestore() {
    /**
 * @function fetchTodos
 * @description Fetches all todos from the default house template in Firestore,
 * including each todo's nested subTodos collection. Both todos and subTodos
 * are ordered by their order field.
 * @returns {Promise<Array<{id: string, subTodos: Array<{id: string}>}>>} 
 * Array of todo objects with nested subTodos
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
