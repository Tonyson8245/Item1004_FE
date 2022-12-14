import { createApp } from "vue";

import App from "./App.vue";
import store from "./store/index";
import "./assets/main.css";
import vueDebounce from "vue-debounce";
import router from "./router/index";
// import LoadScript from "vue-plugin-load-script";

const app = createApp(App);

app.use(store).use(vueDebounce).use(router).mount("#app");

export { router };
