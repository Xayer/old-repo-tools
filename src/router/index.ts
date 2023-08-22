import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const authCheck = (to, from, next) => {
  if (localStorage.getItem("token")) {
    next();
  } else {
    next("/auth");
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/views/Auth.vue"),
      beforeEnter: (to, from, next) => {
        if (!!localStorage.getItem("token")) {
          next("/");
        } else {
          next("/auth");
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
      path: "/:organization/",
      name: "organization",
      component: () => import("@/views/Organization.vue"),
      beforeEnter: authCheck,
      children: [
        {
          path: "/:organization/:repository/",
          name: "repository",
          component: () => import("@/views/Repository.vue"),
          beforeEnter: authCheck,
          children: [
            {
              path: "/:organization/:repository/pulls",
              name: "pulls",
              component: () => import("@/views/PullRequests.vue"),
              beforeEnter: authCheck,
            },
            {
              path: "/:organization/:repository/tags",
              name: "tags",
              component: () => import("@/views/Tags.vue"),
              beforeEnter: authCheck,
              children: [
                {
                  path: "/:organization/:repository/tags/selected/:tags",
                  name: "selected-tags",
                  component: () => import("@/views/SelectedTags.vue"),
                  beforeEnter: authCheck,
                },
                {
                  path: "/:organization/:repository/tags/:tag",
                  name: "tag",
                  component: () => import("@/views/Tag.vue"),
                  beforeEnter: authCheck,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

export default router;
