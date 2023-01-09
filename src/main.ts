import { createApp, markRaw } from "vue";

import App from "./App.vue";
import store from "./store/index";
import "./assets/main.css";
import vueDebounce from "vue-debounce";
import router from "./router/index";
import type { Router } from "vue-router";

declare module "pinia" {
  export interface PiniaCustomProperties {
    router: Router;
  }
}

const app = createApp(App);

store.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(store).use(vueDebounce).use(router).mount("#app");
