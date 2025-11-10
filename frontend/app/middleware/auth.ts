export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return navigateTo('/auth/login');
  }

  // role-based protection
  const role = authStore.user?.role;

  if (to.path.startsWith('/admin') && role !== 'admin') {
    return navigateTo('/unauthorized');
  }

  if (to.path.startsWith('/teacher') && role !== 'teacher') {
    return navigateTo('/unauthorized');
  }

  if (to.path.startsWith('/parent') && role !== 'parent') {
    return navigateTo('/unauthorized');
  }
});
