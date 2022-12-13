import { defineStore } from "pinia";

export const usePostStore = defineStore("postStore", {
  state: () => ({
    storeShowBuy: false,
    storeShowManagePost: false,
  }),

  getters: {},
  actions: {
    setstoreShowBuy(status: boolean) {
      this.storeShowBuy = status;
    },
    setstoreShowManagePost(status: boolean) {
      this.storeShowManagePost = status;
    },
  },
});
