import { defineStore } from "pinia";
import * as paymentApi from "@/api/payment-service/index";
import type mileageOveriewResponseDto from "@/domain/payment/mileageOverviewReponseDTO.interface";
export const usemypageStore = defineStore("mypageStore", {
  state: () => ({
    // storeloginshowModal: false,
    storemileageOverview: null as mileageOveriewResponseDto | null,
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
  },
});
