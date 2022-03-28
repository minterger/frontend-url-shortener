<script setup>
import { useRoute } from "vue-router";
import { useMainStore } from "../stores/main";
import axios from "axios";

const route = useRoute();
const mainStore = useMainStore();

const goUrl = () => {
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
</script>

<template>
  <div class="w-full m-3 sm:w-11/12 lg:w-9/12 max-w-7xl px-3">
    <main class="mt-3">
      <button @click="goUrl">GoUrl</button>
    </main>
  </div>
</template>
