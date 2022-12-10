<<<<<<< HEAD
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import loginComponent from "@/components/login/loginComponent.vue";
import findIDcomponent from "@/components/login/findIDcomponent.vue";
import { useCommon } from "@/store/modules/common";
=======
import components from "./components";
import { createRouter, createWebHistory } from "vue-router";
import { useCommon } from "@/store/modules/ui/common";
>>>>>>> Main-search

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
<<<<<<< HEAD
      path: "/login",
      component: LoginView,
      children: [
        {
          path: "",
          component: loginComponent,
        },
        {
          path: "findID",
          component: findIDcomponent,
=======
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
>>>>>>> Main-search
        },
      ],
    },
  ],
});
router.beforeEach((to) => {
  const commonStore = useCommon();
<<<<<<< HEAD
  console.log(to.path);
  switch (to.path) {
    case "/login":
    case "/login/":
      commonStore.setheaderTitle("로그인");
      break;
    case "/login/findId":
      commonStore.setheaderTitle("아이디 찾기");
=======
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
>>>>>>> Main-search
      break;
    default:
      commonStore.resetheaderTitle;
      break;
  }
});
<<<<<<< HEAD

=======
>>>>>>> Main-search
export default router;
