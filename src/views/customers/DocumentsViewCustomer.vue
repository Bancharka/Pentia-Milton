<script setup>
import { ref, onMounted, computed } from 'vue'
import Header from '@/components/Header.vue'
import BottomNav from '@/components/BottomNav.vue'
import SearchInput from '@/components/SearchInput.vue'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

const documents = ref([])
const searchQuery = ref('')

const loadDocuments = async () => {
  const q = query(
    collection(db, 'documents'),
    where('visibleToByggherre', '==', true)
  )
  const snapshot = await getDocs(q)
  documents.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

const filteredDocuments = computed(() => {
  if (!searchQuery.value) return documents.value
  return documents.value.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const openDocument = (url) => {
  window.open(url, '_blank')
}

const manualUrl = 'https://firebasestorage.googleapis.com/v0/b/pentia-milton.firebasestorage.app/o/documents%2FVedligeholdelses%20manual.pdf?alt=media&token=301d275f-c3c6-4e7d-a6a6-0984fc42157b'

const openManual = () => {
  window.open(manualUrl, '_blank')
}

onMounted(loadDocuments)
</script>

<template>
  <div class="page-container">
    <Header />
    <div class="site-container site-container--primary">
      <SearchInput v-model="searchQuery" />

    <div class="docs-customer__manual" @click="openManual">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.878V4.533ZM12.75 20.628A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.095Z" />
        </svg>
        <p class="docs-customer__manual-title">Vedligeholdelses manual</p>
    </div>

      <div v-if="filteredDocuments.length === 0" class="docs-customer__empty">
        <p>Ingen dokumenter tilgængelige</p>
      </div>

      <div class="docs-customer__grid">
        <div
          v-for="doc in filteredDocuments"
          :key="doc.id"
          class="docs-customer__item"
        >
          <div class="docs-customer__icon" @click="openDocument(doc.url)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
              <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
            </svg>
            <span class="docs-customer__size">{{ doc.size }}</span>
          </div>

          <p class="docs-customer__name">{{ doc.title }}</p>

        </div>
      </div>
    </div>
    <BottomNav />
  </div>
</template>