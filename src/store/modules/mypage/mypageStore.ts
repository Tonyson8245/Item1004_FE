import { defineStore } from "pinia";
import * as paymentApi from "@/api/payment-service/index";
import * as authApi from "@/api/auth-service/index";
import type mileageOveriewResponseDto from "@/domain/payment/mileageOverviewReponseDTO.interface";
import { putBankAccountBody } from "@/domain/auth";
import * as contractInfo from "@/domain/payment/contractPostDetailDto.interaface";
import { isNotEmptyObject, isObject } from "class-validator";
import { withdrawMileageResult } from "@/domain/payment/withdrawMileage.interface";

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

    storeContractListSellTabType: "인계필요",
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
      switch (state.storeContractDetail.other.contractLevelName) {
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
    setstoreContractListSellTabType(value: string) {
      this.storeContractListSellTabType = value;
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
