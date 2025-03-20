<template>
  <div class="flex h-full w-full overflow-hidden gap-4">
    <GenericTable resource="artists" title="Artists" ref="tableRef" @new="dialogRef.open()">

      <template #action-buttons>
        <Button class="p-button p-button-secondary p-mr-2" v-tooltip.bottom="'Import'" size="small" @click="importDialogRef.open()">
          <i class="pi pi-file-import"></i>
          <span class="hidden sm:block">Import</span>
        </Button><Button class="p-button p-button-secondary p-mr-2" v-tooltip.bottom="'Export'" size="small"
          @click="apiService.exportCsv()">
          <i class="pi pi-file-export"></i>
          <span class="hidden sm:block">Export</span>
        </Button>
      </template>

      <template>
        <Column field="id" header="Id" />
        <Column field="name" header="Name" />
        <Column field="gender" header="Gender">
          <template #body="{ data }">
            {{ getGenderLabel(data.gender) }}
          </template>
        </Column>
        <Column field="address" header="Address" />
        <Column field="first_release_year" header="Release Year" />
        <Column field="no_of_albums_released" header="Albums Released" />
        <Column field="created_at" header="Created" class="w-1/12">
          <template #body="{ data }">
            {{ getDateInFormat(data.created_at) }}
          </template>
        </Column>
        <Column header="Actions" class="w-48">
          <template #body="{ data }">
            <div class="flex gap-3">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-secondary p-mr-2" outlined
                v-tooltip.bottom="'Edit'" @click="dialogRef.open(data.id)"></Button>
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="tableRef.onDelete(data)"
                v-tooltip.bottom="'Delete'"></Button>
              <RouterLink :to="`musics/${data.id}`">
                <Button icon="pi pi-send" class="p-button-rounded p-button-secondary p-mr-2"
                  v-tooltip.bottom="'View music'"></Button>
              </RouterLink>
            </div>
          </template>
        </Column>
      </template>

    </GenericTable>

    <ArtistDetail @afterClose="afterDialogClosed" ref="dialogRef"></ArtistDetail>

    <ImportDialog @afterClose="afterDialogClosed" ref="importDialogRef"></ImportDialog>
  </div>
</template>


<script setup lang="ts">
import ArtistDetail from '@/components/ArtistDetail.vue';
import GenericTable from '@/components/GenericTable.vue';
import ImportDialog from '@/components/importDialog.vue';
import ArtistService from '@/services/ArtistService';
import { getDateInFormat, getGenderLabel } from '@/utils/utils';
import { Button, Column } from 'primevue';
import { ref } from 'vue';

const apiService = new ArtistService()


const tableRef = ref()

const dialogRef = ref();
const importDialogRef = ref();

const afterDialogClosed = (dataSaved: boolean) => {
  if (dataSaved) {
    tableRef.value.getData();
  }
}

</script>
