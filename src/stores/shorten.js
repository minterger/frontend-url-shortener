import { defineStore } from "pinia";
import { useMainStore } from "./main";
import { useAuthStore } from "./auth";

import axios from "axios";

export const useShortenStore = defineStore("shorten", {
  state: () => ({
    mainStore: useMainStore(),
    authStore: useAuthStore(),
  }),
  actions: {
    async shortenUrl(longUrl) {
      try {
        const res = await axios.post(
          `${this.mainStore.apiUrl}/shorten`,
          { longUrl },
          {
            headers: {
              authorization: `${this.authStore.token}`,
            },
          }
        );

        if (res.data.ok) {
          this.mainStore.addNotification({
            id: Math.random(),
            type: "success",
            message: "Shortened URL successfully",
          });
          this.authStore.getUser();
          return res.data.shortUrl;
        } else {
          this.mainStore.addNotification({
            id: Math.random(),
            type: "error",
            message: res.data.msg,
          });
        }
      } catch (error) {
        this.mainStore.addNotification({
          id: Math.random(),
          type: "error",
          message: error.response.data.message,
        });
      }
    },
    async deleteUrl(shortUrl) {
      try {
        const res = await axios.delete(
          `${this.mainStore.apiUrl}/shorten/${shortUrl}`,
          {
            headers: {
              authorization: `${this.authStore.token}`,
            },
          }
        );

        if (res.data.ok) {
          this.mainStore.addNotification({
            id: Math.random(),
            type: "success",
            message: "URL deleted successfully",
          });
          this.authStore.getUser();
        } else {
          this.mainStore.addNotification({
            id: Math.random(),
            type: "error",
            message: res.data.msg,
          });
        }
      } catch (error) {
        this.mainStore.addNotification({
          id: Math.random(),
          type: "error",
          message: error.response.data.message,
        });
      }
    },
  },
});
