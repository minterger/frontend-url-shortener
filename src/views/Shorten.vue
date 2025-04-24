<script setup>
import { useRoute } from "vue-router";
import { useMainStore } from "../stores/main";
import axios from "axios";
import { ref, onUnmounted } from "vue";
import LoadSvg from "../components/svgs/LoadSvg.vue";

const route = useRoute();
const mainStore = useMainStore();

const load = ref(false);

const goUrl = () => {
  if (buttonDisabled.value) return;
  load.value = true;
  axios
    .get(mainStore.apiUrl + "/url/go/" + route.params.id)
    .then((res) => {
      window.location.href = res.data.url;
    })
    .catch((err) => {
      mainStore.addNotification({
        type: "error",
        message: err.response.data.msg,
      });
    })
    .then(() => {
      load.value = false;
    });
};

const buttonDisabled = ref(true);

// contador para el tiempo de espera
const count = ref(5);

// intervalo para el contador
const interval = setInterval(
  () => {
    count.value--;
    if (count.value < 0) {
      clearInterval(interval);
      count.value = "Go";
      buttonDisabled.value = false;
      // redirigir a la url
      // goUrl();
    }
  },
  count.value ? 1000 : 0
);

onUnmounted(() => clearInterval(interval));
</script>

<template>
  <div class="w-full sm:w-11/12 lg:w-9/12 max-w-7xl p-3">
    <main class="mt-3 flex flex-col items-center">
      <span class="my-10 text-3xl font-semibold">Wait to go</span>
      <button
        class="w-24 h-24 text-lg rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 align-middle text-center font-bold text-white border-2 border-blue-900 disabled:border-l-blue-900 transition-colors duration-200"
        :disabled="buttonDisabled"
        :key="count"
        @click="goUrl"
      >
        <load-svg v-if="load" />
        <template v-else>
          {{ count }}
        </template>
      </button>
    </main>
  </div>
</template>
