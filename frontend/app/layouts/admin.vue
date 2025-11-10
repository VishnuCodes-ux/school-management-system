<template>
  <div class="min-h-screen flex bg-gray-50">
    <aside class="w-64 bg-gray-800 text-white p-6">
      <h2 class="text-2xl font-bold mb-6">Admin Panel</h2>

      <nav>
        <ul class="space-y-3">
          <li>
            <NuxtLink
              to="/admin/dashboard"
              class="block px-3 py-2 rounded hover:bg-gray-700"
            >
              Dashboard
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/admin/users"
              class="block px-3 py-2 rounded hover:bg-gray-700"
            >
              Users
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/admin/teachers"
              class="block px-3 py-2 rounded hover:bg-gray-700"
            >
              Teachers
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/admin/subjects"
              class="block px-3 py-2 rounded hover:bg-gray-700"
            >
              Subjects
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="flex-1 p-8">
      <AppHeader />
      <div class="mt-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import AppHeader from '~/components/AppHeader.vue';
</script>
