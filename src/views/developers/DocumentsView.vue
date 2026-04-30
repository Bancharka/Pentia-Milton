<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import BottomNav from '@/components/BottomNav.vue'
import SearchInput from '@/components/SearchInput.vue'
import DocumentModal from '@/components/modals/DocumentModal.vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase' 

const isModalOpen = ref(false)
const documents = ref([])

const loadDocuments = async () => {
  const snapshot = await getDocs(collection(db, 'documents'))
  documents.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

onMounted(loadDocuments)
</script>

<template>
  <div class="page-container">
    <Header />
    <div class="site-container site-container--primary">
      <SearchInput />

      <button class="docs__add-btn" @click="isModalOpen = true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
        </svg>
      </button>

      <div class="docs__grid">
        <div
          v-for="doc in documents"
          :key="doc.id"
          class="docs__item"
        >
          <div class="docs__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
              <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
            </svg>
            <span class="docs__size">{{ doc.size }}</span>
          </div>
          <p class="docs__name">{{ doc.title }}</p>
        </div>
      </div>
    </div>

    <DocumentModal
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @uploaded="loadDocuments"
    />

    <BottomNav />
  </div>
</template>