import { createApp, markRaw } from "vue";
import { BrowserTracing } from "@sentry/tracing";

import App from "./App.vue";
import store from "./store/index";

import "./assets/main.css";
import vueDebounce from "vue-debounce";
import router from "./router/index";
import type { Router } from "vue-router";
import * as Sentry from "@sentry/vue";
import { VueCookieNext } from "vue-cookie-next";
import { createMetaManager } from 'vue-meta'

declare module "pinia" {
  export interface PiniaCustomProperties {
    router: Router;
  }
}

const app = createApp(App);
app.use(VueCookieNext);
const metaManager = createMetaManager()
app.use(metaManager)
// set default config
VueCookieNext.config({ expire: "7d" });

// set global cookie

Sentry.init({
  app,
  dsn: "https://083342a46fde45a992f2dea8f03653f0@o4504565091074048.ingest.sentry.io/4504565233745920",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracePropagationTargets: ["localhost", "item1004.co.kr", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

store.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(store).use(vueDebounce).use(router).mount("#app");
