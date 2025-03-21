<template>
  <div class="flex h-full w-full overflow-hidden gap-4">
    <UserDetail @afterClose="afterDialogClosed" ref="dialogRef"></UserDetail>
    <UsersTable :dialogRef="dialogRef" ref="tableRef"></UsersTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserDetail from '@/components/users/UserDetail.vue';
import UsersTable from '@/components/users/UsersTable.vue';

const dialogRef = ref();
const tableRef = ref();

const afterDialogClosed = (dataSaved: boolean) => {
  if (dataSaved) {
    tableRef.value.getData();
  }
}
</script>
