<script setup>
import { useMainStore } from "../stores/main";
import NotificationVue from "./Notification.vue";

const mainStore = useMainStore();
</script>

<template>
  <div class="fixed z-50 top-11 right-0">
    <transition-group name="fade">
      <notification-vue
        v-for="notification in mainStore.notifications"
        :key="notification.id"
        :id="notification.id"
        :type="notification.type"
        :message="notification.message"
      ></notification-vue>
    </transition-group>
  </div>
</template>
