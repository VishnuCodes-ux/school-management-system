<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'

const authStore = useAuthStore()

const isCollapsed = ref(false)
const toggleSidebar = () => (isCollapsed.value = !isCollapsed.value)
const logout = () => authStore.logout()

const role = computed(() => authStore.user?.role || 'guest')
const name = computed(() => role.value.charAt(0).toUpperCase() + role.value.slice(1))

const sidebarClass = computed(() => {
  switch (role.value) {
    case 'admin':
      return 'bg-red-700 border-red-600'
    case 'teacher':
      return 'bg-blue-700 border-blue-600'
    case 'parent':
      return 'bg-green-700 border-green-600'
    default:
      return 'bg-gray-700 border-gray-600'
  }
})

</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside
      :class="[
        sidebarClass,
        'text-white transition-all duration-300 ease-in-out flex flex-col',
        isCollapsed ? 'w-20' : 'w-64'
      ]"
    >
      <div class="flex items-center justify-between p-4 border-b border-opacity-30">
        <h1 v-if="!isCollapsed" class="text-xl font-bold">{{ name }} Panel</h1>
        <button @click="toggleSidebar" class="text-white hover:text-gray-200">
          <ChevronLeft v-if="!isCollapsed" />
          <ChevronRight v-else />
        </button>
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <LayoutComponentsMenuItems  :isCollapsed="isCollapsed"/>
      </nav>

      <div class="p-4 border-t border-opacity-30">
        <button
          @click="logout"
          class="flex items-center gap-3 p-2 w-full hover:bg-white/10 rounded-lg"
        >
          <LogOut :size="20" />
          <span v-if="!isCollapsed">Logout</span>
        </button>
      </div>
    </aside>

    <main class="flex-1 p-8">
      <menu-header :name="name" :userName="authStore.user?.name" />
      <slot />
    </main>
  </div>
</template>
