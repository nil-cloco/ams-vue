<template>
  <section
    class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-blue-200 to-cyan-200 dark:from-gray-600 dark:to-gray-400">

    <Card class="auth-container overflow-auto dark:!bg-gray-700">
      <template #title>
        <h4 class="font-semibold text-xl text-center">Artist Management System</h4>
      </template>
      <template #subtitle>
        <span class="text-center block">Please login</span>
      </template>

      <template #content>
        <Form v-slot="$form" :initialValues="initialData" :resolver="userValidator" class="flex flex-col"
          @submit="submitForm">

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

          <div class="form-row">
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

          <div class="flex flex-col gap-2 pt-4">
            <Button type="submit"><span class="font-semibold">Register</span></Button>
            <span class="block text-center">
              <span>Already have an accout ? </span>
              <RouterLink to="/login"> Login Here</RouterLink>
            </span>
          </div>
        </Form>
      </template>
    </Card>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { Card, DatePicker, Message, Select } from 'primevue'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import AuthService from '@/services/AuthService'
// import { useUiStore } from '@/stores/uiStore'
import { userValidator } from '@/validators/userValidator'
import { getGenderOptions, getRoleOptions, today } from '@/utils/utils'

const formSubmitted = ref(false)

const authService = new AuthService('/auth');

// const uiStore = useUiStore();

const initialData = {
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

const submitForm = async (event: FormSubmitEvent) => {
  formSubmitted.value = true;
  if (!event.valid) return;
  const data = event.values;

  delete data.confirm_password;
  data.dob = data.dob?.toDateString() || null;

  await authService.register(data).then(() => { }).catch(console.error)
}
</script>

<style scoped>
a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}
</style>
