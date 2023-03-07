import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App).use(router).use(VueQueryPlugin).mount("#app");
