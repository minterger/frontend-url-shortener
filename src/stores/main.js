import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    apiUrl: import.meta.env.VITE_API_URL,
    nameApp: import.meta.env.VITE_NAME_APP || "LinksTo",
    store: "main",
    notifications: [],
  }),
  actions: {
    addNotification(notification) {
      notification.id = Math.floor(Math.random() * 1000000);
      this.notifications.unshift(notification);
    },
    removeNotification(id) {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== id
      );
    },
  },
});
