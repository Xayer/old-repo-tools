import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:organization/:repository/tags/:tag",
      name: "tag",
      component: () => import("@/views/Tag.vue"),
    },
    {
      path: "/:organization",
      name: "organization",
      component: () => import("@/views/Organization.vue"),
    },
    {
      path: "/:organization/:repository",
      name: "tags",
      component: () => import("@/views/Tags.vue"),
    },
  ],
});

export default router;
