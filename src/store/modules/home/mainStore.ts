import { defineStore } from "pinia";
import dummyCard from "@/assets/dummy/home/card/dummycard";
import * as homeApi from "@/api/home-service/index";
import type { getProductCardBodyDto } from "@/domain/home/getProductCardDto";

export const useMainStore = defineStore("mainStore", {
  state: () => ({
    storeProductCard: [...dummyCard],
    storeinfiniteStatus: false,

    //pagination
    storeNextPage: 1,
    storehasnextPage: true,
  }),

  getters: {},
  actions: {
    setstoreProductCard(payload: getProductCardBodyDto) {
      // this.storeProductCard.push.apply(this.storeProductCard, dummyCard);
      homeApi
        .getProductCard(payload)
        .then((res) => {
          console.log(res);
          //성공하면 페이지를 올린다.
          this.storeNextPage += 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetsetstoreProductCard() {
      this.storeProductCard = [...dummyCard];
    },
    setstoreinfiniteStatus(status: boolean) {
      this.storeinfiniteStatus = status;
    },
  },
});
