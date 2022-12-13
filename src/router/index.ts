import components from "./components";
import { createRouter, createWebHistory } from "vue-router";
import { useCommon } from "@/store/modules/ui/common";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/",
      component: components.MainView,
      meta: { transition: "slide-right", name: "home" },
      children: [
        {
          path: "home",
          component: components.mainPage,
          meta: { transition: "slide-right", name: "home" },
        },
        {
          path: "write",
          component: components.writePage,
          meta: {
            transition: "slide-right",
            name: "write",
            title: "거래 등록",
          },
        },
        {
          path: "post",
          component: components.postPage,
          meta: {
            transition: "slide-right",
            name: "post",
            title: "거래 상세 정보",
          },
        },
        {
          path: "/payment",
          component: components.paymentPageVue,
          meta: { transition: "", name: "payment", title: "거래/결제" },
        },
      ],
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

    {
      path: "/mypage",
      component: components.MypageViewVue,
      meta: { transition: "", name: "mypage" },
    },

    {
      path: "/:anything(.*)",
      redirect: (to) => {
        // the function receives the target route as the argument
        // we return a redirect path/location here.
        return { path: "/" };
      },
      meta: { transition: "", name: "" },
    },
  ],
});
router.beforeEach((to) => {
  window.scrollTo({ top: 0, behavior: "auto" });

  const commonStore = useCommon();
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
