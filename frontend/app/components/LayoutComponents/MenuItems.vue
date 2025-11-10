<script setup>
const authStore = useAuthStore()
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  icons,
} from "lucide-vue-next";
defineProps({
  isCollapsed: {
    type: Boolean,
    requiured: true,
  }
});
const role = computed(() => authStore.user?.role || 'guest')
const menuItems = computed(() => {
  switch (role.value) {
    case "admin":
      return [
        { label: "Dashboard", icon: LayoutDashboard, link: "/admin/dashboard" },
        { label: "Users", icon: Users, link: "/admin/users" },
      ];
    case "teacher":
      return [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          link: "/teacher/dashboard",
        },
        { label: "Students", icon: Users, link: "/teacher/students" },
        {
          label: "Attendance",
          icon: CalendarCheck,
          link: "/teacher/attendance",
        },
      ];
    case "parent":
      return [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          link: "/parent/dashboard",
        },
        { label: "Children", icon: Users, link: "/parent/children" },
      ];
    default:
      return [];
  }
});
</script>

<template>
  <div>
    <NuxtLink
      v-for="(item, index) in menuItems"
      :key="index"
      :to="item.link"
      class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10"
    >
      <component :is="item.icon" :size="20" />
      <span v-if="!isCollapsed">{{ item.label }}</span>
    </NuxtLink>
  </div>
</template>