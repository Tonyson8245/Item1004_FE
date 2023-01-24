import { defineStore } from "pinia";
import * as paymentApi from "@/api/payment-service/index";
import * as authApi from "@/api/auth-service/index";
import type mileageOveriewResponseDto from "@/domain/payment/mileageOverviewReponseDTO.interface";
import { putBankAccountBody } from "@/domain/auth";
import * as contractInfo from "@/domain/payment/contractPostDetailDto.interaface";
import { isNotEmptyObject } from "class-validator";
import { withdrawMileageResult } from "@/domain/payment/withdrawMileage.interface";
import {
  contractPostListBody,
  card,
} from "@/domain/payment/contracPostListDto.interface";
import type { userInfowithScopeResult } from "@/domain/user/userInfowithScopeDto";
import type { userInfoOverviewResult } from "@/domain/user/userInfoOverview";

export const usemypageStore = defineStore("mypageStore", {
  state: () => ({
    // storeloginshowModal: false,
    storemileageOverview: null as mileageOveriewResponseDto | null,
    storePutBankAccountStatus: "",

    //거래 내역 관련
    //거래 내역 상세
    storepostIdx: 1,
    storeordNm: "23465cda-448b-48bc-8da6-be331910531e",

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

    //overview 회원 정보 수정에서 사용
    storeUserInfoOverview: {} as userInfoOverviewResult,
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
        switch (process) {
          case "입금":
          case "인계중":
            return "take_ongoing";
          case "인수중":
            return "takeover_ongoing";
          case "인계완료":
            return "takeover_complete";
          case "인수완료":
            return "take_complete";
          case "거래취소":
            return "cancel";
        }
      } else return "";
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
    resetUserInfoScope() {
      this.storeUserInfowithScope = {} as userInfowithScopeResult;
    },
    getUserInfoScope(payload: string) {
      authApi
        .getMyInfoswithScope(payload)
        .then((res) => {
          console.log(res);
          this.storeUserInfowithScope = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setContractTake() {
      paymentApi
        .putContractTake(this.storeordNm)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setContractTakeover() {
      paymentApi
        .putContractTakeover(this.storeordNm)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setstorepage(page: number) {
      this.storepage = page;
    },
    // 거래내역을 가져오기 위한 데이터 설정
    setContractordNmAndPostIdx(postIdx: number, ordNm: string) {
      this.storepostIdx = postIdx;
      this.storeordNm = ordNm;
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
      var result = false;
      await paymentApi
        .withdrawMileage(amt)
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
    getContractPostDetail() {
      var payload = new contractInfo.contractPostDetailBody(
        this.storepostIdx,
        this.storeordNm
      );

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
