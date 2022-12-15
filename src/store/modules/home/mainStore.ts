import { defineStore } from "pinia";
import dummyCard from "@/assets/dummy/home/card/dummycard";
import type productCard from "@/domain/home/productCard.interface";

export const useMainStore = defineStore("mainStore", {
  state: () => ({
    storeProductCard: [...dummyCard],
    storeinfiniteStatus: false,
    // storeNewProductCard: [] as productCard[],
  }),

  getters: {
    //서버로 부터 가져오는 로직 나중에 axios 붙힐때 연동할 생각할 것
    // getstoreProductCard() {
    //   this.storeProductCard.push(dummyCard);
    // },
  },
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
