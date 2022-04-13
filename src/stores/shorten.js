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
    checkDelete: {},
  }),
  actions: {
    async shortenUrl(longUrl, customId, enableCustomId) {
      this.loads.shorten = true;
      if (enableCustomId && !customId) {
        this.mainStore.addNotification({
          type: "error",
          message: "Please enter a custom path",
        });
        this.loads.shorten = false;
        return;
      }
      try {
        const res = await axios.post(
          `${this.mainStore.apiUrl}/url`,
          { longUrl, customId: enableCustomId ? customId : null },
          {
            headers: {
              authorization: `${this.authStore.token}`,
            },
          }
        );

        if (res.data.ok) {
          this.mainStore.addNotification({
            type: "success",
            message: "Shortened URL successfully",
          });
          this.loads.shorten = false;
          this.authStore.getUrls();
          return res.data.url._id;
        }
      } catch (error) {
        this.loads.shorten = false;

        this.authStore.validToken(error);

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

        delete this.loads.delete[id];
        if (res.data.ok) {
          this.checkDelete[id] = true;
          this.mainStore.addNotification({
            type: "error",
            message: "URL deleted successfully",
          });
          this.authStore.getUrls();
          setTimeout(() => {
            delete this.checkDelete[id];
          }, 1000);
        }
      } catch (error) {
        delete this.loads.delete[id];

        this.authStore.validToken(error);

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
