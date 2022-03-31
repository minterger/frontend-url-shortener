<script setup>
import { useAuthStore } from "../stores/auth";
import { useMainStore } from "../stores/main";
import { useShortenStore } from "../stores/shorten";
import { ref } from "vue";

const authStore = useAuthStore();
const mainStore = useMainStore();
const shortenStore = useShortenStore();

const shortenLink = ref("");
const host = location.protocol + "//" + location.host;

const shorten = async () => {
  if (authStore.token) {
    const returnShorten = await shortenStore.shortenUrl(shortenLink.value);
    if (returnShorten) {
      shortenLink.value = `${host}/${returnShorten}`;
    }
  } else {
    mainStore.addNotification({
      message: "You must be logged in to shorten links",
      type: "error",
    });
  }
};
</script>

<template>
  <form
    @submit.prevent="shorten"
    class="flex gap-3 flex-col sm:flex-row w-full"
  >
    <input
      type="text"
      class="border flex-1 border-slate-400 dark:border-slate-700 dark:text-slate-50 dark:bg-slate-700 rounded px-3 py-2"
      placeholder="Paste your link here"
      v-model="shortenLink"
    />
    <button
      class="rounded-sm sm:w-2/12 bg-green-500 dark:bg-red-600 text-white px-3 py-2 hover:bg-green-600 hover:dark:bg-red-700 transition-colors duration-200"
    >
      <template v-if="shortenStore.loads.shorten">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          class="mx-auto motion-safe:animate-spin"
          style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: "
        >
          <path
            d="M2 11h5v2H2zm15 0h5v2h-5zm-6 6h2v5h-2zm0-15h2v5h-2zM4.222 5.636l1.414-1.414 3.536 3.536-1.414 1.414zm15.556 12.728-1.414 1.414-3.536-3.536 1.414-1.414zm-12.02-3.536 1.414 1.414-3.536 3.536-1.414-1.414zm7.07-7.071 3.536-3.535 1.414 1.415-3.536 3.535z"
          ></path>
        </svg>
      </template>
      <template v-else>Shorten</template>
    </button>
  </form>
</template>
