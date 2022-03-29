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
          `${this.mainStore.apiUrl}/url`,
          { longUrl },
          {
            headers: {
              authorization: `${this.authStore.token}`,
            },
          }
        );

        console.log("normal");
        if (res.data.ok) {
          this.mainStore.addNotification({
            type: "success",
            message: "Shortened URL successfully",
          });
          this.authStore.getUrls();
          return res.data.url._id;
        }
      } catch (error) {
        if (error.response.data.msg) {
          this.mainStore.addNotification({
            type: "error",
            message: error.response.data.msg,
          });
        }
        return error.response.data.id;
      }
    },
    async deleteUrl(shortUrl) {
      try {
        const res = await axios.delete(
          `${this.mainStore.apiUrl}/url/${shortUrl}`,
          {
            headers: {
              authorization: `${this.authStore.token}`,
            },
          }
        );

        if (res.data.ok) {
          this.mainStore.addNotification({
            type: "error",
            message: "URL deleted successfully",
          });
          this.authStore.getUrls();
        }
      } catch (error) {
        if (error.response.data.msg) {
          this.mainStore.addNotification({
            type: "error",
            message: error.response.data.msg,
          });
        }
      }
    },
  },
});
