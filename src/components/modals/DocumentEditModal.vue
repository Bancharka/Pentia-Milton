<script setup>
import { ref, watch } from 'vue'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useHouseStore } from '@/stores/houseStore'
const houseStore = useHouseStore()
const props = defineProps({
    isOpen: { type: Boolean, default: false },
    document: { type: Object, default: null },
})
const emit = defineEmits(['close', 'updated', 'deleted'])
const visibleToByggherre = ref(false)
const isLoading = ref(false)
// Synkroniserer toggle-værdien når det valgte dokument ændrer sig
watch(() => props.document, (doc) => {
    if (doc) visibleToByggherre.value = doc.visibleToByggherre
})
// Opdaterer dokumentets synlighed i Firestore
const handleUpdate = async () => {
    const houseId = houseStore.house?.id
    if (!houseId || !props.document) return
    isLoading.value = true
    try {
        const docRef = doc(db, 'houses', houseId, 'documents', props.document.id)
        await updateDoc(docRef, { visibleToByggherre: visibleToByggherre.value })
        emit('updated')
        emit('close')
    } catch (err) {
        console.error('Update failed:', err)
    } finally {
        isLoading.value = false
    }
}
// Sletter dokumentet fra Firestore
const handleDelete = async () => {
    const houseId = houseStore.house?.id
    if (!houseId || !props.document) return
    isLoading.value = true
    try {
        const docRef = doc(db, 'houses', houseId, 'documents', props.document.id)
        await deleteDoc(docRef)
        emit('deleted')
        emit('close')
    } catch (err) {
        console.error('Delete failed:', err)
    } finally {
        isLoading.value = false
    }
}
// Lukker modalen uden at gemme ændringer
const handleClose = () => emit('close')
</script>
<template>
    <transition name="modal-fade">
        <div v-if="isOpen && document" class="doc-modal" @click.self="handleClose">
            <div class="doc-modal__content">
                <div class="doc-modal__topbar">
                    <button class="doc-modal__icon-btn doc-modal__icon-btn--close" @click="handleClose">✕</button>
                    <p class="doc-modal__title">{{ document.title }}</p>
                    <button
                        class="doc-modal__icon-btn doc-modal__icon-btn--confirm"
                        :disabled="isLoading"
                        @click="handleUpdate"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                            <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div class="doc-modal__toggle-row">
                    <span class="doc-modal__toggle-label">Synliggør for bygherre</span>
                    <label class="doc-modal__toggle">
                        <input type="checkbox" v-model="visibleToByggherre">
                        <span class="doc-modal__toggle-track"/>
                    </label>
                </div>
                <button class="doc-modal__delete-btn" :disabled="isLoading" @click="handleDelete">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                    </svg>
                    Slet dokument
                </button>
            </div>
        </div>
    </transition>
</template>