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
const maxClicks = ref();
const enablePremiumFeature = ref(false);
const host = location.protocol + "//" + location.host;

// customId replace spaces with nothing and / with -
watch(customId, (val) => {
  if (val) {
    customId.value = customId.value.replace(/[/ &$#"'`.\\]/g, "-");
  }
});

watch(shortenLink, (val) => {
  if (val) {
    shortenLink.value = shortenLink.value.replace(/\s/g, "");
  }
});

const shorten = async () => {
  if (authStore.isAuthenticated && !shortenStore.loads.shorten) {
    const returnShorten = await shortenStore.shortenUrl({
      longUrl: shortenLink.value,
      customId: customId.value,
      maxClicks: maxClicks.value,
      enablePremiumFeature: enablePremiumFeature.value,
    });
    if (returnShorten) {
      enablePremiumFeature.value = false;
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
        class="border flex-1 sm:w-8/12 border-slate-400 dark:border-slate-700 dark:text-slate-50 dark:bg-slate-700 rounded px-3 py-2 disabled:cursor-wait"
        placeholder="Paste your link here"
        :disabled="shortenStore.loads.shorten"
        v-model="shortenLink"
      />
      <transition-group name="fade">
        <template v-if="enablePremiumFeature">
          <input
            type="text"
            class="border sm:w-2/12 border-slate-400 dark:border-slate-700 dark:text-slate-50 dark:bg-slate-700 rounded px-3 py-2 disabled:cursor-wait"
            placeholder="Write your custom path here"
            v-model="customId"
          />
          <input
            type="text"
            class="border sm:w-2/12 border-slate-400 dark:border-slate-700 dark:text-slate-50 dark:bg-slate-700 rounded px-3 py-2 disabled:cursor-wait"
            placeholder="Max clicks (0 for unlimited)"
            v-model="maxClicks"
          />
        </template>
      </transition-group>
      <button
        :disabled="shortenStore.loads.shorten"
        class="rounded-sm sm:w-2/12 bg-green-500 dark:bg-red-600 text-white px-3 py-2 hover:bg-green-600 hover:dark:bg-red-700 transition-colors duration-200 disabled:cursor-wait"
      >
        <load-svg v-if="shortenStore.loads.shorten" />
        <template v-else>Shorten</template>
      </button>
    </div>

    <template v-if="authStore.user?.premium">
      <label class="inline-flex items-center mt-1">
        <input
          type="checkbox"
          class="h-5 w-5 text-blue-600"
          v-model="enablePremiumFeature"
        /><span class="ml-2 dark:text-slate-200 text-slate-700">
          Enable Custom Path</span
        >
      </label>
    </template>
  </form>
</template>
