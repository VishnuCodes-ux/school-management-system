<script setup>
defineProps({
  name: {
    type: String,
    defualut: "Test",
    required: true,
  },
  userName: {
    type: String,
    defualut: "Test",
    required: true,
  },
});
</script>

<template>
  <div>
    <header class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-blue-700">{{ name }} Dashboard</h2>
      <p class="text-gray-500">Welcome, {{ userName }}</p>
    </header>
  </div>
</template>

<style lang="css" scoped>
</style>