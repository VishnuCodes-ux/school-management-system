import { defineStore } from 'pinia'
import { useRuntimeConfig } from '#app'
import { useAuthStore } from '~/stores/auth'

export const useTeacherStore = defineStore('teacher', () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const allTeachers = ref([])
  const loading = ref(false)
  const error = ref(null)

  const getTeachers = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await $fetch(`${config.public.apiBase}/api/auth/get-teachers`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json'
        }
      })

      allTeachers.value = res?.teachers || []
    } catch (err) {
      console.error('Error fetching teachers:', err)
      error.value = err.message || 'Failed to fetch teachers'
    } finally {
      loading.value = false
    }
  }

  return {
    allTeachers,
    getTeachers,
    loading,
    error
  }
})
