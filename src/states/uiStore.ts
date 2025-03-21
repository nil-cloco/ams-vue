import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { ToastMessageOptions } from 'primevue'

export const useUiStore = defineStore('ui', () => {

  const toastRef: Ref<ToastMessageOptions> = ref({});

  const showToast = (summary: string, detail: string, severity: "error" | "success" | "info" | "warn" | "secondary" | "contrast" | null = null) => {
    toastRef.value = { severity: severity || 'error', summary, detail, life: 2000 }
  }

  return { toastRef, showToast }
})
