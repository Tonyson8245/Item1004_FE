import { defineStore } from "pinia";

export const usePostStore = defineStore("postStore", {
  state: () => ({
    storeShowBuy: false,
    storeShowManagePost: false,

    storePostTitle: "8억~580억 메이플 메소 판매합니다",
    storeUnitValue: 800000000, // 물품 단위
    storeMinValue: 800000000, // 물품 단위
    storeMaxValue: 58000000000, // 물품 단위
    storeUnitName: "게임머니당", // 물품 단위
    storePricePerUnit: 500, // 물품 단위당 가격

    storeGameName: "메이플스토리",
    storeServerName: "엘리니아",
    storeCategory: "gamemoney",
  }),

  getters: {},
  actions: {
    setstoreShowBuy(status: boolean) {
      this.storeShowBuy = status;
    },
    setstoreShowManagePost(status: boolean) {
      this.storeShowManagePost = status;
    },
    setPayment(title: string) {
      this.storePostTitle = title;
    },
  },
});
