import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";

import "./assets/main.css";
import store from "./store";

const app = createApp(App);
app.use(Vuex).use(store);
app.use(router);
app.use(VueQueryPlugin).mount("#app");
