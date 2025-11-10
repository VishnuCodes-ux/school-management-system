import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref<any | null>(null);
    const token = ref<string | null>(null);
    const isAuthenticated = ref(false);
    const error = ref<string | null>(null);
    const loading = ref(false);

    const config = useRuntimeConfig();


    const login = async (email: string, password: string) => {
      try {
        loading.value = true;
        error.value = null;

        const { data, error: fetchError } = await useFetch(
          `${config.public.apiBase}/api/auth/login`,
          {
            method: "POST",
            body: { email, password },
          }
        );

        if (fetchError.value) {
          error.value = fetchError.value.message || "Login failed";
          return false;
        }

        if (data.value && data.value.token) {
          token.value = data.value.token;
          user.value = data.value.user;
          isAuthenticated.value = true;

          if (process.client) {
            localStorage.setItem("auth_token", data.value.token);
          }

          return data.value.user.role;
        } else {
          error.value = "Invalid response from server";
          return false;
        }
      } catch (err: any) {
        error.value = err.message;
        return false;
      } finally {
        loading.value = false;
      }
    };


    const register = async (formData: any) => {
      try {
        error.value = null;
        loading.value = true;

        if (formData.password !== formData.confirmPassword) {
          error.value = "Passwords do not match";
          return false;
        }

        const { data, error: fetchError } = await useFetch(
          `${config.public.apiBase}/api/auth/register`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (fetchError.value) {
          error.value = fetchError.value.data?.message || "Registration failed";
          return false;
        }

        return true;
      } catch (err: any) {
        error.value = err.message;
        return false;
      } finally {
        loading.value = false;
      }
    };

    const logout = () => {
      user.value = null;
      token.value = null;
      isAuthenticated.value = false;
      if (process.client) {
        localStorage.removeItem("auth_token");
      }
      return navigateTo("/auth/login");
    };

    return {
      user,
      token,
      isAuthenticated,
      error,
      loading,
      login,
      register,
      logout,
    };
  },
  {
    persist: true,
  }
);
