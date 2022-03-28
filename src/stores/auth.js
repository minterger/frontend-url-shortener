import { defineStore } from "pinia";
import { useMainStore } from "./main";
import { useRouter } from "vue-router";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    mainStore: useMainStore(),
    router: useRouter(),
    user: null,
    urls: [],
    token: null,
  }),
  actions: {
    async getUser() {
      try {
        if (this.token) {
          const res = await axios.get(this.mainStore.apiUrl + "/auth/", {
            headers: {
              authorization: `${this.token}`,
            },
          });
          if (res.data.ok) {
            this.urls = res.data.user.urls;
            delete res.data.user.urls;
            this.user = res.data.user;
          }
        }
      } catch (error) {
        this.mainStore.addNotification({
          type: "error",
          message: error.response.data.msg,
        });
        this.logout();
      }
    },

    async login(email, password) {
      try {
        const res = await axios.post(this.mainStore.apiUrl + "/auth/login", {
          email,
          password,
        });
        if (res.data.ok) {
          this.saveToken(res.data.token);
          this.getUser();
          this.router.push("/dashboard");
          this.mainStore.addNotification({
            type: "success",
            message: "Welcome back!",
          });
        }
      } catch (error) {
        this.mainStore.addNotification({
          type: "error",
          message: error.response.data.msg,
        });
      }
    },

    async register(email, password, confirmPassword) {
      try {
        const res = await axios.post(this.mainStore.apiUrl + "/auth/register", {
          email,
          password,
          confirmPassword,
        });

        if (res.data.ok) {
          this.saveToken(res.data.token);
          this.getUser();
          this.router.push("/dashboard");
          this.mainStore.addNotification({
            type: "success",
            message: "Welcome to Shorten Page!",
          });
        }
      } catch (error) {
        this.mainStore.addNotification({
          type: "error",
          message: error.response.data.msg,
        });
      }
    },

    logout() {
      this.user = null;
      this.removeToken();
      this.mainStore.addNotification({
        type: "success",
        message: "You have been logged out.",
      });
      this.router.push("/");
    },

    saveToken(token) {
      localStorage.setItem("token", token);
      this.token = token;
    },

    removeToken() {
      localStorage.removeItem("token");
      this.token = null;
    },

    getToken() {
      const token = localStorage.getItem("token");
      this.token = token ? token : null;
    },
  },
});
