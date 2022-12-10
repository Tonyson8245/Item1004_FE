import { defineStore } from "pinia";
import dummy_searchRecent from "../../../dummy/home/search/keywordRecent";
import dummy_keywordSimilar from "../../../dummy/home/search/keywordSmilar";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    storeKeyword: "",
    storeSellBuy: "sell",
    storeShowSearchModal_mobile: false,
    storeRecentKeywords: dummy_searchRecent,
    storeShowSearch_web: false,
    storeSimilarKeywords: dummy_keywordSimilar,
  }),

  getters: {
    //서버로 부터 가져오는 로직 나중에 axios 붙힐때 연동할 생각할 것
  },
  actions: {
    setstoreShowSearch_web(status: boolean) {
      this.storeShowSearch_web = status;
    },
    setstoreKeyword(keyword: string) {
      this.storeKeyword = keyword;
    },
    setstoreSellBuy(type: string) {
      this.storeSellBuy = type;
    },
    setstoreShowSearchModal_mobile(status: boolean) {
      this.storeShowSearchModal_mobile = status;
    },
  },
});
