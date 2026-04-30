<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/firebase'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'uploaded'])

const title = ref('')
const selectedFile = ref(null)
const visibleToByggherre = ref(false)
const isUploading = ref(false)
const fileInput = ref(null)

const onFileChange = (e) => {
  selectedFile.value = e.target.files[0] || null
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const formatBytes = (bytes) => {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const handleSubmit = async () => {
  if (!title.value || !selectedFile.value) return
  isUploading.value = true

  try {
    // Upload PDF to Firebase Storage
    const fileRef = storageRef(storage, `documents/${Date.now()}_${selectedFile.value.name}`)
    await uploadBytes(fileRef, selectedFile.value)
    const downloadURL = await getDownloadURL(fileRef)

    // Save metadata to Firestore
    await addDoc(collection(db, 'documents'), {
      title: title.value,
      url: downloadURL,
      size: formatBytes(selectedFile.value.size),
      visibleToByggherre: visibleToByggherre.value,
      createdAt: new Date(),
    })

    emit('uploaded')
    handleClose()
  } catch (err) {
    console.error('Upload failed:', err)
  } finally {
    isUploading.value = false
  }
}

const handleClose = () => {
  title.value = ''
  selectedFile.value = null
  visibleToByggherre.value = false
  emit('close')
}
</script>

<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="doc-modal" @click.self="handleClose">
      <div class="doc-modal__content">

        <div class="doc-modal__topbar">
          <button class="doc-modal__icon-btn doc-modal__icon-btn--close" @click="handleClose">✕</button>
          <p class="doc-modal__title">Opret nyt dokument</p>
          <button
            class="doc-modal__icon-btn doc-modal__icon-btn--confirm"
            :disabled="!title || !selectedFile || isUploading"
            @click="handleSubmit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <input
          v-model="title"
          class="doc-modal__input"
          type="text"
          placeholder="Titel"
        />

        <div class="doc-modal__upload-area" @click="triggerFileInput">
          <input
            ref="fileInput"
            type="file"
            accept="application/pdf"
            style="display: none"
            @change="onFileChange"
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="doc-modal__file-icon">
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
          </svg>
          <p v-if="selectedFile" class="doc-modal__file-name">{{ selectedFile.name }}</p>
          <p v-else class="doc-modal__file-size">Upload dokument</p>
          <button class="doc-modal__upload-btn" type="button">
            {{ isUploading ? 'Uploader...' : 'Upload' }}
          </button>
        </div>

        <div class="doc-modal__toggle-row">
          <span class="doc-modal__toggle-label">Synliggør for bygherre</span>
          <label class="doc-modal__toggle">
            <input type="checkbox" v-model="visibleToByggherre" />
            <span class="doc-modal__toggle-track"></span>
          </label>
        </div>

      </div>
    </div>
  </transition>
</template>