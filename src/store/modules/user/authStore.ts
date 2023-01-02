import { defineStore } from "pinia";
import * as userApi from "@/api/user-service/index";
import * as authApi from "@/api/auth-service/index";
import type { term } from "@/domain/user/serviceTermList.interface";
import { useLocalStorage, useToggle } from "@vueuse/core";
import type { niceEncrypotionDto } from "@/domain/auth/niceEncrypotionDto";

export const useauthStore = defineStore("authStore", {
  state: () => ({
    storeloginshowModal: false,

    storevalidServiceTerm: [] as term[],
    storesameUserIdisExist: "",
    storeuserCodeisExist: "",

    storeredirect: false,
  }),

  getters: {},
  actions: {
    //서비스 동의 약관
    async getServiceTerms() {
      userApi.getServiceTerms().then((res) => {
        if (res != undefined) {
          //@ts-ignore
          this.storevalidServiceTerm = res.result;
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
    //나이스 암호화 데이터 가져오는 방법
    async getNiceEncData<T>(
      mode: string
    ): Promise<niceEncrypotionDto | undefined> {
      let result;
      await authApi
        .getNiceEncDataAPI(mode)
        .then((res) => {
          result = res;
        })
        .catch((err) => {});
      return result;
    },
    //유저 아이디 중복 체크 해당 결과값을 받아서 화면으로 적용
    checkUserid(id: string) {
      userApi
        .checkUserid(id)
        .then((res) => {
          if (res == undefined) this.storesameUserIdisExist = "noExist";
          else this.storesameUserIdisExist = "Exist";
        })
        .catch((err) => {
          this.storesameUserIdisExist = "";
        });
    },
    //실패 할경우 화면에서 뒤로 보냄
    async checkAuthid(authId: string) {
      let result = false;
      await authApi
        .checkAuthid(authId)
        .then((res) => {
          result = true;
        })
        .catch((err) => {
          result = false;
        });
      return result;
    },
    //중복 체크 초기화
    resetstoresameUserIdisExist() {
      this.storesameUserIdisExist = ``;
    },
    checkPublicidx(idx: string) {
      userApi
        .checkPublicidx(idx)
        .then((res) => {
          if (res == undefined) this.storeuserCodeisExist = "noExist";
          else this.storeuserCodeisExist = "Exist";
        })
        .catch((err) => {
          this.storeuserCodeisExist = "noExist";
        });
    },
    resetstoreuserCodeisExist() {
      this.storeuserCodeisExist = ``;
    },
    async signUp(
      id: string,
      pw: string,
      terms: number[],
      recommender: string,
      authId: string
    ) {
      let result = false;
      await userApi
        .signUp(id, pw, terms, recommender, authId)
        .then((res) => {
          // useLocalStorage("accessToken", res.accessToken);
          // useLocalStorage("refreshToken", res.refreshToken);
          // useLocalStorage("user", res.user);
          result = true;
        })
        .catch((err) => {
          alert("오류가 발생했습니다.");
          result = false;
        });
      return result;
    },
  },
});
