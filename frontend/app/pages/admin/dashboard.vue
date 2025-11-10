<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
    <p class="text-gray-600">Welcome, Admin {{ authStore.user?.userName }}</p>
  </div>
</template>


<script setup>
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
});

const authStore = useAuthStore();
</script>
