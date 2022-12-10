import { createApp } from "vue";
<<<<<<< HEAD
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/index";
import store from "@/store/index";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(store).mount("#app");
=======

import App from "./App.vue";
import store from "./store/index";
import "./assets/main.css";
import vueDebounce from "vue-debounce";
import router from "./router/index";

const app = createApp(App);

app.use(store).use(vueDebounce).use(router).mount("#app");
>>>>>>> Main-search
