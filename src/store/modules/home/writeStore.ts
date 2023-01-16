import { defineStore } from "pinia";
import { useCommonStore } from "@/store/modules/common/commonStore";
import * as homeApi from "@/api/home-service/index";
import { CreatePostDtoBody } from "@/domain/home/writePost/CreatePostDto";
import { storeToRefs } from "pinia";

export const useWriteStore = defineStore("writeStore", {
  state: () => ({
    storepostType: `sell`,
    storetitle: "",
    storecontent: "",
    storeproductType: "",
    storesaleUnit: "",
    storepricePerUnit: "",
    storemaxAmount: "",
    storeminAmount: "",
    storecharacterName: "",
    storeregistration: "",
    storeroleIdx: 0,
    storelevel: 0,
    storehasPaymentHistory: false,
    storeisDuplicatedSync: false,
  }),

  getters: {},
  actions: {
    setstorepostType(postType: string) {
      this.storepostType = postType;
    },
    setstoreCategory(productType: string) {
      this.storeproductType = productType;
    },
    createPost(productType: string) {
      var commonStore = useCommonStore();
      var { commonStoreGameKeywordIdx, commonStoreServerKeywordIdx } =
        storeToRefs(commonStore);
      var post = new CreatePostDtoBody(
        this.storetitle,
        this.storecontent,
        commonStoreGameKeywordIdx.value,
        commonStoreServerKeywordIdx.value,
        productType,
        this.storepostType,
        parseInt(this.storesaleUnit),
        parseInt(this.storepricePerUnit),
        parseInt(this.storemaxAmount),
        parseInt(this.storeminAmount),
        this.storecharacterName,
        this.storeregistration,
        this.storeroleIdx,
        this.storelevel,
        this.storehasPaymentHistory,
        this.storeisDuplicatedSync
      );
      homeApi
        .createPost(post)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
