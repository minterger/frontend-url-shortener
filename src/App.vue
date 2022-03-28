<script setup>
import NavbarVue from "./components/Navbar.vue";
import Notifications from "./components/Notifications.vue";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();

authStore.getToken();
authStore.getUser();
</script>

<template>
  <div
    class="dark:text-slate-50 dark:bg-slate-900 min-h-screen flex items-center flex-col"
  >
    <navbar-vue></navbar-vue>
    <notifications></notifications>
    <router-view v-slot="{ Component }">
      <transition name="transition">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.transition-enter-active,
.transition-leave-active {
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
