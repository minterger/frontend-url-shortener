<script setup>
import { useAuthStore } from "../stores/auth";
import { useShortenStore } from "../stores/shorten";
import ShortenForm from "../components/ShortenForm.vue";
import LoadSvg from "../components/svgs/LoadSvg.vue";
import CheckSvg from "../components/svgs/CheckSvg.vue";
import TrashSvg from "../components/svgs/TrashSvg.vue";

const authStore = useAuthStore();
const shortenStore = useShortenStore();

authStore.getUrls();

const host = location.protocol + "//" + location.host;
</script>

<template>
  <div class="w-full sm:w-11/12 lg:w-9/12 max-w-7xl p-3">
    <main class="mt-3">
      <!-- links shortening form -->
      <div>
        <h3 class="text-lg font-semibold mb-2">Shorten your links here</h3>
        <shorten-form></shorten-form>
      </div>

      <div class="mt-6 w-full">
        <h3 class="text-lg font-semibold mb-2">List of your links</h3>

        <!-- transition-group with tag ul containing the saved links -->
        <transition-group name="fade" class="flex flex-col gap-1" tag="ul">
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

            <!-- click count and delete button -->
            <div class="flex items-center justify-between sm:justify-start">
              <span class="mr-2 mt-2 sm:mt-0 whitespace-nowrap">
                clicks: {{ url.clicks }}/500
              </span>
              <button
                @click="shortenStore.deleteUrl(url._id)"
                class="px-2 py-1 bg-red-600 text-white rounded-sm"
              >
                <load-svg v-if="shortenStore.loads.delete[url._id]" />
                <check-svg v-else-if="shortenStore.checkDelete[url._id]" />
                <template v-else>
                  <!-- <trash-svg class="hidden sm:block" /> -->
                  <trash-svg />
                  <!-- <span class="sm:hidden">Delete</span> -->
                </template>
              </button>
            </div>
          </li>
        </transition-group>

        <!-- no have any link -->
        <div
          v-if="authStore.urls.length < 1 && authStore.loads.urls"
          class="flex justify-center"
        >
          <span class="text-lg">You don't have any links yet. </span>
        </div>

        <!-- loading links from api -->
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
