import LoginView from "@/views/LoginView.vue";
import MainView from "@/views/MainView.vue";
import loginComponent from "@/components/user/login/loginComponent.vue";
import findIDcomponent from "@/components/user/findID/ConfirmComponent.vue";
import findIDResultComponent from "@/components/user/findID/ResultComponent.vue";
import passwordConfirm from "@/components/user/changePassword/ConfirmComponent.vue";
import passwordSet from "@/components/user/changePassword/SetComponent.vue";
import infoSet from "@/components/user/signin/SetInfoComponent.vue";
import signinComfirm from "@/components/user/signin/ConfirmComponent.vue";
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

export default {
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
  signinComfirm,
  MainView,
};
