<script setup>
import { useAuthStore } from "../stores/auth";
import { useMainStore } from "../stores/main";
import { useShortenStore } from "../stores/shorten";
import { ref, watch } from "vue";
import LoadSvg from "./svgs/LoadSvg.vue";

const authStore = useAuthStore();
const mainStore = useMainStore();
const shortenStore = useShortenStore();

const shortenLink = ref("");
const customId = ref("");
const enableCustomId = ref(false);
const host = location.protocol + "//" + location.host;

// customId replace spaces with nothing and / with -
watch(customId, (val) => {
  if (val) {
    customId.value = customId.value.replace(/\s/g, "").replace(/\//g, "-");
  }
});

watch(shortenLink, (val) => {
  if (val) {
    shortenLink.value = shortenLink.value.replace(/\s/g, "");
  }
});

const shorten = async () => {
  if (authStore.isAuthenticated && !shortenStore.loads.shorten) {
    const returnShorten = await shortenStore.shortenUrl(
      shortenLink.value,
      customId.value,
      enableCustomId.value
    );
    if (returnShorten) {
      enableCustomId.value = false;
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
  <form @submit.prevent="shorten" class="">
    <div class="flex gap-2 flex-col sm:flex-row w-full">
      <input
        type="text"
        class="border flex-1 sm:w-10/12 border-slate-400 dark:border-slate-700 dark:text-slate-50 dark:bg-slate-700 rounded px-3 py-2 disabled:cursor-wait"
        placeholder="Paste your link here"
        :disabled="shortenStore.loads.shorten"
        v-model="shortenLink"
      />
      <transition name="fade">
        <input
          v-if="enableCustomId"
          type="text"
          class="border sm:w-3/12 border-slate-400 dark:border-slate-700 dark:text-slate-50 dark:bg-slate-700 rounded px-3 py-2 disabled:cursor-wait"
          placeholder="Write your custom path here"
          v-model="customId"
        />
      </transition>
      <button
        :disabled="shortenStore.loads.shorten"
        class="rounded-sm sm:w-2/12 bg-green-500 dark:bg-red-600 text-white px-3 py-2 hover:bg-green-600 hover:dark:bg-red-700 transition-colors duration-200 disabled:cursor-wait"
      >
        <load-svg v-if="shortenStore.loads.shorten" />
        <template v-else>Shorten</template>
      </button>
    </div>

    <template v-if="authStore.user?.premium">
      <button
        class="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors"
        v-if="!enableCustomId"
        @click.prevent="enableCustomId = true"
      >
        Custom Path in URL (Premium, Beta Feature)
      </button>
      <button
        v-else
        class="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors"
        @click.prevent="enableCustomId = false"
      >
        Disable Custom Path
      </button>
    </template>
  </form>
</template>
