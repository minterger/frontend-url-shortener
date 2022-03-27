<script setup>
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div class="w-full m-3 sm:w-11/12 lg:w-9/12 max-w-7xl px-3">
    <main class="flex gap-3 flex-col sm:flex-row">
      <ul class="">
        <li class="" v-for="url in authStore.user.urls" :key="url._id">
          {{ url.shortUrl }} : {{ url.longUrl }}
        </li>
      </ul>
    </main>
  </div>
</template>
