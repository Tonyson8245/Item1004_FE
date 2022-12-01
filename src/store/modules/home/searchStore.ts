import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    storeKeyword: "",
    storeSellBuy: "sell",
    storeSearchShowMobile: false,
  }),

  getters: {
    //서버로 부터 가져오는 로직 나중에 axios 붙힐때 연동할 생각할 것
  },
  actions: {
    setstoreKeyword(keyword: string) {
      this.storeKeyword = keyword;
    },
    setstoreSellBuy(type: string) {
      this.storeSellBuy = type;
    },
    setstoreSearchShowMobile(status: boolean) {
      this.storeSearchShowMobile = status;
    },
  },
});
