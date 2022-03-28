import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/:id",
    name: "shorten",
    component: () => import("../views/Shorten.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  const { token } = useAuthStore();

  if (to.matched.some((record) => record.meta.requiresAuth && !token)) {
    next({
      path: "/",
    });
  } else if (token && (to.name === "login" || to.name === "register")) {
    next({
      path: "/dashboard",
    });
  } else {
    next();
  }
});

export default router;
