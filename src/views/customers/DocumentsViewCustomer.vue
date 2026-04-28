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

onMounted(loadDocuments)
</script>

<template>
  <div class="page-container">
    <Header />
    <div class="site-container site-container--primary">
      <SearchInput v-model="searchQuery" />

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