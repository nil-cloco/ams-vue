<template>
  <div class="flex h-full w-full overflow-hidden gap-4">
    <MusicsTable :dialogRef="dialogRef" ref="tableRef" :extra-get-params="route.params"></MusicsTable>
    <MusicDetail @afterClose="afterDialogClosed" ref="dialogRef" :artistId="artist_id" > </MusicDetail>
  </div>
</template>


<script setup lang="ts">
import MusicDetail from '@/components/musics/MusicDetail.vue';
import MusicsTable from '@/components/musics/MusicsTable.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const tableRef = ref()
const dialogRef = ref();
const artist_id = ref();

const route = useRoute();


onMounted(() => {
  let id = route.params['artist_id'];
  if (typeof id == 'object') id = id[0];
  artist_id.value = parseInt(id)
})

const afterDialogClosed = (dataSaved: boolean) => {
  if (dataSaved) {
    tableRef.value.getData();
  }
}

</script>
