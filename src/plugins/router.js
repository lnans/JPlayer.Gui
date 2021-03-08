import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/layouts/Login.vue"),
  },
  {
    path: "/error",
    name: "Error",
    component: () => import("@/layouts/Error.vue"),
  },
  {
    path: "/",
    name: "",
    component: () => import("@/layouts/Main.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/views/Index.vue"),
      },
      {
        path: "admin",
        name: "admin",
        component: () => import("@/views/Admin/Index.vue"),
      },
      {
        path: "admin/users",
        name: "users",
        component: () => import("@/views/Admin/Users/Index.vue"),
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
