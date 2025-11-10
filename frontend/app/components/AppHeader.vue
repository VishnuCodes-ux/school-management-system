<template>
  <header class="flex items-center justify-between bg-gray-800 text-white p-4">
    <h1 class="text-xl font-bold">My Dashboard</h1>

    <div class="flex items-center space-x-4">
      <span v-if="authStore.user">
        {{ authStore.user.name }} ({{ authStore.user.role }})
      </span>
      <button
        v-if="authStore.isAuthendicate"
        @click="handleLogout"
        class="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
};
</script>
