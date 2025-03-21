<script setup lang="ts">
import { getDateInFormat, getGenderLabel, getRoleSeverity } from '@/utils/utils';
import GenericTable from '@/components/common/GenericTable.vue';
import { Button, Column, Tag } from 'primevue';
import { useAuthStore } from '@/states/authStore';
import { ref } from 'vue';

const tableRef = ref()

const currentUserId = useAuthStore().getUserId;

const props = defineProps({
  dialogRef: {
    required: false
  },
  readonly: {
    required: false,
    type: Boolean
  }
});

defineExpose({getData: () => tableRef.value.getData()})
</script>

<template>
   <GenericTable resource="users" title="Users" :readonly="props.readonly" ref="tableRef" @new="props.dialogRef?.['open']()">
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
      <Column header="Actions" class="w-48" v-if="!props.readonly">
        <template #body="{ data }">
          <div class="flex gap-3">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-secondary p-mr-2" outlined
              v-tooltip.bottom="'Edit'" @click="props.dialogRef?.['open'](data.id)"></Button>
            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="tableRef.onDelete(data)"
              :disabled="data.id == currentUserId" v-tooltip.bottom="'Delete'"></Button>
          </div>
        </template>
      </Column>
    </GenericTable>
</template>
