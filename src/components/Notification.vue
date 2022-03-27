<script setup>
import { useMainStore } from "../stores/main";

const mainStore = useMainStore();
</script>

<template>
  <transition-group>
    <div>
      <div
        v-for="notification in mainStore.notifications"
        :key="notification.id"
        class="flex items-center justify-center"
      >
        {{ notification.message }}
      </div>
    </div>
  </transition-group>
</template>
