<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-purple-600">Parent Dashboard</h1>
    <p class="text-gray-600">Welcome, Parent {{ authStore.user?.userName }}</p>
  </div>
</template>


<script setup>
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  layout: 'parent',
  middleware: ['auth'],
});

const authStore = useAuthStore();
</script>



