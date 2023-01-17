import components from "./components";
import { createRouter, createWebHistory } from "vue-router";
import { useCommon } from "../store/modules/ui/common";
import type { user } from "../domain/user/user.interface";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/paytus",
      component: components.paytus,
      meta: {
        transition: "",
        name: "",
        title: "거래/결제",
        navbar: false,
      },
    },
    // 홈
    {
      path: "/",
      component: components.MainView,
      meta: { transition: "slide-right", name: "home" },
      children: [
        {
          path: "home",
          component: components.mainPage,
          meta: { transition: "slide-right", name: "home", navbar: true },
        },
        {
          path: "write",
          component: components.writePage,
          meta: {
            transition: "slide-right",
            name: "write",
            title: "거래 등록",
            navbar: false,
          },
        },
        {
          path: "post",
          component: components.postPage,
          meta: {
            transition: "slide-right",
            name: "post",
            title: "거래 상세 정보",
            navbar: false,
          },
        },

        {
          path: "/payment",
          component: components.paymentPageVue,
          meta: {
            transition: "",
            name: "payment",
            title: "거래/결제",
            navbar: false,
          },
        },
        {
          path: "/payment/result",
          component: components.PaymentResultPage,
          meta: {
            transition: "",
            name: "paymentResult",
            title: "결제 완료",
            navbar: false,
          },
        },
        {
          path: "/mypage/mileage/charge/result",
          component: components.mileageChargeResult,
          meta: {
            name: "chargeResult",
            title: "충전 완료",
            navbar: false,
          },
        },
        {
          path: "/mypage",
          component: components.MypagePage,
          meta: { transition: "", name: "mypage", title: "마이페이지" },
          children: [
            {
              path: "",
              component: components.main,
              meta: { navbar: true },
            },
            {
              path: "main",
              component: components.main,
              meta: { navbar: true },
            },
            {
              path: "mileage",
              component: components.mileageOverview,
              meta: {
                title: "마일리지",
                navbar: false,
              },
            },
            {
              path: "mileage/overview",
              component: components.mileageOverview,
              meta: {
                title: "마일리지",
                navbar: false,
              },
            },

            {
              path: "mileage/guide",
              component: components.guide,
              meta: {
                title: "아이템천사 마일리지 안내",
                navbar: false,
              },
            },
            {
              path: "mileage/charge",
              component: components.mileageCharge,
              meta: {
                title: "마일리지 충전",
                name: `charge`,
                navbar: false,
              },
            },
            {
              path: "user/info",
              component: components.userinfo,
              meta: {
                title: "회원정보수정",
                navbar: false,
              },
            },
            {
              path: "user/info/putBankAccount",
              component: components.putBankAccount,
              meta: {
                title: "회원정보수정",
                navbar: false,
              },
            },
          ],
        },
      ],
    },
    // 검색결과
    {
      path: "/search",
      component: components.searchModal,
      meta: { transition: "slide-left" },
    },
    //로그인
    {
      path: "/account",
      component: components.LoginView,
      children: [
        {
          path: "login",
          component: components.loginComponent,
          meta: { title: "로그인" },
        },
        {
          path: "findID/confirm",
          component: components.findIDcomponent,
          meta: { title: "아이디 찾기" },
        },
        {
          path: "findID/result",
          component: components.findIDResultComponent,
          meta: { title: "아이디 찾기" },
        },
        {
          path: "changePassword/confirm",
          component: components.passwordConfirm,
          meta: { title: "비밀번호 재설정" },
        },
        {
          path: "changePassword/set",
          component: components.passwordSet,
          meta: { title: "비밀번호 재설정" },
        },
        {
          path: "signUp/setinfo",
          component: components.infoSet,
          meta: { title: "회원가입" },
        },
        {
          path: "signUp/confirm",
          component: components.signUpComfirm,
          meta: { title: "본인인증" },
        },
      ],
    },
    {
      path: "/chat",
      component: components.ChatViewVue,
      meta: { transition: "", name: "chat", title: "채팅" },

      // 모바일에서 사용할 분기를 만들어준다.
      // 모바일에서 클릭 시 -> 채팅방 목록 -> 채팅창
      children: [
        {
          path: "",
          component: components.chatPage,
        },
      ],
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
      redirect: () => {
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

  //마이페이지 접근시, 로그인이 안되있다면 이전 페이지로
  if (to.matched[1] != undefined) {
    if (to.matched[1].path == "/mypage")
      if (localData == null) {
        router.push("/account/login");
        return;
      }
  }

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
      commonStore.setheaderTitle("본인인증");
      commonStore.setcsShowLink(false);
      break;
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
