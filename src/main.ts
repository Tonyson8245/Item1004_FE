import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "./assets/main.css";
import vueDebounce from "vue-debounce";

const app = createApp(App);

app.use(store).use(router).use(vueDebounce).mount("#app");
