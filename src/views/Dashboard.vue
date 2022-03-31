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
  <div class="w-full sm:w-11/12 lg:w-9/12 max-w-7xl p-3">
    <main class="mt-3">
      <div>
        <h3 class="text-lg font-semibold mb-2">Shortenin your links here</h3>
        <shorten-form></shorten-form>
      </div>

      <div class="mt-6 w-full">
        <h3 class="text-lg font-semibold mb-2">List of your links</h3>

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
            <div class="flex sm:items-center flex-col sm:flex-row">
              <span class="sm:mr-2 mt-2 sm:mt-0 whitespace-nowrap">
                clicks: {{ url.clicks }}/500
              </span>
              <button
                @click="shortenStore.deleteUrl(url._id)"
                class="px-2 py-1 bg-red-600 text-white rounded-sm"
              >
                <template v-if="shortenStore.loads.delete[url._id]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    class="mx-auto motion-safe:animate-spin"
                    style="
                      fill: rgba(255, 255, 255, 1);
                      transform: ;
                      msfilter: ;
                    "
                  >
                    <path
                      d="M2 11h5v2H2zm15 0h5v2h-5zm-6 6h2v5h-2zm0-15h2v5h-2zM4.222 5.636l1.414-1.414 3.536 3.536-1.414 1.414zm15.556 12.728-1.414 1.414-3.536-3.536 1.414-1.414zm-12.02-3.536 1.414 1.414-3.536 3.536-1.414-1.414zm7.07-7.071 3.536-3.535 1.414 1.415-3.536 3.535z"
                    ></path>
                  </svg>
                </template>
                <template v-else
                  ><svg
                    class="hidden sm:block"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    style="
                      fill: rgba(255, 255, 255, 1);
                      transform: ;
                      msfilter: ;
                    "
                  >
                    <path
                      d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"
                    ></path>
                  </svg>
                  <span class="sm:hidden">Delete</span>
                </template>
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
