import { defineStore } from "pinia";
import * as paymentApi from "@/api/payment-service";
import type * as contractcheckDto from "@/domain/payment/contractCheckDto.interface";
export const usepaymentStore = defineStore("usepaymentStore", {
  state: () => ({
    storepaymethod: "",
    storegoodsNm: "",
    storegoodsAmt: "",
    storeordNm: "",
    storeordTel: "",
    storeordEmail: "",
  }),

  getters: {},
  actions: {
    async getContractCheck<T>(
      payload: contractcheckDto.contractCheckBodyDto
    ): Promise<contractcheckDto.contractCheckResultDto | undefined> {
      var result;
      await paymentApi
        .getContractCheck(payload)
        .then((res) => {
          result = res;
        })
        .catch((err) => {
          result = err;
        });
      return result;
    },

    setPaymentInfo(payMethod: string, GoodsNm: string, GoodsAmt: string) {},
  },
});
