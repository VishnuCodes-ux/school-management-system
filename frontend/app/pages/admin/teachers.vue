<template>
  <div class="p-6 bg-white rounded-lg shadow">
    <h1 class="text-2xl font-semibold mb-6 text-gray-800">Teachers</h1>

    <div v-if="store.loading" class="text-blue-600 font-medium">
      Loading teachers...
    </div>

    <div v-else-if="store.error" class="text-red-600 bg-red-100 p-3 rounded-md">
      Error: {{ store.error }}
    </div>

    <div v-else class="overflow-x-auto">
      <table
        class="min-w-full border border-gray-200 rounded-lg overflow-hidden"
      >
        <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th class="px-6 py-3 text-left border-b">#</th>
            <th class="px-6 py-3 text-left border-b">Name</th>
            <th class="px-6 py-3 text-left border-b">Email</th>
            <th class="px-6 py-3 text-left border-b">Role</th>
            <th class="px-6 py-3 text-left border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(teacher, index) in store.allTeachers"
            :key="teacher._id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-3 border-b">{{ index + 1 }}</td>
            <td class="px-6 py-3 border-b font-medium text-gray-800">
              {{ firstLetterUpperCase(teacher.userName) }}
            </td>
            <td class="px-6 py-3 border-b text-gray-600">
              {{ teacher.email }}
            </td>
            <td class="px-6 py-3 border-b text-gray-600">
              {{ firstLetterUpperCase(teacher.role) }}
            </td>
            <td class="px-6 py-3 border-b">
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="{
                  'bg-gray-300 text-gray-700': teacher.status === 0, // DELETED
                  'bg-yellow-100 text-yellow-800': teacher.status === 1, // PENDING
                  'bg-green-100 text-green-800': teacher.status === 2, // ACTIVE
                  'bg-red-100 text-red-800': teacher.status === 3, // SUSPENDED
                }"
              >
                {{ getStatusLabel(teacher.status) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="!store.allTeachers.length"
        class="text-gray-500 py-6 text-center"
      >
        No teachers found.
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });

const store = useTeacherStore();
const firstLetterUpperCase = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
const getStatusLabel = (status) => {
  switch (status) {
    case 0:
      return "Deleted";
    case 1:
      return "Pending";
    case 2:
      return "Active";
    case 3:
      return "Suspended";
    default:
      return "Unknown";
  }
};

onMounted(() => {
  store.getTeachers();
});
</script>
