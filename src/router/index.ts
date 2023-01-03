import components from "./components";
import { createRouter, createWebHistory } from "vue-router";
import { useCommon } from "@/store/modules/ui/common";
import type { user } from "@/domain/user/user.interface";

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
        {
          path: "/payment/result",
          component: components.PaymentResultPage,
          meta: { transition: "", name: "paymentResult", title: "결제 완료" },
        },
        {
          path: "/mypage",
          component: components.MypagePage,
          meta: { transition: "", name: "mypage", title: "마이페이지" },
          children: [
            {
              path: "",
              component: components.main,
              meta: { transition: "slide-right" },
            },
            {
              path: "main",
              component: components.main,
              meta: { transition: "slide-right" },
            },
            {
              path: "mileage",
              component: components.mileageOverview,
              meta: { transition: "slide-right", title: "마일리지" },
            },
            {
              path: "mileage/overview",
              component: components.mileageOverview,
              meta: { transition: "slide-right", title: "마일리지" },
            },
          ],
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
          path: "signUp/setinfo",
          component: components.infoSet,
        },
        {
          path: "signUp/confirm",
          component: components.signUpComfirm,
        },
      ],
    },
    {
      path: "/chat",
      component: components.ChatViewVue,
    },
    {
      path: "/redirect",
      component: components.redirect,
    },
    {
      path: "/logout",
      component: components.logout,
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

router.beforeEach((to, from) => {
  window.scrollTo({ top: 0, behavior: "auto" });
  const localData = localStorage.getItem("user");
  const userNickname =
    localData == null ? `로그인하기` : (JSON.parse(localData) as user).nickname;

  const commonStore = useCommon();
  switch (to.path) {
    case "/account/login":
      if (userNickname != "로그인하기") {
        router.go(-1);
        break;
      }
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
    case "/account/signUp/confirm":
    case "/account/signUp/setinfo":
      commonStore.setheaderTitle("회원가입");
      commonStore.setcsShowLink(false);
      break;
    default:
      commonStore.resetheaderTitle;
      break;
  }
});
export default router;
