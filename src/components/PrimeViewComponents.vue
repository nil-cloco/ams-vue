<script setup lang="ts">
import { useUiStore } from '@/stores/uiStore';
import { Button, ConfirmDialog, Toast, useToast } from 'primevue';
import { watch } from 'vue';

const toast = useToast()
const uiStore = useUiStore()

watch(() => uiStore.toastRef, value => {
  toast.add(value);
})
</script>

<template>
  <Toast position="bottom-center"></Toast>
  <ConfirmDialog></ConfirmDialog>
  <ConfirmDialog group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
        <div class="rounded-full inline-flex justify-center items-center h-24 w-24 -mt-20"
          style="background-color: var(--p-button-text-danger-color); color: var(--p-button-danger-color)">
          <i :class="`${message.icon} !text-4xl`"></i>
        </div>
        <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
        <p class="mb-0">{{ message.message }}</p>
        <div class="flex items-center gap-2 mt-6">
          <Button :label="message.rejectProps.label" @click="rejectCallback"
            :severity="message.rejectProps.severity"></Button>
          <Button :label="message.acceptProps.label" @click="acceptCallback"
            :severity="message.acceptProps.severity"></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>
