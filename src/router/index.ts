import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import loginComponent from "@/components/login/loginComponent.vue";
import findIDcomponent from "@/components/login/findID/ConfirmComponent.vue";
import findIDResultComponent from "@/components/login/findID/ResultComponent.vue";
import passwordConfirm from "@/components/login/ChangePassword/ConfirmComponent.vue";
import passwordSet from "@/components/login/ChangePassword/SetComponent.vue";
import { useCommon } from "@/store/modules/common";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      component: LoginView,
      children: [
        {
          path: "",
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
      ],
    },
  ],
});
router.beforeEach((to) => {
  const commonStore = useCommon();

  switch (to.path) {
    case "/login":
      commonStore.setheaderTitle("로그인");
      break;
    case "/login/findId/confirm":
    case "/login/findId/result":
      commonStore.setheaderTitle("아이디 찾기");
      break;
    case "/login/changePassword/confirm":
    case "/login/changePassword/set":
      commonStore.setheaderTitle("비밀번호 재설정");
      break;
    default:
      commonStore.resetheaderTitle;
      break;
  }
});
export default router;
