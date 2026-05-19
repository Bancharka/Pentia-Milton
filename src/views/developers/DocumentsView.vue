/**
 * @component DocumentsView
 * @description Displays a searchable grid of documents for the current house.
 * Allows the developer to open documents in a new tab, add new documents via
 * DocumentModal, and edit or delete existing documents via DocumentEditModal.
 *
 * @requires stores/documentsStore - loads and provides the documents array
 * @requires components/modals/DocumentModal - modal for uploading new documents
 * @requires components/modals/DocumentEditModal - modal for editing or deleting existing documents
 * @requires components/SearchInput - filters the document list by title
 */
<script setup>
import { ref, onMounted, computed } from 'vue'
import HeaderBack from '@/components/HeaderBack.vue'
import BottomNav from '@/components/BottomNav.vue'
import SearchInput from '@/components/SearchInput.vue'
import DocumentModal from '@/components/modals/DocumentModal.vue'
import DocumentEditModal from '@/components/modals/DocumentEditModal.vue'
import { useDocumentStore } from '@/stores/documentsStore'
const documentsStore = useDocumentStore()
const isModalOpen = ref(false)
const isEditModalOpen = ref(false)
const selectedDoc = ref(null)
const searchQuery = ref('')
/**
 * @computed filteredList
 * @description Filters the documents array by matching the document title
 * against the current search query (case-insensitive).
 * @returns {Array} Filtered array of document objects
 */
const filteredList = computed(() =>
    documentsStore.documents.filter((doc) =>
        doc.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
)
const openDocument = (url) => {
    window.open(url, '_blank')
}
/**
 * @function openEditModal
 * @description Sets the selected document and opens the edit modal.
 * @param {Object} doc - The document object to edit
 * @param {string} doc.id - Firestore document ID
 * @param {string} doc.title - Display title of the document
 * @param {string} doc.url - Public download URL
 * @param {string} doc.size - Human-readable file size
 */
const openEditModal = (doc) => {
    selectedDoc.value = doc
    isEditModalOpen.value = true
}
onMounted(() => documentsStore.loadDocuments())
</script>
<template>
    <div class="page-container">
        <HeaderBack />
        <div class="site-container site-container--primary">
            <SearchInput v-model="searchQuery" placeholder="Search" />
            <button class="docs__add-btn" @click="isModalOpen = true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                </svg>
            </button>
            <div class="docs__grid">
                <div
                    v-for="doc in filteredList"
                    :key="doc.id"
                    class="docs__item"
                >
                    <div class="docs__icon" @click="openDocument(doc.url)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                        </svg>
                        <span class="docs__size">{{ doc.size }}</span>
                    </div>
                    <p class="docs__name">{{ doc.title }}</p>
                    <button class="docs__edit-btn" @click="openEditModal(doc)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#004e5a" width="16" height="16">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <DocumentModal
            :is-open="isModalOpen"
            @close="isModalOpen = false"
            @uploaded="documentsStore.loadDocuments()"
        />
        <DocumentEditModal
            :is-open="isEditModalOpen"
            :document="selectedDoc"
            @close="isEditModalOpen = false"
            @updated="documentsStore.loadDocuments()"
            @deleted="documentsStore.loadDocuments()"
        />
        <BottomNav />
    </div>
</template>