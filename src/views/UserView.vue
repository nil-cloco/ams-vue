<template>
  <div class="flex h-full w-full overflow-hidden gap-4">
    <GenericTable resource="users" title="Users" ref="tableRef" @new="dialogRef.open()">
      <Column field="id" header="Id" />
      <Column field="first_name" header="First Name" />
      <Column field="last_name" header="Last Name" />
      <Column field="created_at" header="Created">
        <template #body="{ data }">
          {{ getDateInFormat(data.created_at) }}
        </template>
      </Column>
      <Column field="role" header="Role">
        <template #body="{ data }">
          <Tag :value="data.role" :severity="getRoleSeverity(data.role)" />
        </template>
      </Column>
      <Column field="gender" header="Gender">
        <template #body="{ data }">
          {{ getGenderLabel(data.gender) }}
        </template>
      </Column>
      <Column field="email" header="Email" />
      <Column field="address" header="Address" />
      <Column header="Actions" class="w-48">
        <template #body="{ data }">
          <div class="flex gap-3">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-secondary p-mr-2" outlined
              v-tooltip.bottom="'Edit'" @click="dialogRef.open(data.id)"></Button>
            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="tableRef.onDelete(data)"
              :disabled="data.id == currentUserId" v-tooltip.bottom="'Delete'"></Button>
          </div>
        </template>
      </Column>
    </GenericTable>
    <UserDetail @afterClose="afterDialogClosed" ref="dialogRef"></UserDetail>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import GenericTable from '@/components/GenericTable.vue';
import { getDateInFormat, getGenderLabel, getRoleSeverity } from '@/utils/utils';
import { Button, Column, Tag } from 'primevue';
import UserDetail from '@/components/UserDetail.vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const tableRef = ref()

const currentUserId: number = authStore.getUser.id;

const dialogRef = ref();

const afterDialogClosed = (dataSaved: boolean) => {
  if (dataSaved) {
    tableRef.value.getData();
  }
}
</script>
