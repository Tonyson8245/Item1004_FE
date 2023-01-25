import { defineStore } from "pinia";
import * as userApi from "@/api/user-service/index";
import * as authApi from "@/api/auth-service/index";
import type { term } from "@/domain/user/serviceTermList.interface";
import { useLocalStorage } from "@vueuse/core";
import type * as authDto from "@/domain/auth/index";
import type { userPersonalDataResult } from "@/domain/user/userPersonalDataDto";

export const useauthStore = defineStore("authStore", {
  state: () => ({
    storeloginshowModal: false,

    storevalidServiceTerm: [] as term[],
    storesameUserIdisExist: "",
    storeuserCodeisExist: "",

    storeredirect: false,

    storeSocialIDisExist: "",
    storeCreateSMSshowModal: false,
    storeauthId: "95ae04a4-3e81-4539-9196-a5e456376206", //인증번호확인을 위한 authId
    storeCheckSMSisSuccess: false,

    storeuserID: "",
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
    ): Promise<authDto.niceEncrypotionDto | undefined> {
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

    //sms
    creatSMSCode(mode: string, body: authDto.CreateSmsCodeBodyDto) {
      authApi
        .creatSMSCode(mode, body)
        .then((res) => {
          this.storeCreateSMSshowModal = true;
          this.storeauthId = res as string; // authId를 바로 받음
        })
        .catch((err) => {
          //소셜아이디가 있는 경우
          if (err.meta.code == "extinct_local_reg") {
            // TODO 소셜아이디 붙일 때 추가하기
          }
        });
    },
    async checkSMSCode(data: authDto.checkSMSBodyDto) {
      //authId는 여기서 넣어준다.
      data.authid = this.storeauthId;
      var result;
      await authApi
        .chcekSms(data)
        .then((res) => {
          //성공했을때
          this.storeCheckSMSisSuccess = true;
          result = true;
        })
        .catch((err) => {
          this.storeCheckSMSisSuccess = false;
          result = false;
        });
      console.log(result);

      return result;
    },
    setstoreCreateSMSshowModal(mode: boolean) {
      this.storeCreateSMSshowModal = mode;
    },
    setstoreauthId(id: string) {
      this.storeauthId = id;
    },

    //아이디 찾기
    async getUserId(authId: string) {
      var result;
      await userApi
        .getUserId(authId)
        .then((res) => {
          this.storeuserID = res.result;
          this.storeauthId = ""; //초기화
          result = true;
        })
        .catch((err) => {
          console.log(err);

          this.storeauthId = ""; //초기화
          this.storeuserID = ""; //초기화
          result = false;
        });
      return result;
    },

    deleteToken() {
      authApi
        .deleteToken()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
