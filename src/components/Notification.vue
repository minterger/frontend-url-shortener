<script setup>
import { useMainStore } from "../stores/main";

const mainStore = useMainStore();
</script>

<template>
  <transition-group name="fade">
    <div
      v-for="notification in mainStore.notifications"
      :key="notification.id"
      class="flex items-center justify-center"
    >
      v-if="show" class="fixed inset-0 z-50 bg-black bg-opacity-25" @click="show
      = false" >
    </div>
  </transition-group>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
