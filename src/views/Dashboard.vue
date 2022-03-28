<script setup>
import { useAuthStore } from "../stores/auth";
import { useShortenStore } from "../stores/shorten";
import { ref } from "vue";

const authStore = useAuthStore();
const shortenStore = useShortenStore();

const shortenLink = ref("");

const shorten = async () => {
  shortenLink.value = await shortenStore.shortenUrl(shortenLink.value);
};

</script>

<template>
  <div class="w-full m-3 sm:w-11/12 lg:w-9/12 max-w-7xl px-3">
    <main class="">
      <div class="flex gap-3 mt-3 flex-col sm:flex-row">
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
      </div>

      <div class="mt-3 w-full">
        List of your links
        <ul v-if="authStore.user.urls">
          <li v-for="url in urls" :key="url._id" class="border p-2 flex justify-between">
            <div>
              <a :href="url.shortUrl" class="mr-4 text-blue-600">{{ url.shortUrl }}</a>  <span class="text-xs">{{ url.longUrl }}</span>
            </div>
            <div>
              <span class="mr-2">
                clicks: {{ url.count }}/500
              </span>
              <button class="px-2 py-1 bg-red-600 text-white rounded-sm">Delete</button>
            </div>
          </li>
        </ul>
        <span class="block mx-auto my-4">add urls to show</span>
      </div>
    </main>
  </div>
</template>
