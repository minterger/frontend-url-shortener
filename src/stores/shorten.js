import { defineStore } from "pinia";
import { useMainStore } from "./main";
import { useAuthStore } from "./auth";

import axios from "axios";

export const useShortenStore = defineStore("shorten", {
  state: () => ({
    mainStore: useMainStore(),
    authStore: useAuthStore(),
    loads: {
      shorten: false,
      delete: {},
    },
  }),
  actions: {
    async shortenUrl(longUrl) {
      this.loads.shorten = true;
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

        this.loads.shorten = false;

        if (res.data.ok) {
          this.mainStore.addNotification({
            type: "success",
            message: "Shortened URL successfully",
          });
          this.authStore.getUrls();
          return res.data.url._id;
        }
      } catch (error) {
        this.loads.shorten = false;

        if (error.response.data.msg) {
          this.mainStore.addNotification({
            type: "error",
            message: error.response.data.msg,
          });
        }
        return error.response.data.id;
      }
    },
    async deleteUrl(id) {
      this.loads.delete[id] = true;
      try {
        const res = await axios.delete(`${this.mainStore.apiUrl}/url/${id}`, {
          headers: {
            authorization: `${this.authStore.token}`,
          },
        });
        this.loads.delete[id] = false;

        if (res.data.ok) {
          this.mainStore.addNotification({
            type: "error",
            message: "URL deleted successfully",
          });
          this.authStore.getUrls();
        }
      } catch (error) {
        this.loads.delete[id] = false;

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
