import { defineStore } from "pinia";
import * as paymentApi from "@/api/payment-service/index";
import * as authApi from "@/api/auth-service/index";
import type mileageOveriewResponseDto from "@/domain/payment/mileageOverviewReponseDTO.interface";
import { putBankAccountBody } from "@/domain/auth";
import * as contractInfo from "@/domain/payment/contractPostDetailDto.interaface";
import { isNotEmptyObject } from "class-validator";
import {
  withdrawMileageResult,
  withdrawalMileageBody,
} from "@/domain/payment/withdrawMileage.interface";
import {
  contractPostListBody,
  card,
} from "@/domain/payment/contracPostListDto.interface";
import type { userInfowithScopeResult } from "@/domain/user/userInfowithScopeDto";
import type { userInfoOverviewResult } from "@/domain/user/userInfoOverview";
import type { userInfoResult } from "@/domain/user/userInfoDto";
import { checkwithdrawPointDtoResult } from "@/domain/payment/checkwithdrawPointDto.interface";
import type { user } from "@/domain/user/user.interface";

export const usemypageStore = defineStore("mypageStore", {
  state: () => ({
    // storeloginshowModal: false,
    storemileageOverview: null as mileageOveriewResponseDto | null,
    storePutBankAccountStatus: "",

    //거래 내역 관련
    //거래 내역 상세

    storeContractDetail: {} as contractInfo.contractPostDetailResult,

    //출금 관련
    storewithdrawAmt: 0,
    //출금 결과 관련
    storewithdrawResult: {} as withdrawMileageResult,

    storeContractListTabType: 0,
    storeContractListTotalPage: 0,
    storeContractList: [] as card[],
    storepage: 1,

    //Scope 해서 가져온 유저 정보 - 마일리지 출금에서 사용
    storeUserInfowithScope: {} as userInfowithScopeResult,

    storeUserInfo: {} as userInfoResult,
    storeUserInfoOverview: {} as userInfoOverviewResult,
    storecheckwithdrawPoint: {} as checkwithdrawPointDtoResult,
    storecheckuseablePoint: "",
  }),

  getters: {
    getterButtonContent: (state) => {
      if (isNotEmptyObject(state.storeContractDetail)) {
        if (state.storeContractDetail.my.isSeller) return "물품인계";
        else return "물품인수";
      } else {
        return "";
      }
    },
    getterMylevel: (state) => {
      if (!isNotEmptyObject(state.storeContractDetail)) return "";
      switch (state.storeContractDetail.my.contractLevelName) {
        case "rookie":
          return "level_rookie";
        case "bronze":
          return "level_bronze";
        case "silver":
          return "level_silver";
        case "gold":
          return "level_gold";
        case "platinum":
          return "level_platinum";
        case "diamond":
          return "level_diamond";
        default:
          return "";
      }
    },
    getterWriterlevel: (state) => {
      if (!isNotEmptyObject(state.storeContractDetail)) return "";
      switch (state.storeContractDetail.otherUser.contractLevelName) {
        case "rookie":
          return "level_rookie";
        case "bronze":
          return "level_bronze";
        case "silver":
          return "level_silver";
        case "gold":
          return "level_gold";
        case "platinum":
          return "level_platinum";
        case "diamond":
          return "level_diamond";
        default:
          return "";
      }
    },
    getterContractStageStatus: (state) => {
      var status = state.storeContractDetail;
      if (isNotEmptyObject(status)) {
        var process = status.contract.contractStageStatus;
        return parseInt(process);
      } else return 0;
    },
    getterContractDetail: (state) => {
      if (isNotEmptyObject(state.storeContractDetail)) {
        return state.storeContractDetail;
      } else {
        return new contractInfo.contractPostDetailResult();
      }
    },
    getterwithdrawResultBankname: (state) => {
      if (!isNotEmptyObject(state.storewithdrawResult)) return "";
      else {
        var bankname = state.storewithdrawResult.bankName;
        var accountNumber = state.storewithdrawResult.accountNumber;

        return "(" + bankname + ") " + accountNumber;
      }
    },
    getterstorewithdrawResult: (state) => {
      var data = state.storewithdrawResult;
      if (isNotEmptyObject(data)) return data;
      else return new withdrawMileageResult("", "", 0, 0);
    },
  },
  actions: {
    checkuseablePoint() {
      var userData = localStorage.getItem("user");
      if (userData == null) {
        alert("다시 로그인 후 시도해주세요");
        this.router.push("/logout");
        return;
      }
      var userIdx = (JSON.parse(userData) as user).idx;
      paymentApi
        .chechUseablePoint(userIdx.toString())
        .then((res) => {
          console.log(res);

          this.storecheckuseablePoint = res;
        })
        .catch((err) => {
          this.storecheckuseablePoint = "0";
        });
    },
    checkwithdrawPoint() {
      var userData = localStorage.getItem("user");
      if (userData == null) {
        alert("다시 로그인 후 시도해주세요");
        this.router.push("/logout");
        return;
      }
      var userIdx = (JSON.parse(userData) as user).idx;
      paymentApi
        .checkwithdrawPoint(userIdx.toString())
        .then((res) => {
          this.storecheckwithdrawPoint = res;
        })
        .catch((err) => {
          this.storecheckwithdrawPoint = new checkwithdrawPointDtoResult(0, 0);
        });
    },
    resetUserInfo() {
      this.storeUserInfo = {} as userInfoResult;
    },
    async getUserInfo() {
      console.log("실행!!");

      await authApi
        .getUserInfo()
        .then((res) => {
          this.storeUserInfo = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetUserInfoOverview() {
      this.storeUserInfoOverview = {} as userInfoOverviewResult;
    },
    getUserInfoOverview() {
      authApi
        .getMyInfoOverview()
        .then((res) => {
          console.log(res);
          this.storeUserInfoOverview = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async setContractTake(ordNm: string) {
      var result = false;
      await paymentApi
        .putContractTake(ordNm, this.storeContractDetail.otherUser.idx)
        .then((res) => {
          console.log(res);
          result = true;
        })
        .catch((err) => {
          console.log(err);
        });
      return result;
    },
    async setContractTakeover(ordNm: string) {
      var result = false;
      await paymentApi
        .putContractTakeover(ordNm)
        .then((res) => {
          console.log(res);
          result = true;
        })
        .catch((err) => {
          console.log(err);

          result = false;
        });
      return result;
    },
    setstorepage(page: number) {
      this.storepage = page;
    },

    resetContractList() {
      this.storeContractListTabType = 0;
      this.storeContractListTotalPage = 0;
      this.storeContractList = [] as card[];
    },
    getContractList(page: number, pageunit: number, type: string) {
      var stage = this.storeContractListTabType;
      var payload = new contractPostListBody(page, pageunit, stage, type);

      //값 초기화
      this.storeContractListTotalPage = 0;
      this.storeContractList = [] as card[];
      paymentApi
        .getContractPostList(payload)
        .then((res) => {
          this.storeContractListTotalPage = res.pagination.resultTotalPage;
          var list = res.card;
          if (list != undefined) this.storeContractList = [...list];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    setstoreContractListTabType(value: number) {
      this.storeContractListTabType = value;
    },
    setstorewithdrawAmt(amt: number) {
      if (isNaN(amt)) this.storewithdrawAmt = 0;
      else this.storewithdrawAmt = amt;
    },
    async postWithdrawMileage() {
      var amt = this.storewithdrawAmt;
      var bankName = this.storeUserInfo.bankName;
      var bankAccount = this.storeUserInfo.bankAccount;
      var userIdx = this.storeUserInfo.idx;
      var userName = this.storeUserInfo.name;
      var userTel = this.storeUserInfo.phone;

      var payload = new withdrawalMileageBody(
        amt,
        bankName,
        bankAccount,
        userIdx,
        userName,
        userTel
      );

      var result = false;
      await paymentApi
        .withdrawMileage(payload)
        .then((res) => {
          this.storewithdrawResult = res;
          result = true;
        })
        .catch((err) => {
          result = false;
        });
      return result;
    },
    getMileageOverview(userIdx: string) {
      paymentApi
        .getMileageOverview(userIdx)
        .then((res) => {
          console.log(res);
          this.storemileageOverview = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    putBankAccount(bankName: string, bankAccount: string) {
      var payload = new putBankAccountBody(bankName, bankAccount);
      authApi
        .putBankAccount(payload)
        .then((res) => {
          console.log(res);
          this.storePutBankAccountStatus = "success";
        })
        .catch((err) => {
          console.log(err);
          this.storePutBankAccountStatus = "failed";
        });
    },
    setstorePuBankAccountStore(status: string) {
      this.storePutBankAccountStatus = status;
    },
    getContractPostDetail(postIdx: number, ordNm: string) {
      var payload = new contractInfo.contractPostDetailBody(postIdx, ordNm);

      paymentApi
        .getcontractPostDetail(payload)
        .then((res) => {
          console.log(res);
          this.storeContractDetail = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
