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

export default {
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
