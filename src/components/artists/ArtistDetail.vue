<template>
  <Dialog v-model:visible="visible" modal :header="artistData?.name || 'Add Artist'" :style="{ width: '50rem' }">
    <Form ref="formRef" v-slot="$form" :initialValues="artistData" :resolver="artistValidator" class="flex flex-col"
      @submit="submitForm">
      <span class="text-surface-500 dark:text-surface-400 block mb-4">
        {{ artistData.id ? "Edit artist data" : "Add new artist" }}
      </span>

      <div class="form-row">
        <div class="form-field">
          <label for="name" class="font-semibold">Name *</label>
          <InputText id="name" class="flex-auto" autocomplete="off" name="name"
            :invalid="$form.name?.invalid && (formSubmitted || $form.name?.touched)" />
          <Message severity="error" variant="simple" size="small"
            :class="$form.name?.invalid && (formSubmitted || $form.name?.dirty) ? 'visible' : 'invisible'">
            {{ $form.name?.errors[0]?.message || 'test' }}
          </Message>
        </div>

        <div class="form-field max-w-38">
          <label for="gender" class="font-semibold">Gender *</label>
          <Select name="gender" :options="getGenderOptions()" optionLabel="label" option-value="value"
            placeholder="Gender" :invalid="$form.gender?.invalid && (formSubmitted || $form.gender?.touched)" />
          <Message severity="error" variant="simple" size="small"
            :class="$form.gender?.invalid && (formSubmitted || $form.gender?.dirty) ? 'visible' : 'invisible'">
            {{ $form.gender?.errors[0]?.message || 'test' }}
          </Message>
        </div>

        <div class="form-field max-w-38">
          <label for="dob" class="font-semibold">Date of Birth *</label>
          <DatePicker name="dob" id="dob" dateFormat="yy-mm-dd" :maxDate="today"
            :invalid="$form.dob?.invalid && (formSubmitted || $form.dob?.touched)">
          </DatePicker>

          <Message severity="error" variant="simple" size="small"
            :class="$form.dob?.invalid && (formSubmitted || $form.dob?.dirty) ? 'visible' : 'invisible'">
            {{ $form.dob?.errors[0]?.message || 'test' }}
          </Message>
        </div>
      </div>
      <div class="form-row">
        <div class="form-field">
          <label for="no_of_albums_released" class="font-semibold">Albums released *</label>
          <InputNumber id="no_of_albums_released" class="flex-auto" autocomplete="off" name="no_of_albums_released"
            :invalid="$form.no_of_albums_released?.invalid && (formSubmitted || $form.no_of_albums_released?.touched)" />
          <Message severity="error" variant="simple" size="small"
            :class="$form.no_of_albums_released?.invalid && (formSubmitted || $form.no_of_albums_released?.dirty) ? 'visible' : 'invisible'">
            {{ $form.no_of_albums_released?.errors[0]?.message || 'test' }}
          </Message>
        </div>
        <div class="form-field max-w-38">
          <label for="first_release_year" class="font-semibold">First release year *</label>
          <DatePicker name="first_release_year" id="first_release_year" dateFormat="yy" :maxDate="today" ref="dpRef"
            @year-change="onYearChange($event)" @focus="dpRef.switchToYearView($event)"
            :invalid="$form.first_release_year?.invalid && (formSubmitted || $form.first_release_year?.touched)">
          </DatePicker>

          <Message severity="error" variant="simple" size="small"
            :class="$form.first_release_year?.invalid && (formSubmitted || $form.first_release_year?.dirty) ? 'visible' : 'invisible'">
            {{ $form.first_release_year?.errors[0]?.message || 'test' }}
          </Message>
        </div>
      </div>

      <div class="form-row">
        <div class="form-field">
          <label for="address" class="font-semibold">Address</label>
          <InputText id="address" type="text" class="flex-auto" autocomplete="off" name="address"
            :invalid="$form.address?.invalid && (formSubmitted || $form.address?.touched)" />
          <Message severity="error" variant="simple" size="small"
            :class="$form.address?.invalid && (formSubmitted || $form.unknownaddress?.dirty) ? 'visible' : 'invisible'">
            {{ $form.address?.errors[0]?.message || 'test' }}
          </Message>
        </div>


      </div>

      <div class="flex justify-end gap-2 mt-8">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="submit" label="Save"></Button>
      </div>
    </Form>

  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getDateByYear, getGenderOptions, today } from '@/utils/utils';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { Button, DatePicker, Dialog, InputNumber, InputText, Message, Select, type DatePickerYearChangeEvent } from 'primevue';
import ApiService from '@/services/ApiService';
import { artistValidator } from '@/validators/artistValidator';
import { useUiStore } from '@/states/uiStore';

const visible = ref(false);
const dataSaved = ref(false);
const formSubmitted = ref(false);
const artistData = ref()
const artistId = ref()
const apiService = new ApiService("artists")
const formRef = ref();
const dpRef = ref();
const uiStore = useUiStore();

const initializeArtistData = () => {
  artistData.value = {
    id: null,
    name: "",
    dob: "",
    gender: "",
    address: "",
    first_release_year: "",
    no_of_albums_released: ""
  }
}

const emit = defineEmits(['afterClose'])

watch(visible, val => {
  if (!val) emit('afterClose', dataSaved.value)
})

watch(dataSaved, val => {
  if(val) uiStore.showToast("Saved", "Artist saved successfully", "success")
})

const open = async (id: number | null) => {
  artistId.value = id;
  dataSaved.value = false;
  formSubmitted.value = false;
  if (id) {
    await apiService.getById(id).then((res) => {
      artistData.value = { ...res, dob: res['dob'] ? new Date(res['dob']) : null , first_release_year: getDateByYear(res["first_release_year"]) };
      visible.value = true;
    }).catch(console.error)
  } else {
    initializeArtistData();
    visible.value = true;
  }
}

const submitForm = async (event: FormSubmitEvent) => {
  formSubmitted.value = true;
  if (!event.valid) return;
  const data = event.values;
  data.dob = data.dob?.toString() || null;
  data.first_release_year = data.first_release_year?.getFullYear() || null;
  if (artistData.value.id) {
    data['id'] = artistData.value.id;
    await apiService.update(data.id, data).then(() => {
      dataSaved.value = true;
      closeDialog();
    }).catch(console.error);
  } else {
    await apiService.create(data).then(() => {
      dataSaved.value = true;
      closeDialog();
    }).catch(console.error);
  }
}

const closeDialog = () => {
  visible.value = false;
  initializeArtistData();
}

const onYearChange = (event: DatePickerYearChangeEvent) => {
  formRef.value.setFieldValue('first_release_year', new Date(`${event.year}/01/01`))
  dpRef.value.overlayVisible = false
}

onMounted(() => {
  initializeArtistData()
})

defineExpose({
  open
})
</script>
