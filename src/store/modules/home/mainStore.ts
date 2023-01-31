import { defineStore } from "pinia";
import * as homeApi from "@/api/home-service/index";
import * as userApi from "@/api/user-service/index";
import type { getProductCardBodyDto } from "@/domain/home/getProductCardDto";
import type { GamePostSummaryDto } from "@/domain/home/posts/GamePostSummaryDto";

export const useMainStore = defineStore("mainStore", {
  state: () => ({
    storeProductCard: [] as GamePostSummaryDto[],
    storeinfiniteStatus: false,

    //pagination
    storeNextPage: 1,
    storehasnextPage: true,

    //load 시키는 트리거
    storeLoad: false,
    //서버로부터 페이지를 가져왔는지 확인
    storeGetdone: true,

    //공지사항 모달
    storeshowNotify: false,
  }),

  getters: {},
  actions: {
    setstoreshowNotify(status: boolean) {
      this.storeshowNotify = status;
    },
    setstoreLoad(state: boolean) {
      this.storeLoad = state;
    },
    async setstoreProductCard(payload: getProductCardBodyDto) {
      // this.storeProductCard.push.apply(this.storeProductCard, dummyCard);
      var result;

      //둘이 페이지가 같다면 아직 로딩이 되지 않은 것이다.
      if (this.storeGetdone) {
        this.storeGetdone = false;
        await homeApi
          .getProductCard(payload)
          .then((res) => {
            //성공하면 페이지를 올린다.

            if (res.pagination.hasNextPage != null) {
              this.storehasnextPage = res.pagination.hasNextPage;
            }
            if (res.pagination.hasResult && res.posts != null) {
              this.storeNextPage += 1;

              var list = res.posts as GamePostSummaryDto[];
              this.storeProductCard = [...this.storeProductCard, ...list];
              //결과를 뷰단으로 보냄
              result = true;
            }
            //서버 가져오기 완료
            this.storeGetdone = true;
          })
          .catch((err) => {
            //서버 가져오기 완료
            this.storeGetdone = true;
            result = false;
          });
      } else result = false;
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
