import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import { useHouseStore } from './houseStore'
export const useDocumentStore = defineStore('documents', () => {
    const documents = ref([])
    async function loadDocuments() {
        const houseStore = useHouseStore()
        const houseId = houseStore.house?.id
        if (!houseId) return
        const snapshot = await getDocs(
            collection(db, 'houses', houseId, 'documents')
        )
        documents.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
    return { documents, loadDocuments }
})