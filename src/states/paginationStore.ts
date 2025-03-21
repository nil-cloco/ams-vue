import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { ToastMessageOptions } from 'primevue'

export const usePaginationStore = defineStore('pagination', () => {
  const pageCount = ref(0)
  const pageSize = ref(10)

  const toastRef: Ref<ToastMessageOptions> = ref({});

  const getPageCount = computed(() => pageCount.value)
  const getPageSize = computed(() => pageSize.value)

  const setPageCount = (val: number) => {
    if (val && val > 0) pageCount.value = val;
  }
  const setPageSize = (val: number) => {
    if (val && val > 0) pageSize.value = val;
  }

  const showToast = (summary: string, detail: string, severity: "error" | "success" | "info" | "warn" | "secondary" | "contrast" | null = null) => {
    toastRef.value = { severity: severity || 'error', summary, detail, life: 2000 }
  }

  return { toastRef, showToast, getPageCount, getPageSize, setPageCount, setPageSize }
})
