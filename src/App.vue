<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import { useAuthStore } from '@/stores/authstore';
import PrimeViewComponents from './components/PrimeViewComponents.vue';
const authStore = useAuthStore()
</script>

<template>
  <PrimeViewComponents></PrimeViewComponents>
  <div class="sm:flex flex-col h-screen w-screen gap-4 overflow-auto sm:overflow-hidden">
    <NavBar v-if="authStore.isAuthenticated"></NavBar>
    <div class="flex-1 overflow-hidden">
      <RouterView :key="$route.fullPath"></RouterView>
    </div>
  </div>
</template>
