<template>
  <section class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-blue-200 to-cyan-200 dark:from-gray-600 dark:to-gray-400">

    <Card class="auth-container overflow-auto dark:!bg-gray-700">
      <template #title>
        <h4 class="font-semibold text-xl text-center">Artist Management System</h4>
      </template>
      <template #subtitle>
        <span class="text-center block">Please login</span>
      </template>

      <template #content>
        <Form @submit="login" :initialValues="initialData" class="flex flex-col gap-4" novalidate>
          <div class="form-row">
            <div class="form-field">
              <label for="email" class="font-semibold">Email</label>
              <InputText id="email" type="email" name="email" placeholder="Email" fluid />
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label for="password" class="font-semibold">Password</label>
              <Password id="password" type="password" name="password" toggleMask placeholder="Password"
                :feedback="false" fluid />
            </div>
          </div>
          <div class="flex flex-col gap-2 pt-4">
            <Button type="submit"><span class="font-semibold">Login</span></Button>
            <span class="block text-center">
              <span>Don't have an accout yet ? </span>
              <RouterLink to="/signup"> Register Here</RouterLink>
            </span>
          </div>
        </Form>
      </template>
    </Card>
  </section>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { Card } from 'primevue'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import AuthService from '@/services/AuthService'
import { useUiStore } from '@/states/uiStore'


const authService = new AuthService('/auth');

const uiStore = useUiStore();

const initialData = {
  email: "",
  password: ""
}

const login = async (event: FormSubmitEvent) => {
  const payload = event.values;
  if (payload.email?.trim() && payload.password?.trim) {
    authService.login(payload).then(() => console.log("LOGGED IN"))
  } else {
    uiStore.showToast("Error", "Please enter email and password")
  }

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

