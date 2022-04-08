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
    loads: {
      urls: false,
      login: false,
      user: false,
      register: false,
    },
    isAuthenticated: false,
  }),
  actions: {
    async getUser() {
      try {
        if (this.token) {
          this.loads.user = true;
          const res = await axios.get(this.mainStore.apiUrl + "/auth/", {
            headers: {
              authorization: `${this.token}`,
            },
          });
          if (res.data.ok) {
            this.user = res.data.user;
            this.isAuthenticated = true;
          }
          this.loads.user = false;
        }
      } catch (error) {
        this.loads.user = false;
        this.validToken(error);
      }
    },

    async login(email, password) {
      this.loads.login = true;
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
        this.loads.login = false;
      } catch (error) {
        this.loads.login = false;
        if (error.response.data.msg) {
          this.mainStore.addNotification({
            type: "error",
            message: error.response.data.msg,
          });
        }
      }
    },

    async register(email, password, confirmPassword) {
      this.loads.register = true;
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
        this.loads.register = false;
      } catch (error) {
        this.loads.register = false;
        if (error.response.data.msg) {
          this.mainStore.addNotification({
            type: "error",
            message: error.response.data.msg,
          });
        }
      }
    },
    async getUrls() {
      this.loads.urls = false;
      try {
        const res = await axios.get(this.mainStore.apiUrl + "/url/all", {
          headers: {
            authorization: `${this.token}`,
          },
        });

        if (res.data.ok) {
          this.urls = res.data.urls;
        }
        this.loads.urls = true;
      } catch (error) {
        this.loads.urls = true;
        this.validToken(error);
        if (error.response.data.msg) {
          this.mainStore.addNotification({
            type: "error",
            message: error.response.data.msg,
          });
        }
      }
    },

    logout() {
      this.user = null;
      this.urls = [];
      this.isAuthenticated = false;
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

    validToken(error) {
      if (error.response.status === 401 && this.token) {
        this.logout();
        this.mainStore.addNotification({
          type: "error",
          message: "Session expired",
        });
      }
    },
  },
});
