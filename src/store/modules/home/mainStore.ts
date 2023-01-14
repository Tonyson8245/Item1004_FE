import { defineStore } from "pinia";
import dummyCard from "@/assets/dummy/home/card/dummycard";
import * as homeApi from "@/api/home-service/index";
import type { getProductCardBodyDto } from "@/domain/home/getProductCardDto";
import type { GamePostSummaryDto } from "@/domain/home/posts/GamePostSummaryDto";
import type { LoadAction } from "@ts-pro/vue-eternal-loading";
import { getProductCard } from "@/api/home-service/index";

export const useMainStore = defineStore("mainStore", {
  state: () => ({
    storeProductCard: [] as GamePostSummaryDto[],
    storeinfiniteStatus: false,

    //pagination
    storeNextPage: 1,
    storehasnextPage: true,

    //load 시키는 트리거
    storeLoad: false,
  }),

  getters: {},
  actions: {
    setstoreLoad(state: boolean) {
      this.storeLoad = state;
    },
    async setstoreProductCard(payload: getProductCardBodyDto) {
      // this.storeProductCard.push.apply(this.storeProductCard, dummyCard);
      var result;
      await homeApi
        .getProductCard(payload)
        .then((res) => {
          console.log(res);
          //성공하면 페이지를 올린다.

          if (res.pagination.hasNextPage != null) {
            this.storehasnextPage = res.pagination.hasNextPage;
          }
          if (res.pagination.hasResult && res.posts != null) {
            this.storeNextPage += 1;
            var list = res.posts as GamePostSummaryDto[];
            this.storeProductCard = [...this.storeProductCard, ...list];
            result = true;
          }
        })
        .catch((err) => {
          console.log(err);
          result = false;
        });
      return result;
    },
    resetsetstoreProductCard() {
      this.storeProductCard = [] as GamePostSummaryDto[];
      this.storeNextPage = 1;
      this.storehasnextPage = true;
    },
    setstoreinfiniteStatus(status: boolean) {
      this.storeinfiniteStatus = status;
    },
  },
});
