<template>
  <div>
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-blue-700">Teacher Dashboard</h1>
      <p class="text-gray-600">Welcome, {{ authStore.user?.name }}</p>
    </div>

    <!-- Dashboard Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-2xl shadow-md border-t-4 border-blue-500">
        <h2 class="text-gray-700 text-lg font-semibold">Total Students</h2>
        <p class="text-3xl font-bold mt-2">124</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md border-t-4 border-green-500">
        <h2 class="text-gray-700 text-lg font-semibold">Classes Assigned</h2>
        <p class="text-3xl font-bold mt-2">5</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md border-t-4 border-yellow-500">
        <h2 class="text-gray-700 text-lg font-semibold">Attendance Today</h2>
        <p class="text-3xl font-bold mt-2">96%</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md border-t-4 border-red-500">
        <h2 class="text-gray-700 text-lg font-semibold">Pending Tasks</h2>
        <p class="text-3xl font-bold mt-2">3</p>
      </div>
    </div>

    <!-- Recent Classes Section -->
    <div class="bg-white p-6 rounded-2xl shadow-md mb-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Your Recent Classes</h2>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-3 border-b">Class</th>
            <th class="p-3 border-b">Subject</th>
            <th class="p-3 border-b">Date</th>
            <th class="p-3 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cls, i) in recentClasses" :key="i" class="hover:bg-gray-50">
            <td class="p-3 border-b">{{ cls.class }}</td>
            <td class="p-3 border-b">{{ cls.subject }}</td>
            <td class="p-3 border-b">{{ cls.date }}</td>
            <td class="p-3 border-b">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-semibold',
                  cls.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                ]"
              >
                {{ cls.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Announcements -->
    <div class="bg-white p-6 rounded-2xl shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Announcements</h2>
      <ul class="space-y-3">
        <li
          v-for="(note, i) in announcements"
          :key="i"
          class="p-4 rounded-lg bg-blue-50 border border-blue-100"
        >
          <p class="text-blue-800 font-semibold">{{ note.title }}</p>
          <p class="text-sm text-gray-600">{{ note.date }}</p>
          <p class="mt-1 text-gray-700">{{ note.message }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
definePageMeta({
  layout: 'teacher',
  middleware: ['auth']
})

const authStore = useAuthStore()

const recentClasses = [
  { class: '10-A', subject: 'Mathematics', date: '2025-11-06', status: 'Completed' },
  { class: '9-B', subject: 'Science', date: '2025-11-06', status: 'Ongoing' },
  { class: '8-A', subject: 'Physics', date: '2025-11-05', status: 'Completed' }
]

const announcements = [
  {
    title: 'Parent-Teacher Meeting',
    date: 'Nov 10, 2025',
    message: 'All class teachers must attend the PTA meeting at 3:00 PM.'
  },
  {
    title: 'Exam Schedule Released',
    date: 'Nov 8, 2025',
    message: 'Mid-term exam schedule has been uploaded to the portal.'
  }
]
</script>
