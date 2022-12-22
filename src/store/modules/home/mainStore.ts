import { defineStore } from "pinia";
import dummyCard from "@/assets/dummy/home/card/dummycard";

export const useMainStore = defineStore("mainStore", {
  state: () => ({
    storeProductCard: [...dummyCard],
    storeinfiniteStatus: false,
  }),

  getters: {},
  actions: {
    setstoreProductCard() {
      this.storeProductCard.push.apply(this.storeProductCard, dummyCard);
    },
    resetsetstoreProductCard() {
      this.storeProductCard = [...dummyCard];
    },
    setstoreinfiniteStatus(status: boolean) {
      this.storeinfiniteStatus = status;
    },
  },
});
