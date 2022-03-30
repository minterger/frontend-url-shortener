<script setup>
import { useAuthStore } from "../stores/auth";
import { useShortenStore } from "../stores/shorten";
import ShortenForm from "../components/ShortenForm.vue";

const authStore = useAuthStore();
const shortenStore = useShortenStore();

authStore.getUrls();

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

        <transition-group
          name="transition"
          class="flex flex-col gap-1"
          tag="ul"
        >
          <li
            v-for="url in authStore.urls"
            :key="url._id"
            class="border rounded dark:border-slate-600 p-2 flex justify-between flex-col sm:flex-row"
          >
            <div
              class="flex sm:items-center flex-col sm:flex-row sm:w-8/12 md:w-9/12"
            >
              <router-link
                :to="`/${url._id}`"
                class="mr-4 text-blue-600 truncate sm:overflow-visible"
                >{{ `${host}/${url._id}` }}</router-link
              >
              <span class="text-xs truncate">{{ url.longUrl }}</span>
            </div>
            <div class="flex sm:items-center flex-col sm:flex-row">
              <span class="sm:mr-2 mt-2 sm:mt-0 whitespace-nowrap">
                clicks: {{ url.clicks }}/500
              </span>
              <button
                @click="shortenStore.deleteUrl(url._id)"
                class="px-2 py-1 bg-red-600 text-white rounded-sm"
              >
                Delete
              </button>
            </div>
          </li>
        </transition-group>
        <div
          v-if="authStore.urls.length < 1 && authStore.loads.urls"
          class="flex justify-center"
        >
          <span class="text-lg">You don't have any links yet. </span>
        </div>
        <div
          v-if="authStore.urls.length < 1 && !authStore.loads.urls"
          class="flex justify-center"
        >
          <span class="text-lg align-middle mt-5"
            >Loading
            <box-icon
              name="loader"
              animation="spin"
              class="fill-black dark:fill-white align-middle ml-2 scale-150"
            ></box-icon
          ></span>
        </div>
      </div>
    </main>
  </div>
</template>
