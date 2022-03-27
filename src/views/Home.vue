<script setup>
import { useAuthStore } from "../stores/auth";
import { useShortenStore } from "../stores/shorten";
import { ref } from "vue";

const authStore = useAuthStore();
const shortenStore = useShortenStore();

const shortenLink = ref("");

const shorten = async () => {
  if (authStore.token) {
    shortenLink.value = await shortenStore.shortenUrl(shortenLink.value);
  } else {
    authStore.setNotification({
      message: "You must be logged in to shorten links",
      type: "error",
    });
  }
};
</script>

<template>
  <div class="w-full m-3 sm:w-11/12 lg:w-9/12 max-w-7xl px-3">
    <header
      class="my-12 flex flex-col-reverse sm:flex-row justify-center sm:justify-evenly items-center"
    >
      <div class="text-center sm:text-left max-w-lg">
        <h2 class="text-4xl mt-4 sm:mt-0 sm:text-5xl font-semibold">
          Shorten your links here
        </h2>
        <p class="mt-4 sm:mt-2">
          shorten links saving memory on our servers avoiding shortening already
          saved links
        </p>
      </div>
      <img alt="home svg" src="../assets/header-home.svg" />
    </header>

    <main class="flex gap-3 flex-col sm:flex-row">
      <input
        type="text"
        class="border flex-1 border-slate-400 dark:border-slate-700 dark:text-slate-50 dark:bg-slate-700 rounded px-3 py-2"
        placeholder="Paste your link here"
        v-model="shortenLink"
      />
      <button
        class="rounded-sm sm:w-2/12 bg-green-500 dark:bg-red-600 text-white px-3 py-2 hover:bg-green-600 hover:dark:bg-red-700 transition-colors duration-200"
        @click="shorten"
      >
        Shorten
      </button>
    </main>
  </div>
</template>
