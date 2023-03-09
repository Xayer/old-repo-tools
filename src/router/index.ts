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
  ],
});

export default router;
