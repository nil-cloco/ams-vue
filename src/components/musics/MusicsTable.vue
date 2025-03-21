<script setup lang="ts">
import { getDateInFormat, getGenreLabel } from '@/utils/utils';
import GenericTable from '@/components/common/GenericTable.vue';
import { Button, Column } from 'primevue';
import { ref } from 'vue';

const tableRef = ref()

const props = defineProps({
  dialogRef: {
    required: false
  },
  readonly: {
    required: false,
    type: Boolean
  },
  extraGetParams: {
    type: Object,
    required: false
  },
});

defineExpose({getData: () => tableRef.value.getData()})

</script>

<template>
  <GenericTable resource="musics" title="Musics" ref="tableRef" @new="props.dialogRef?.['open']()" :readonly="props.readonly" :extra-get-params="props.extraGetParams">
      <Column field="id" header="Id" />
      <Column field="title" header="Title" />
      <Column field="artist_id" header="Artist" />
      <Column field="album_name" header="Album" />
      <Column field="genre" header="Genre">
        <template #body="{ data }">
          {{ getGenreLabel(data.genre) }}
        </template>
      </Column>
      <Column field="created_at" header="Created" class="w-1/12">
        <template #body="{ data }">
          {{ getDateInFormat(data.created_at) }}
        </template>
      </Column>

      <Column header="Actions" class="w-48" v-if="!props.readonly">
        <template #body="{ data }">
          <div class="flex gap-3">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-secondary p-mr-2" outlined
              v-tooltip.bottom="'Edit'" @click="props.dialogRef?.['open'](data.id)"></Button>
            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="tableRef.onDelete(data)"
              v-tooltip.bottom="'Delete'"></Button>
          </div>
        </template>
      </Column>
    </GenericTable>
</template>
