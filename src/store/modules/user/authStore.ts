import { defineStore } from "pinia";
import * as loginApi from "@/api/user-service/index";
import * as authApi from "@/api/auth-service/index";
import type { term } from "@/domain/user/serviceTermList.interface";
import { useLocalStorage } from "@vueuse/core";

export const useauthStore = defineStore("authStore", {
  state: () => ({
    storeloginshowModal: false,

    storevalidServiceTerm: {} as term[],
  }),

  getters: {},
  actions: {
    //서비스 동의 약관
    getServiceTerms() {
      loginApi.getServiceTerms().then((res) => {
        if (res != undefined) {
          this.storevalidServiceTerm = res.result.validServiceTerms;
        } else console.log(`error`);
      });
    },

    getToken(id: string, pw: string) {
      authApi
        .getToken(id, pw)
        .then((res) => {
          useLocalStorage("accessToken", res.accessToken);
          useLocalStorage("refreshToken", res.refreshToken);
          useLocalStorage("user", res.user);
          this.router.push("/");

          console.log(`store success`);
        })
        .catch((err) => {
          console.log(err);
          let errorCode = err.status;
          this.storeloginshowModal = true;
          console.log(errorCode);
          console.log(`store failed`);
        });
    },
    setstoreloginshowModal(status: boolean) {
      this.storeloginshowModal = status;
    },
  },
});
