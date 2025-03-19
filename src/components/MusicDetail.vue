<template>
  <Dialog v-model:visible="visible" modal :header="detailsData?.title || 'Add Music'" :style="{ width: '50rem' }">
    <Form ref="formRef" v-slot="$form" :initialValues="detailsData" :resolver="musicValidator" class="flex flex-col"
      @submit="submitForm">
      <span class="text-surface-500 dark:text-surface-400 block mb-4">
        {{ musicId ? "Edit music data" : "Add new music" }}
      </span>

      <div class="form-row">
        <div class="form-field">
          <label for="title" class="font-semibold">Title *</label>
          <InputText id="title" class="flex-auto" autocomplete="off" name="title"
            :invalid="$form.title?.invalid && (formSubmitted || $form.title?.touched)" />
          <Message severity="error" variant="simple" size="small"
            :class="$form.title?.invalid && (formSubmitted || $form.title?.dirty) ? 'visible' : 'invisible'">
            {{ $form.title?.errors[0]?.message || 'test' }}
          </Message>
        </div>

        <div class="form-field max-w-60">
          <label for="artist_id" class="font-semibold">Artist *</label>
          <Select name="artist_id" :options="artists" optionLabel="name" option-value="id" placeholder="Artist"
            :invalid="$form.artist_id?.invalid && (formSubmitted || $form.artist_id?.touched)" />
          <Message severity="error" variant="simple" size="small"
            :class="$form.artist_id?.invalid && (formSubmitted || $form.artist_id?.dirty) ? 'visible' : 'invisible'">
            {{ $form.artist_id?.errors[0]?.message || 'test' }}
          </Message>
        </div>
      </div>
      <div class="form-row">
        <div class="form-field">
          <label for="album_name" class="font-semibold">Album Name</label>
          <InputText id="album_name" autocomplete="off" name="album_name" fluid
            :invalid="$form.album_name?.invalid && (formSubmitted || $form.album_name?.touched)" />
          <Message severity="error" variant="simple" size="small"
            :class="$form.album_name?.invalid && (formSubmitted || $form.album_name?.dirty) ? 'visible' : 'invisible'">
            {{ $form.album_name?.errors[0]?.message || 'test' }}
          </Message>
        </div>
        <div class="form-field max-w-38">
          <label for="genre" class="font-semibold">Genre *</label>
          <Select name="genre" :options="getGenreOptions()" optionLabel="label" option-value="value" placeholder="Genre"
            :invalid="$form.genre?.invalid && (formSubmitted || $form.genre?.touched)" />
          <Message severity="error" variant="simple" size="small"
            :class="$form.genre?.invalid && (formSubmitted || $form.genre?.dirty) ? 'visible' : 'invisible'">
            {{ $form.genre?.errors[0]?.message || 'test' }}
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
import ArtistService from '@/services/ArtistService';
import MusicService from '@/services/MusicService';
import { getGenreOptions } from '@/utils/utils';
import { musicValidator } from '@/validators/musicValidator';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { Button, Dialog, InputText, Message, Select } from 'primevue';
import { onMounted, ref, watch } from 'vue';

const detailsData = ref()
const visible = ref(false);
const dataSaved = ref(false);
const formSubmitted = ref(false);
const musicId = ref()
const apiService = new MusicService()
const artistApiService = new ArtistService()
const formRef = ref();
const artists = ref([])

const emit = defineEmits(['afterClose'])

watch(visible, val => {
  if (!val) emit('afterClose', dataSaved.value)
})

onMounted(() => {
  initializeData()
  getArtistData()
})

const props = defineProps({
  artistId: {
    required: false
  },
})

const getArtistData = async () => {
  artists.value = await artistApiService.getAll(1, 100)
}

const initializeData = () => {
  detailsData.value = {
    artist_id: props.artistId || null,
    title: "",
    genre: "",
    album_name: ""
  }
}

const open = async (id: number | null) => {
  musicId.value = id;
  if (id) {
    detailsData.value = await apiService.getById(id)
  } else {
    initializeData();
  }
  dataSaved.value = false;
  formSubmitted.value = false;
  visible.value = true;
}

defineExpose({
  open
})

const submitForm = async (event: FormSubmitEvent) => {
  formSubmitted.value = true;
  if (!event.valid) return;
  const data = event.values;
  if (musicId.value) {
    data['id'] = musicId.value;
    await apiService.update(data.id, data);
  } else {
    await apiService.create(data);
  }
  dataSaved.value = true;
  visible.value = false;
  initializeData();
}


</script>
