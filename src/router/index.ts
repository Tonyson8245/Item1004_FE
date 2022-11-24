import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import loginComponent from "@/components/login/loginComponent.vue";
import findIDcomponent from "@/components/login/findIDcomponent.vue";
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
          path: "findID",
          component: findIDcomponent,
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
    case "/login/":
      commonStore.setheaderTitle("로그인");
      break;
    case "/login/findId":
      commonStore.setheaderTitle("아이디 찾기");
      break;
    default:
      commonStore.resetheaderTitle;
      break;
  }
});

export default router;
