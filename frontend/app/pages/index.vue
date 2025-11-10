<script setup>
const config = useRuntimeConfig();

const { data: users, error } = await useFetch(`${config.public.apiBase}/api/auth/profile`);

if (error.value) console.error(error.value);
</script>

<template>
  <div class="p-6">
    <Table :users="users"/>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
}
</style>
