<script setup>
import { useAuthStore } from "../stores/auth";
import { useMainStore } from "../stores/main";
import { useShortenStore } from "../stores/shorten";
import { ref } from "vue";
import LoadSvg from "./svgs/LoadSvg.vue";

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
    class="flex gap-2 flex-col sm:flex-row w-full"
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
      <load-svg v-if="shortenStore.loads.shorten" />
      <template v-else>Shorten</template>
    </button>
  </form>
</template>
