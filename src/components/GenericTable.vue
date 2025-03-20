<template>
  <Card class="flex-1 h-full w-full" pt:body:class="flex-1 overflow-hidden"
    pt:content:class="flex flex-col flex-1 h-full w-full overflow-hidden">
    <template #title>
      <div class="flex justify-between align-middle">
        {{ props.title }}
        <div class="flex gap-2">
          <slot name="action-buttons"></slot>
          <Button class="p-button p-button-primary p-mr-2 " v-tooltip.bottom="`Add ${props.title}`" @click="emit('new')"
            size="small">
            <i class="pi pi-plus"></i>
            <span class="hidden sm:block">Add {{ props.title }}</span>

          </Button>
        </div>
      </div>
    </template>
    <template #content>
      <DataTable :value="data" stripedRows class="flex-1 overflow-auto" size="small">
        <slot></slot>
      </DataTable>
    </template>

    <template #footer>
      <Paginator :template="{
        '640px': 'PrevPageLink CurrentPageReport NextPageLink',
        '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
        '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown '
      }" :rows="pageSize" :totalRecords="total" :rows-per-page-options="[10, 20, 30]" @page="changePage($event)">
      </Paginator>
    </template>
  </Card>
</template>

<script setup lang="ts">
import ApiService from '@/services/ApiService';
import { Button, Card, DataTable, Paginator, type PageState } from 'primevue';
import { onMounted, ref } from 'vue';

import { useConfirm } from "primevue/useconfirm";

const props = defineProps({
  resource: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  service: {
    type: ApiService,
    required: false
  },
  extraGetParams: {
    type: Object,
    required: false
  }
});

const confirm = useConfirm();
const data = ref()
const page = ref(0)
const total = ref()
const pageSize = ref(10)
let apiService

const emit = defineEmits<{ new: [] }>()

onMounted(async () => {
  apiService = props.service || (new ApiService(props.resource))
  getData();
});

const changePage = (event: PageState) => {
  page.value = event.page
  pageSize.value = event.rows
  getData();
}

const getData = async () => {
  data.value = await apiService.getAll(page.value + 1, pageSize.value, [props.extraGetParams])
  total.value = parseInt(localStorage.getItem('x-total-count') || '0')
  pageSize.value = parseInt(localStorage.getItem('x-page-items') || '10')
}

const deleteResource = async (data: { id?: number }) => {
  await apiService.delete(data.id || 0);
  getData();
}

const onDelete = (data: { id?: number, message?: string }) => {
  confirm.require({
    group: 'headless',
    icon: 'pi pi-trash',
    header: 'Are you sure',
    message: data.message || 'Do you want to delete this record?',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: () => {
      deleteResource(data)
    },
    reject: () => {
      console.log("delete cancel")
    },
  });
};

defineExpose({
  getData, onDelete
})
</script>
