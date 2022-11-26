import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import loginComponent from "@/components/login/loginComponent.vue";
import findIDcomponent from "@/components/login/findID/ConfirmComponent.vue";
import findIDResultComponent from "@/components/login/findID/ResultComponent.vue";
import passwordConfirm from "@/components/login/ChangePassword/ConfirmComponent.vue";
import passwordSet from "@/components/login/ChangePassword/SetComponent.vue";
import infoSet from "@/components/signin/SetInfoComponent.vue";
import signinComfirm from "@/components/signin/ConfirmComponent.vue";
import { useCommon } from "@/store/modules/common";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LoginView,
      children: [
        {
          path: "login",
          component: loginComponent,
        },
        {
          path: "findID/confirm",
          component: findIDcomponent,
        },
        {
          path: "findID/result",
          component: findIDResultComponent,
        },
        {
          path: "changePassword/confirm",
          component: passwordConfirm,
        },
        {
          path: "changePassword/set",
          component: passwordSet,
        },
        {
          path: "signin/setinfo",
          component: infoSet,
        },
        {
          path: "signin/confirm",
          component: signinComfirm,
        },
      ],
    },
  ],
});
router.beforeEach((to) => {
  const commonStore = useCommon();
  console.log(to.path);
  switch (to.path) {
    case "/login":
      commonStore.setheaderTitle("로그인");
      commonStore.setcsShowLink(true);
      break;
    case "/findid/confirm":
    case "/findid/result":
      commonStore.setheaderTitle("아이디 찾기");
      commonStore.setcsShowLink(true);
      break;
    case "/changepassword/confirm":
    case "/changepassword/set":
      commonStore.setheaderTitle("비밀번호 재설정");
      commonStore.setcsShowLink(true);
      break;
    case "/signin/confirm":
    case "/signin/setinfo":
      commonStore.setheaderTitle("회원가입");
      commonStore.setcsShowLink(false);
      break;
    default:
      commonStore.resetheaderTitle;
      break;
  }
});
export default router;
