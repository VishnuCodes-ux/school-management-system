<script setup>
defineProps({
    users: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Active Users ({{ users?.count }})</h1>
        <table class="border-collapse border border-gray-300 w-full text-left">
            <thead>
                <tr class="bg-gray-100">
                    <th class="border border-gray-300 px-4 py-2">#</th>
                    <th class="border border-gray-300 px-4 py-2">Username</th>
                    <th class="border border-gray-300 px-4 py-2">Email</th>
                    <th class="border border-gray-300 px-4 py-2">Role</th>
                    <th class="border border-gray-300 px-4 py-2">Created At</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users?.users" :key="user._id" class="hover:bg-gray-50">
                    <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ user.userName }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ user.role }}</td>
                    <td class="border border-gray-300 px-4 py-2">
                        {{ new Date(user.createdAt).toLocaleString() }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="css" scoped></style>