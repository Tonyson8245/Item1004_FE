import LoginView from "@/views/LoginView.vue";
import MainView from "@/views/MainView.vue";
import loginComponent from "@/components/user/login/loginComponent.vue";
import findIDcomponent from "@/components/user/findID/ConfirmComponent.vue";
import findIDResultComponent from "@/components/user/findID/ResultComponent.vue";
import passwordConfirm from "@/components/user/changePassword/ConfirmComponent.vue";
import passwordSet from "@/components/user/changePassword/SetComponent.vue";
import infoSet from "@/components/user/signUp/SetInfoComponent.vue";
import signUpComfirm from "@/components/user/signUp/ConfirmComponent.vue";
import searchModal from "@/components/header/search/searchComponmet_mobile.vue";
import mainPage from "@/components/home/mainPage.vue";
import writePage from "@/components/home/writePage.vue";
import postPage from "@/components/home/PostPage.vue";
import MypageViewVue from "@/views/MypageView.vue";
import PaymentResultPage from "@/components/home/PaymentResultPage.vue";
import paymentPageVue from "@/components/home/paymentPage.vue";
import paymetnTest from "@/views/Paymenttest.vue";
import ChatViewVue from "@/views/ChatView.vue";
import MypagePage from "@/components/mypage/mypagePage.vue";
import main from "@/components/mypage/detail/main.vue";
import mileageOverview from "@/components/mypage/detail/mileageOverview.vue";
import redirect from "@/components/user/signUp/redirect.vue";
import logout from "@/components/user/logout.vue";
import guide from "@/components/mypage/detail/mileageGuide.vue";
import userinfo from "@/components/mypage/detail/userinfo.vue";

export default {
  userinfo,
  guide,
  logout,
  redirect,
  mileageOverview,
  main,
  MypagePage,
  ChatViewVue,
  paymetnTest,
  paymentPageVue,
  MypageViewVue,
  PaymentResultPage,
  postPage,
  writePage,
  mainPage,
  searchModal,
  loginComponent,
  LoginView,
  findIDResultComponent,
  findIDcomponent,
  passwordConfirm,
  passwordSet,
  infoSet,
  signUpComfirm,
  MainView,
};
