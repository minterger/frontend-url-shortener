<script setup>
import { useAuthStore } from "../stores/auth";
import { useMainStore } from "../stores/main";
import { ref } from "vue";
import LoadSvg from "./svgs/LoadSvg.vue";

const authStore = useAuthStore();
const mainStore = useMainStore();

const toogleNav = ref(false);
</script>

<template>
  <nav
    class="z-50 flex justify-center items-center h-11 w-full bg-white border-b dark:border-slate-800 dark:bg-slate-900 shadow-lg"
  >
    <div
      class="w-full h-full relative sm:w-11/12 max-w-7xl px-3 flex justify-between items-center"
    >
      <router-link
        to="/"
        class="text-lg font-bold text-slate-900 dark:text-slate-50"
      >
        {{ mainStore.nameApp }}</router-link
      >

      <button class="sm:hidden px-2 py-1" @click="toogleNav = !toogleNav">
        <box-icon
          :name="[toogleNav ? 'x' : 'menu']"
          class="align-middle dark:fill-slate-50"
        ></box-icon>
      </button>

      <!-- desktop nav -->
      <ul
        class="hidden sm:flex border-slate-800 gap-2 items-stretch sm:bg-transparent"
      >
        <li class="flex flex-col items-stretch sm:items-center">
          <router-link
            to="/"
            class="px-3 py-1 text-center rounded-sm dark:text-slate-50"
          >
            Home
          </router-link>
        </li>
        <li class="flex flex-col items-stretch sm:items-center">
          <router-link
            :to="{ name: 'home', hash: '#about' }"
            class="px-3 py-1 text-center rounded-sm dark:text-slate-50"
          >
            About
          </router-link>
        </li>
        <li
          class="flex flex-col items-stretch sm:items-center"
          v-if="authStore.isAuthenticated"
        >
          <router-link
            to="/dashboard"
            class="px-3 py-1 text-center rounded-sm dark:text-slate-50"
          >
            Dashboard
          </router-link>
        </li>
        <li class="flex flex-col items-stretch" v-if="!authStore.loads.user">
          <router-link
            v-if="!authStore.isAuthenticated"
            to="/login"
            class="px-3 py-1 text-center rounded-sm text-slate-50 bg-blue-600 min-w-[5rem] cursor-pointer"
          >
            Login
          </router-link>
          <button
            v-else
            @click="authStore.logout"
            class="px-3 py-1 text-center rounded-sm text-slate-50 bg-blue-600 min-w-[5rem] cursor-pointer"
          >
            Logout
          </button>
        </li>
        <li class="flex flex-col items-stretch" v-else>
          <button
            class="px-3 py-1 text-center rounded-sm text-slate-50 bg-blue-600 min-w-[5rem] cursor-pointer"
          >
            <load-svg />
          </button>
        </li>
      </ul>

      <!-- mobile nav -->
      <ul
        class="sm:hidden flex border-t dark:border-slate-800 py-2 px-1 gap-2 flex-col items-stretch bg-white dark:bg-slate-900 shadow-lg absolute top-full left-0 w-full transition-all duration-200"
        :class="[
          toogleNav ? 'max-h-screen' : 'max-h-0 invisible overflow-hidden',
        ]"
      >
        <li class="flex flex-col items-stretch sm:items-center">
          <router-link
            to="/"
            class="px-3 py-1 text-center rounded-sm dark:text-slate-50"
          >
            Home
          </router-link>
        </li>
        <li class="flex flex-col items-stretch sm:items-center">
          <router-link
            :to="{ name: 'home', hash: '#about' }"
            class="px-3 py-1 text-center rounded-sm dark:text-slate-50"
          >
            About
          </router-link>
        </li>
        <li
          class="flex flex-col items-stretch sm:items-center"
          v-if="authStore.isAuthenticated"
        >
          <router-link
            to="/dashboard"
            class="px-3 py-1 text-center rounded-sm dark:text-slate-50"
          >
            Dashboard
          </router-link>
        </li>
        <li class="flex flex-col items-stretch" v-if="!authStore.loads.user">
          <router-link
            v-if="!authStore.isAuthenticated"
            to="/login"
            class="px-3 py-1 text-center rounded-sm text-slate-50 bg-blue-600"
          >
            Login
          </router-link>
          <button
            v-else
            @click="authStore.logout"
            class="px-3 py-1 text-center rounded-sm text-slate-50 bg-blue-600"
          >
            Logout
          </button>
        </li>
        <li class="flex flex-col items-stretch" v-else>
          <button
            class="px-3 py-1 text-center rounded-sm text-slate-50 bg-blue-600"
          >
            <load-svg />
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>
