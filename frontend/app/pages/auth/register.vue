<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-indigo-600 mb-6">
        Create an Account
      </h2>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <div>
          <label class="block text-gray-700 font-medium mb-1">Username</label>
          <input
            v-model="form.userName"
            type="text"
            placeholder="Enter your username"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Password</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="block text-gray-700 font-medium mb-1"
            >Confirm Password</label
          >
          <input
            v-model="form.confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <!-- Role -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Role</label>
          <select
            v-model="form.role"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option disabled value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="parent">Parent</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <!-- Parent Mobile -->
        <div v-if="form.role === 'parent'">
          <label class="block text-gray-700 font-medium mb-1"
            >Parent Mobile</label
          >
          <input
            v-model="form.parent_mobile"
            type="text"
            placeholder="Enter 10-digit mobile number"
            maxlength="10"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <!-- Status -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Status</label>
          <select
            v-model="form.status"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="1">Active</option>
            <option value="2">Inactive</option>
          </select>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-70"
        >
          {{ loading ? "Registering..." : "Register" }}
        </button>

        <!-- Message -->
        <p v-if="message" :class="messageClass" class="text-center mt-2">
          {{ message }}
        </p>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
definePageMeta({
  layout: 'auth',
});

const auth = useAuthStore();

const form = ref({
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  parent_mobile: "",
  status: 1,
});

const message = ref("");

const messageClass = computed(() =>
  message.value.includes("🎉")
    ? "text-green-600 font-medium"
    : "text-red-600 font-medium"
);

const handleRegister = async () => {
  message.value = "";
  const success = await auth.register(form.value);

  if (success) {
    message.value = "Registration successful 🎉 Redirecting to login...";
    setTimeout(() => {
      navigateTo("/auth/login");
    }, 1500);
  } else {
    message.value = auth.error || "Registration failed";
  }
};
</script>
