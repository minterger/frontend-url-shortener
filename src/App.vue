<script setup>
import NavbarVue from "./components/Navbar.vue";
import Notifications from "./components/Notifications.vue";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();

authStore.getToken();
authStore.getUser();
</script>

<template>
  <navbar-vue></navbar-vue>
  <notifications></notifications>
  <router-view v-slot="{ Component }">
    <transition name="transition">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.transition-enter-active,
.transition-leave-active {
  height: 0;
  transition: opacity 0.3s ease-in-out;
}
.transition-enter-active {
  transition-delay: 0.3s;
}

.transition-enter-from,
.transition-leave-to {
  opacity: 0;
}
</style>
