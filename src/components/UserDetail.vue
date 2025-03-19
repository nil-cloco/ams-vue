<template>
  <Dialog v-model:visible="visible" modal
    :header="(userData?.first_name || userData?.last_Name) ? `${userData.first_name} ${userData.last_name}` : 'Add Artist'"
    :style="{ width: '50rem' }">
    <Form v-slot="$form" :initialValues="userData" :resolver="userValidator" class="flex flex-col" @submit="submitForm">
      <span class="text-surface-500 dark:text-surface-400 block mb-4">
        {{ userData.id ? "Edit user data" : "Add new user" }}
      </span>

      <div class="form-row">
        <div class="form-field">
          <label for="firstname" class="font-semibold">First Name *</label>
          <InputText id="firstname" class="flex-auto" autocomplete="off" name="first_name"
            :invalid="$form.first_name?.invalid && (formSubmitted || $form.first_name?.touched)" />
          <Message severity="error" variant="simple" size="small"
            :class="$form.first_name?.invalid && (formSubmitted || $form.first_name?.dirty) ? 'visible' : 'invisible'">
            {{ $form.first_name?.errors[0]?.message || 'test' }}
          </Message>
        </div>

        <div class="form-field">
          <label for="lastname" class="font-semibold">Last Name *</label>
          <InputText id="lastname" class="flex-auto" autocomplete="off" name="last_name"
            :invalid="$form.last_name?.invalid && (formSubmitted || $form.last_name?.touched)" />
          <Message severity="error" variant="simple" size="small"
            :class="$form.last_name?.invalid && (formSubmitted || $form.last_name?.dirty) ? 'visible' : 'invisible'">
            {{ $form.last_name?.errors[0]?.message || 'test' }}
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
      </div>
      <div class="form-row">
        <div class="form-field">
          <label for="email" class="font-semibold">Email *</label>
          <InputText id="email" class="flex-auto" autocomplete="off" type="email" name="email"
            :invalid="$form.email?.invalid && (formSubmitted || $form.email?.touched)" />
          <Message severity="error" variant="simple" size="small"
            :class="$form.email?.invalid && (formSubmitted || $form.email?.dirty) ? 'visible' : 'invisible'">
            {{ $form.email?.errors[0]?.message || 'test' }}
          </Message>
        </div>
        <div class="form-field max-w-44">
          <label for="role" class="font-semibold">Role *</label>
          <Select name="role" :options="getRoleOptions()" optionLabel="label" option-value="value"
            placeholder="Select role" :invalid="$form.role?.invalid && (formSubmitted || $form.role?.touched)">
          </Select>
          <Message severity="error" variant="simple" size="small"
            :class="$form.role?.invalid && (formSubmitted || $form.role?.dirty) ? 'visible' : 'invisible'">
            {{ $form.role?.errors[0]?.message || 'test' }}
          </Message>
        </div>
        <div class="form-field max-w-38">
          <label for="phone" class="font-semibold">Phone</label>
          <InputText id="phone" class="flex-auto" autocomplete="off" type="phone" name="phone"
            :invalid="$form.phone?.invalid && (formSubmitted || $form.phone?.touched)" />
          <Message severity="error" variant="simple" size="small"
            :class="$form.phone?.invalid && (formSubmitted || $form.phone?.dirty) ? 'visible' : 'invisible'">
            {{ $form.phone?.errors[0]?.message || 'test' }}
          </Message>
        </div>
      </div>

      <div class="form-row">
        <div class="form-field">
          <label for="address" class="font-semibold">Address</label>
          <InputText id="address" type="text" class="flex-auto" autocomplete="off" name="address"
            :invalid="$form.address?.invalid && (formSubmitted || $form.address?.touched)" />
          <Message severity="error" variant="simple" size="small"
            :class="$form.address?.invalid && (formSubmitted || $form.address?.dirty) ? 'visible' : 'invisible'">
            {{ $form.address?.errors[0]?.message || 'test' }}
          </Message>
        </div>

        <div class="form-field max-w-38">
          <label for="dob" class="font-semibold">Date of Birth</label>
          <DatePicker name="dob" id="dob" dateFormat="yy-mm-dd" :maxDate="today"
            :invalid="$form.dob?.invalid && (formSubmitted || $form.dob?.touched)">
          </DatePicker>

          <Message severity="error" variant="simple" size="small"
            :class="$form.dob?.invalid && (formSubmitted || $form.dob?.dirty) ? 'visible' : 'invisible'">
            {{ $form.dob?.errors[0]?.message || 'test' }}
          </Message>
        </div>
      </div>

      <div class="form-row" :hidden="userData?.id">
        <div class="form-field">
          <label for="password" class="font-semibold">Password</label>
          <Password :invalid="$form.password?.invalid && (formSubmitted || $form.password?.touched)" name="password"
            placeholder="Password" :feedback="false" fluid />
          <Message severity="error" variant="simple" size="small"
            :class="$form.password?.invalid && (formSubmitted || $form.password?.dirty) ? 'visible' : 'invisible'">
            {{ $form.password?.errors[0]?.message || 'test' }}
          </Message>
        </div>
        <div class="form-field">
          <label for="confirm_password" class="font-semibold">Confirm Password</label>
          <Password :invalid="$form.confirm_password?.invalid && (formSubmitted || $form.confirm_password?.touched)"
            name="confirm_password" placeholder="Confirm Password" :feedback="false" fluid />

          <Message severity="error" variant="simple" size="small"
            :class="$form.confirm_password?.invalid && (formSubmitted || $form.confirm_password?.dirty) ? 'visible' : 'invisible'">
            {{ $form.confirm_password?.errors[0]?.message || 'test' }}
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
import { userValidator } from '@/validators/userValidator';
import { onMounted, ref, watch } from 'vue';
import { getGenderOptions, getRoleOptions, today } from '@/utils/utils';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { Button, DatePicker, Dialog, InputText, Message, Password, Select } from 'primevue';
import ApiService from '@/services/ApiService';

const visible = ref(false);
const dataSaved = ref(false);
const formSubmitted = ref(false);
const userData = ref()
const userId = ref()
const apiService = new ApiService("users")

const initializeUserData = () => {
  userData.value = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    role: "",
    password: "",
    confirm_password: ""
  }
}

const emit = defineEmits(['afterClose'])

watch(visible, val => {
  if (!val) emit('afterClose', dataSaved.value)
})

const open = async (id: number | null) => {
  userId.value = id;
  if (id) {
    const info = await apiService.getById(id)
    userData.value = { ...info, password: '********', confirm_password: '********', dob: new Date(info.dob) };
  } else {
    initializeUserData();
  }
  dataSaved.value = false;
  formSubmitted.value = false;
  visible.value = true;
}

const submitForm = async (event: FormSubmitEvent) => {
  formSubmitted.value = true;
  if (!event.valid) return;
  const data = event.values;

  delete data.confirm_password;
  data.dob = data.dob.toLocaleDateString();

  if (userData.value.id) {
    data['id'] = userData.value.id;
    delete data.password;
    await apiService.update(data.id, data);
  } else {
    await apiService.create(data);
  }
  dataSaved.value = true;
  visible.value = false;
  initializeUserData();
}

onMounted(() => {
  initializeUserData()
})

defineExpose({
  open
})
</script>
