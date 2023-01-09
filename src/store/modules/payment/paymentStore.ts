import { defineStore } from "pinia";
import { paymentApi } from "@/api/payment-service/index";
import type * as contractcheckDto from "@/domain/payment/contractCheckDto.interface";
export const usepaymentStore = defineStore("usepaymentStore", {
  state: () => ({}),

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
  },
});
