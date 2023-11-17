import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  type RouteLocationNormalized,
} from "vue-router";
import HomeView from "@/views/HomeView.vue";

const authCheck = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: Function
) => {
  if (localStorage.getItem("token")) {
    next();
  } else {
    next("/auth");
  }
};

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/views/Auth.vue"),
      beforeEnter: (to, from, next) => {
        if (!!localStorage.getItem("token")) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: authCheck,
    },
    {
      path: "/:organization",
      name: "organization",
      component: () => import("@/views/Organization.vue"),
      beforeEnter: authCheck,
    },
    {
      path: "/:organization/:repository/tags/:tag",
      name: "tag",
      component: () => import("@/views/Tag.vue"),
      beforeEnter: authCheck,
    },
    {
      path: "/:organization/:repository",
      name: "repository",
      component: () => import("@/views/Tags.vue"),
      beforeEnter: authCheck,
    },
    {
      path: "/:organization/:repository/selected-tags/:tags",
      name: "selected-tags",
      component: () => import("@/views/SelectedTags.vue"),
      beforeEnter: authCheck,
    },
  ],
});

export default router;
