<template>
  <div class="flex h-full w-full overflow-hidden gap-4">
    <ArtistsTable :dialogRef="dialogRef" ref="tableRef"></ArtistsTable>
    <ArtistDetail @afterClose="afterDialogClosed" ref="dialogRef"></ArtistDetail>
  </div>
</template>


<script setup lang="ts">
import ArtistDetail from '@/components/artists/ArtistDetail.vue';
import ArtistsTable from '@/components/artists/ArtistsTable.vue';
import { ref } from 'vue';

const tableRef = ref()
const dialogRef = ref();

const afterDialogClosed = (dataSaved: boolean) => {
  if (dataSaved) {
    tableRef.value.getData();
  }
}
</script>
