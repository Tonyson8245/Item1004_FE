import { defineStore } from "pinia";
import * as paymentApi from "@/api/payment-service/index";
import * as authApi from "@/api/auth-service/index";
import type mileageOveriewResponseDto from "@/domain/payment/mileageOverviewReponseDTO.interface";
import { putBankAccountBody } from "@/domain/auth";
export const usemypageStore = defineStore("mypageStore", {
  state: () => ({
    // storeloginshowModal: false,
    storemileageOverview: null as mileageOveriewResponseDto | null,
    storePutBankAccountStatus: "",
  }),

  getters: {},
  actions: {
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
  },
});
