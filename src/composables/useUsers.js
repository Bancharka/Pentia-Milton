/**
 * @module useUsers
 * @description Composable til at hente brugerdata fra Firestore.
 * @returns {{ fetchUser: Function }}
 */
import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
/**
 * @function fetchUser
 * @description Henter et brugerdokument fra Firestore baseret på brugerens UID.
 * @param {string} uid - Brugerens Firebase Auth UID
 * @returns {Promise<Object|undefined>} Brugerens Firestore dokumentdata, eller undefined hvis ikke fundet
 */
export function useUsers() {
    async function fetchUser(uid) {
        const userDoc = await getDoc(doc(db, 'users', uid))
        return userDoc.data()
    }
    return { fetchUser }
}