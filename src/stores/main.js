import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    apiUrl: "http://localhost:4000",
    store: "main",
    notifications: [],
  }),
  actions: {
    addNotification(notification) {
      this.notifications.push(notification);
    },
    removeNotification(notification) {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== notification.id
      );
    },
  },
});
