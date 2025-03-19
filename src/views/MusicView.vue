<template>
  <div class="flex h-full w-full overflow-hidden gap-4">
    <GenericTable resource="musics" :service="musicService" title="Musics" ref="tableRef" @new="dialogRef.open()"
      :extra-get-params="route.params">
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

      <Column header="Actions" class="w-48">
        <template #body="{ data }">
          <div class="flex gap-3">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-secondary p-mr-2" outlined
              v-tooltip.bottom="'Edit'" @click="dialogRef.open(data.id)"></Button>
            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="tableRef.onDelete(data)"
              v-tooltip.bottom="'Delete'"></Button>
          </div>
        </template>
      </Column>
    </GenericTable>

    <MusicDetail @afterClose="afterDialogClosed" ref="dialogRef" :artistId="artist_id">
    </MusicDetail>
  </div>
</template>


<script setup lang="ts">
import GenericTable from '@/components/GenericTable.vue';
import MusicDetail from '@/components/MusicDetail.vue';
import MusicService from '@/services/MusicService';
import { getDateInFormat, getGenreLabel } from '@/utils/utils';
import { Button, Column } from 'primevue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const tableRef = ref()
const dialogRef = ref();

const musicService = new MusicService();

const route = useRoute();

const artist_id = ref();

onMounted(() => {
  try {
    let id = route.params['artist_id'];
    if (typeof id == 'object') id = id[0];
    artist_id.value = parseInt(id)
  } catch (error) {
    console.log(error)
  }
})

const afterDialogClosed = (dataSaved: boolean) => {
  if (dataSaved) {
    tableRef.value.getData();
  }
}

</script>
