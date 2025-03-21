<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from '@/components/common/NavBar.vue';
import { useAuthStore } from '@/states/authStore';
import PrimeViewComponents from './components/common/PrimeViewComponents.vue';
const authStore = useAuthStore()
</script>

<template>
  <PrimeViewComponents></PrimeViewComponents>
  <div class="sm:flex flex-col h-screen w-screen gap-4 overflow-auto sm:overflow-hidden">
    <NavBar v-if="authStore.isAuthenticated"></NavBar>
    <div class="flex-1 overflow-hidden flex flex-col">
      <RouterView :key="$route.fullPath"></RouterView>
    </div>
  </div>
</template>
