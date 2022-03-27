<script setup>
import { useAuthStore } from "../stores/auth";
import { reactive } from "vue";

const authStore = useAuthStore();

const user = reactive({
  email: "",
  password: "",
});
</script>

<template>
  <div class="m-3">
    <h2 class="text-center my-10 text-2xl">Login in your Account</h2>

    <div
      class="dark:border-none border max-w-sm shadow-lg mx-auto dark:bg-slate-800 rounded px-4 py-7 dark:highlight-white/5"
    >
      <form @submit.prevent="authStore.login(user.email, user.password)">
        <label
          for="email"
          class="block text-sm font-bold mb-1 text-slate-800 dark:text-slate-50"
          >Email</label
        >
        <input
          type="email"
          id="email"
          class="border dark:border-slate-800 w-full dark:text-slate-50 dark:bg-slate-700 rounded px-3 py-2"
          v-model="user.email"
          placeholder="Enter your email"
        />

        <label
          for="password"
          class="block text-sm font-bold mb-1 text-slate-800 dark:text-slate-50 mt-3"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          class="border dark:border-slate-800 w-full dark:text-slate-50 dark:bg-slate-700 rounded px-3 py-2"
          v-model="user.password"
          placeholder="Enter your password"
        />

        <button
          type="submit"
          class="bg-blue-600 text-white rounded w-full px-4 py-2 mt-5 hover:bg-blue-700 transition-colors duration-200"
        >
          Login
        </button>
      </form>

      <div class="mt-5">
        <span class="text-xs text-gray-500 inline-block align-baseline">
          &nbsp;Don't have an account?
          <router-link
            to="/register"
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Register
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>
