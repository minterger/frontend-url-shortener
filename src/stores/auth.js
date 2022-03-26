import { defineStore } from "pinia";
import { useMainStore } from "./main";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    store: "auth",
    user: null,
    token: null,
  }),
  actions: {
    async getUser() {
      const mainStore = useMainStore();
      try {
        if (this.token) {
          const res = await axios.get("/auth/", {
            headers: {
              authorization: `${this.token}`,
            },
          });
          if (res.data.ok) {
            this.user = res.data.user;
            mainStore.addNotification({
              id: Math.random(),
              type: "success",
              message: "Welcome back!",
            });
          } else {
            mainStore.addNotification({
              id: Math.random(),
              type: "error",
              message: "You are not logged in!",
            });
          }
        }
      } catch (error) {
        this.alert = error.response.data;
      }
    },

    async login(email, password) {
      const mainStore = useMainStore();
      try {
        const res = await axios.post("/auth/login", {
          email,
          password,
        });
        if (res.data.ok) {
          this.saveToken(res.data.token);
          this.getUser();
        } else {
          mainStore.addNotification({
            id: Math.random(),
            type: "error",
            message: res.data.msg,
          });
        }
      } catch (error) {
        mainStore.addNotification({
          id: Math.random(),
          type: "error",
          message: error.response.data.message,
        });
      }
    },

    async register(email, password, confirmPassword) {
      const mainStore = useMainStore();
      try {
        const res = await axios.post("/auth/register", {
          email,
          password,
          confirmPassword,
        });

        if (res.data.ok) {
          this.token = res.data.token;
          this.getUser();
        } else {
          mainStore.addNotification({
            id: Math.random(),
            type: "error",
            message: res.data.msg,
          });
        }
      } catch (error) {
        mainStore.addNotification({
          id: Math.random(),
          type: "error",
          message: error.response.data.message,
        });
      }
    },

    logout() {
      const mainStore = useMainStore();
      this.user = null;
      this.removeToken();
      mainStore.addNotification({
        id: Math.random(),
        type: "success",
        message: "You have been logged out.",
      });
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
