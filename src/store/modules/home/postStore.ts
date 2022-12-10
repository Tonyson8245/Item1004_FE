import { defineStore } from "pinia";

export const usePostStore = defineStore("postStore", {
  state: () => ({
    storeShowBuy: false,
  }),

  getters: {},
  actions: {
    setstoreShowBuy(status: boolean) {
      this.storeShowBuy = status;
    },
  },
});
