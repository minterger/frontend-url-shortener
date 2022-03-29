<script setup>
import { useRoute } from "vue-router";
import { useMainStore } from "../stores/main";
import axios from "axios";
import { ref } from "vue";

const route = useRoute();
const mainStore = useMainStore();

const goUrl = () => {
  if (buttonDisabled.value) return;
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
    });
};

const buttonDisabled = ref(true);

// contador para el tiempo de espera
const count = ref(5);

// intervalo para el contador
const interval = setInterval(() => {
  count.value--;
  if (count.value < 0) {
    clearInterval(interval);
    count.value = "Go";
    buttonDisabled.value = false;
  }
}, 1000);
</script>

<template>
  <div class="w-full m-3 sm:w-11/12 lg:w-9/12 max-w-7xl px-3">
    <main class="mt-3 flex flex-col items-center">
      <span class="my-10 text-3xl font-semibold">Wait to go</span>
      <button
        class="w-24 h-24 text-lg rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 align-middle text-center font-bold text-white border-2 border-blue-900 disabled:border-l-blue-900 transition-colors duration-200"
        :disabled="buttonDisabled"
        @click="goUrl"
      >
        {{ count }}
      </button>
    </main>
  </div>
</template>
