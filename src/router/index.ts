import components from "./components";
import { createRouter, createWebHistory } from "vue-router";
import { useCommon } from "@/store/modules/ui/common";
import { useSearchStore } from "@/store/modules/home/searchStore";
import { storeToRefs } from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      component: components.MainView,
    },
    {
      path: "/search",
      component: components.searchModal,
      meta: { transition: "slide-left" },
    },
    {
      path: "/account",
      component: components.LoginView,
      children: [
        {
          path: "login",
          component: components.loginComponent,
        },
        {
          path: "findID/confirm",
          component: components.findIDcomponent,
        },
        {
          path: "findID/result",
          component: components.findIDResultComponent,
        },
        {
          path: "changePassword/confirm",
          component: components.passwordConfirm,
        },
        {
          path: "changePassword/set",
          component: components.passwordSet,
        },
        {
          path: "signin/setinfo",
          component: components.infoSet,
        },
        {
          path: "signin/confirm",
          component: components.signinComfirm,
        },
      ],
    },
  ],
});
router.beforeEach((to, from) => {
  const commonStore = useCommon();
  const searchStore = useSearchStore();
  const { storeShowSearchModal_mobile } = storeToRefs(searchStore);

  // console.log("from : " + from.path);
  // console.log(
  //   "storeShowSearchModal_mobile : " + storeShowSearchModal_mobile.value
  // );
  // if (from.path == "/" && storeShowSearchModal_mobile.value) {
  //   router.push("/");
  // }
  switch (to.path) {
    case "/account/login":
      commonStore.setheaderTitle("로그인");
      commonStore.setcsShowLink(true);
      break;
    case "/account/findid/confirm":
    case "/account/findid/result":
      commonStore.setheaderTitle("아이디 찾기");
      commonStore.setcsShowLink(true);
      break;
    case "/account/changepassword/confirm":
    case "/account/changepassword/set":
      commonStore.setheaderTitle("비밀번호 재설정");
      commonStore.setcsShowLink(true);
      break;
    case "/account/signin/confirm":
    case "/account/signin/setinfo":
      commonStore.setheaderTitle("회원가입");
      commonStore.setcsShowLink(false);
      break;
    default:
      commonStore.resetheaderTitle;
      break;
  }
});
export default router;
