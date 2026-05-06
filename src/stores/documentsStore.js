import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
export const useDocumentStore = defineStore('documents', () => {
    const documents = ref([])
    async function loadDocuments() {
        const snapshot = await getDocs(collection(db, 'documents'))
        documents.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
    return { documents, loadDocuments }
})