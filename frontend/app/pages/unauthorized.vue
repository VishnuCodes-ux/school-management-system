<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
    <h1 class="text-5xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
    <p class="text-gray-700 text-lg mb-6">
      You don’t have permission to access this page.
    </p>
    <NuxtLink
      to="/"
      class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Go Back Home
    </NuxtLink>
  </div>
</template>

<script setup>
// No logic needed here
</script>
