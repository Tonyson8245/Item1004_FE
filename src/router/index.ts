import components from "./components";
import { createRouter, createWebHistory } from "vue-router";
import { useCommon } from "../store/modules/ui/common";
import type { user } from "../domain/user/user.interface";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { storeToRefs } from "pinia";

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
        needLogin: true,
        needCheckAdult: true,
      },
    },
    // 홈
    {
      path: "/",
      component: components.MainView,
      meta: { transition: "slide-right", name: "home", needLogin: false },
      children: [
        {
          path: "home",
          component: components.mainPage,
          meta: {
            transition: "slide-right",
            name: "home",
            navbar: true,
            needLogin: false,
          },
        },
        {
          path: "write",
          component: components.writePage,
          meta: {
            transition: "slide-right",
            name: "write",
            title: "거래 등록",
            navbar: false,
            needLogin: true,
            needCheckAdult: true,
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
            needLogin: true,
            needCheckAdult: true,
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
            needLogin: true,
            needCheckAdult: true,
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
            needLogin: true,
            needCheckAdult: true,
          },
        },
        {
          path: "/mypage/mileage/charge/result",
          component: components.mileageChargeResult,
          meta: {
            name: "chargeResult",
            title: "충전 완료",
            navbar: false,
            needLogin: true,
            needCheckAdult: true,
          },
        },
        {
          path: "/mypage/mileage/withdraw/result",
          component: components.milageWithdrawResult,
          meta: {
            name: "chargeResult",
            title: "출금 신청 완료",
            navbar: false,
            needLogin: true,
            needCheckAdult: true,
          },
        },
        {
          path: "/mypage/contractInfo",
          component: components.contractInfo,
          meta: {
            name: "contractInfo",
            title: "거래정보확인",
            navbar: false,
            needLogin: true,
            needCheckAdult: true,
          },
        },
        {
          path: "/mypage",
          component: components.MypagePage,
          meta: {
            transition: "",
            name: "mypage",
            title: "마이페이지",
            needLogin: true,
          },
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
              path: "mileage/withdraw",
              component: components.mileageWithdraw,
              meta: {
                title: "마일리지 출금",
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
            {
              path: "contractList/sell",
              component: components.contractListSell,
              meta: {
                title: "판매내역",
                navbar: false,
              },
            },
            {
              path: "contractList/buy",
              component: components.contractListBuy,
              meta: {
                title: "구매내역",
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
      meta: { transition: "", name: "chat", title: "채팅", needLogin: true },

      // 모바일에서 사용할 분기를 만들어준다.
      // 모바일에서 클릭 시 -> 채팅방 목록 -> 채팅창
      children: [
        {
          path: "",
          meta:{transition: "", name: "chat", title: "채팅", navbar: true , needLogin: true },
          components: {
            
            default: async () => {
              if (!isMobile()) {
                return components.chatPage;
              } else {
                return components.channelList;
              }
            },
          },
        },
        {
          path:"/new",
          components: {
            default: async ()=>{
                if(!isMobile()){
                  return  components.chatPage
                }    else{
                  return  components.inChat
                }
              } ,            
          },
        },
        {
          path:":channelId",
          components: {
            default: async () => {
              if (!isMobile()) {
                return components.chatPage;
              } else {
                return components.inChat;
              }
            },
          },
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

const isMobile = () => {
  return window.innerWidth < 640;
};

router.beforeEach((to, from) => {
  console.log("before");

  window.scrollTo({ top: 0, behavior: "auto" });
  const localData = localStorage.getItem("user");
  const refreshTokenData = localStorage.getItem("refreshToken");

  const userNickname =
    refreshTokenData == null || localData == null
      ? `로그인하기`
      : (JSON.parse(localData) as user).nickname;

  //접근 확인 하는 것들
  // if (to.matched[1] != undefined) {
  //   if (to.matched[1].path == "/mypage") checkLogin(); //마이페이지의
  // }

  if (to.meta.needLogin == true) {
    checkLogin();
    return;
  } else if (to.meta.needCheckAdult == true) {
    checkIsAdult();
    return;
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

  // 로그인 유무 확인
  function checkLogin() {
    var token = localStorage.getItem("refreshToken");
    if (token == null) {
      alert("로그인이 필요합니다.");
      router.replace(from);
    }
  }
  //성인 여부 확인
  function checkIsAdult() {
    var store = usemypageStore();
    var { storeUserInfo } = storeToRefs(store);
    //미성년자 사용 불가능하게 하는 코드
    var userInfo = storeUserInfo;
    console.log(!userInfo.value.isAdult);

    if (!userInfo.value.isAdult) {
      alert("미성년자는 사용이 불가능합니다.");
      router.replace(from);
    }
  }
});

export default router;
