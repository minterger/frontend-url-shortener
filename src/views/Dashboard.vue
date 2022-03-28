<script setup>
import { useAuthStore } from "../stores/auth";
import { useShortenStore } from "../stores/shorten";
import ShortenForm from "../components/ShortenForm.vue";

const authStore = useAuthStore();
const shortenStore = useShortenStore();

const host = location.protocol + "//" + location.host;
</script>

<template>
  <div class="w-full m-3 sm:w-11/12 lg:w-9/12 max-w-7xl px-3">
    <main class="mt-3">
      <div>
        <h3 class="text-lg font-semibold mb-2">Shortenin your links here</h3>
        <shorten-form></shorten-form>
      </div>

      <div class="mt-6 w-full">
        <h3 class="text-lg font-semibold mb-2">List of your links</h3>

        <transition-group name="transition" tag="ul">
          <li
            v-for="url in authStore.urls"
            :key="url._id"
            class="border dark:border-slate-600 p-2 flex justify-between"
          >
            <div>
              <router-link :to="`/${url._id}`" class="mr-4 text-blue-600">{{
                `${host}/${url._id}`
              }}</router-link>
              <span class="text-xs">{{ url.longUrl }}</span>
            </div>
            <div>
              <span class="mr-2"> clicks: {{ url.clicks }}/500 </span>
              <button
                @click="shortenStore.deleteUrl(url._id)"
                class="px-2 py-1 bg-red-600 text-white rounded-sm"
              >
                Delete
              </button>
            </div>
          </li>
        </transition-group>
        <div v-if="authStore.urls.length < 1" class="flex justify-center">
          <span class="text-lg">You don't have any links yet. </span>
        </div>
      </div>
    </main>
  </div>
</template>
