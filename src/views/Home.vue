<script setup>
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

authStore.getToken();
authStore.getUser();
</script>

<template>
  <img class="mx-auto" alt="Vue logo" src="../assets/logo.png" />
  {{ authStore.store }}
</template>
