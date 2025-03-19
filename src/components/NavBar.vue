<template>
  <Toolbar pt:center:class="flex gap-2" class="m-2">
    <template #start>
      <div class="app-logo">
        <h3 class="text-2xl">AMS</h3>
      </div>
    </template>

    <template #center>
      <RouterLink to="/users">
        <Button icon="pi pi-users" v-tooltip.bottom="'Users'" :severity="isActiveLink('users') ? '' : 'secondary'" />
      </RouterLink>
      <RouterLink to="/artists">
        <Button icon="pi pi-images" v-tooltip.bottom="'Artists'"
          :severity="isActiveLink('artists') ? '' : 'secondary'" />
      </RouterLink>
      <RouterLink to="/musics">
        <Button icon="pi pi-play" v-tooltip.bottom="'Musics'" :severity="isActiveLink('musics') ? '' : 'secondary'" />
      </RouterLink>
    </template>

    <template #end>
      <Button icon="pi pi-sign-out" v-tooltip.bottom="'Logout'" severity="danger" @click="onLogout" />
    </template>
  </Toolbar>
</template>


<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/authstore';
import { Button, Toolbar, useConfirm } from 'primevue';
import { RouterLink, useRoute } from 'vue-router';

const isActiveLink = (routePath: string) => {
  const route = useRoute();
  const path = route.path.split('/').filter(_ => _)[0]
  return path === routePath;
}

const confirm = useConfirm();

const authstore = useAuthStore();

const onLogout = () => {
  confirm.require({
    group: 'headless',
    icon: 'pi pi-sign-out',
    header: 'Are you sure',
    message: 'do you want to logout ?',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Logout',
      severity: 'danger'
    },
    accept: () => {
      authstore.resetUser();
      router.push("/")
    },
    reject: () => {
      console.log("logout cancel")
    },
  });
};
</script>
