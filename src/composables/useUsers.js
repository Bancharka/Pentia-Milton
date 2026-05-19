/**
 * @module useUsers
 * @description Composable for fetching user data from Firestore.
 * @returns {{ fetchUser: Function }}
 */
import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
/**
 * @function fetchUser
 * @description Fetches a user document from Firestore by their UID.
 * @param {string} uid - The Firebase Auth UID of the user
 * @returns {Promise<Object|undefined>} The user's Firestore document data, or undefined if not found
 */
export function useUsers() {
    async function fetchUser(uid) {
        const userDoc = await getDoc(doc(db, 'users', uid))
        return userDoc.data()
    }
    return { fetchUser }
}