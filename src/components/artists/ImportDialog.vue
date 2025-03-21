<template>
  <Dialog v-model:visible="visible" modal header="Import artists" :style="{ width: '50rem' }">
    <div class=" flex flex-col gap-6 ">
      <FileUpload ref="fileupload" mode="basic" name="file" :url="`${BaseUrl}artists/import`" accept=".csv"
        :maxFileSize="1000000" @upload="onUpload" :multiple="false" @beforeSend="beforeSend" />
      <Button label="Upload" @click="upload" severity="secondary"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/states/authStore';
import { useUiStore } from '@/states/uiStore';
import axios from 'axios';
import { Button, Dialog, FileUpload } from 'primevue';
import { ref, watch } from 'vue';
const visible = ref(false)
const importSuccess = ref(false)
const fileupload = ref();
const uiStore = useUiStore();
const authStore = useAuthStore();
const BaseUrl = axios.defaults.baseURL

const emit = defineEmits(['afterClose'])

watch(visible, val => {
  if (!val) emit('afterClose', importSuccess.value)
})

const open = async () => {
  importSuccess.value = false;
  visible.value = true;
}

defineExpose({
  open
})

const upload = () => {
  fileupload.value.upload();
}

const onUpload = () => {
  uiStore.showToast("Import Success", "Artist data imported", "success");
  importSuccess.value = true;
  visible.value = false;
}

const beforeSend = (request: XMLHttpRequest) => {
  request['xhr'].setRequestHeader('Authorization', `Bearer ${authStore.getToken}`);
  return request
}
</script>
