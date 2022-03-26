<script setup>
import { useAuthStore } from "../stores/auth";
import { reactive } from "vue";

const authStore = useAuthStore();

const user = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});
</script>

<template>
  <div class="m-2">
    <h2 class="text-center my-10 text-2xl">Register your Account</h2>

    <div
      class="dark:border-none border max-w-sm shadow-lg mx-auto dark:bg-slate-800 rounded px-4 py-7 dark:highlight-white/5"
    >
      <form
        @submit.prevent="
          authStore.register(user.email, user.password, user.confirmPassword)
        "
      >
        <label for="email" class="block text-sm font-bold mb-1">Email</label>
        <input
          type="email"
          id="email"
          class="border dark:border-slate-800 w-full dark:text-slate-50 dark:bg-slate-700 rounded px-3 py-2"
          v-model="user.email"
          placeholder="Enter your email"
        />

        <label for="password" class="block text-sm font-bold mb-1 mt-3">
          Password
        </label>
        <input
          type="password"
          id="password"
          class="border dark:border-slate-800 w-full dark:text-slate-50 dark:bg-slate-700 rounded px-3 py-2"
          v-model="user.password"
          placeholder="Enter your password"
        />

        <input
          type="password"
          class="border dark:border-slate-800 w-full dark:text-slate-50 dark:bg-slate-700 rounded px-3 py-2 mt-3"
          v-model="user.confirmPassword"
          placeholder="Confirm your password"
        />

        <button
          type="submit"
          class="bg-blue-600 text-white rounded w-full px-4 py-2 mt-5 hover:bg-blue-700 transition-colors duration-200"
        >
          Register
        </button>
      </form>

      <div class="mt-5">
        <span class="text-xs text-gray-500 inline-block align-baseline">
          &nbsp;Do you have an account?
          <router-link
            to="/login"
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Login
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>
