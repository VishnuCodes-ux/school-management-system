<script setup>
definePageMeta({
  layout: 'auth',
});
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const email = ref("vishnu@gmail.com");
const password = ref("admin@1234");
let error = ref({});

const isValid = () => {
  let isError = false;
  error.value = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value === '') {
    error.value.email = "Email field is required";
    isError = true;
  } else if (!emailRegex.test(email.value)) {
    error.value.email = "Enter a valid email";
    isError = true;
  }

  if (password.value === "") {
    error.value.password = "Password field is required";
    isError = true;
  } else if (password.value.length < 6) {
    error.value.password = "Password must be at least 6 characters long";
    isError = true;
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
    error.value.password = "Password must contain at least one special character";
    isError = true;
  }

  return isError;
};

const handleLogin = async () => {
  if (isValid()) return;

  const role = await authStore.login(email.value, password.value);

  if (role) {
    console.log("🎉 Logged in successfully");

    switch (role) {
      case "admin":
        return router.push("/admin/dashboard");
      case "teacher":
        return router.push("/teacher/dashboard");
      case "parent":
        return router.push("/parent/dashboard");
      default:
        return router.push("/");
    }
  } else {
    console.error("❌ Login failed:", authStore.error);
  }
};


watch([email, password], () => {
  isValid();
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      
      <div v-if="authStore.error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
        {{ authStore.error }}
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            @blur="isValid" 
            v-model="email" 
            placeholder="Enter your email"
            class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          />
          <p v-if="error.email" class="text-red-500 text-sm mt-1">{{ error.email }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            @blur="isValid" 
            v-model="password" 
            type="password" 
            placeholder="Enter your password"
            class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          />
          <p v-if="error.password" class="text-red-500 text-sm mt-1">{{ error.password }}</p>
        </div>

        <button 
          type="submit"
          class="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          🚀 Login
        </button>
      </form>

      <p class="text-sm text-gray-600 text-center mt-4">
        Don't have an account?
        <a href="/auth/register" class="text-blue-600 hover:underline">Sign up</a>
      </p>
    </div>
  </div>
</template>