import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { createHtmlPlugin } from "vite-plugin-html";

require("dotenv").config();
const VITE_GA_KEY = process.env.VITE_GA_KEY;
const VITE_HOTJAR_ID = process.env.VITE_HOTJAR_ID;
const VITE_NAVER_SEARCH_KEY = process.env.VITE_NAVER_SEARCH_KEY;
const VITE_NAVER_SITE_KEY = process.env.VITE_NAVER_SITE_KEY;

export default defineConfig(({ command, mode, ssrBuild }) => {
  if (mode == "production") {
    return {
      plugins: [
        vue(),
        createHtmlPlugin({
          minify: true,
          /**
            @default src/main.ts
           */
          entry: "src/main.ts",
          /**
            @default index.html
           */
          template: "/index.html",

          inject: {
            data: {
              injectGA:
                ` <script>
 console.log("G processing");
 window.dataLayer = window.dataLayer || [];
 function gtag() {
   dataLayer.push(arguments);
 }
 gtag("js", new Date());

 gtag("config", "` +
                VITE_GA_KEY +
                `");
</script>`,
              injectHotjar:
                `<script>
      console.log("H processing");
      (function (h, o, t, j, a, r) {
        h.hj =
          h.hj ||
          function () {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
        h._hjSettings = { hjid: ` +
                VITE_HOTJAR_ID +
                `, hjsv: 6 };
        a = o.getElementsByTagName("head")[0];
        r = o.createElement("script");
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
    </script>`,
              injectNaverSite:
                ` <meta
      name="naver-site-verification"
      content="` +
                VITE_NAVER_SITE_KEY +
                `"
    />`,
              injectGATag:
                `<script
      async
      src="https://www.googletagmanager.com/gtag/js?id=` +
                VITE_GA_KEY +
                `"
    ></script>`,
              injectNaverSearch:
                ` <script type="text/javascript" src="//wcs.naver.net/wcslog.js"></script>
    <script type="text/javascript">
      if (!wcs_add) var wcs_add = {};
      wcs_add["wa"] = "` +
                VITE_NAVER_SEARCH_KEY +
                `";
      if (window.wcs) {
        wcs_do();
      }
    </script>`,
            },
          },
        }),
      ],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
      },
    };
  } else {
    return {
      plugins: [vue()],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
      },
    };
  }
});
