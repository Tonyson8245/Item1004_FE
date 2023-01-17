import { defineStore } from "pinia";
import { useCommonStore } from "@/store/modules/common/commonStore";
import * as homeApi from "@/api/home-service/index";
import { CreatePostDtoBody } from "@/domain/home/writePost/CreatePostDto";
import { storeToRefs } from "pinia";
import type { GameRoleDto } from "@/domain/home/gameRoleDto";

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
    storehasPaymentHistory: null as boolean | null,
    storeisDuplicatedSync: null as boolean | null,

    // 직업리스트
    storeRoleList: {} as GameRoleDto[],
  }),

  getters: {},
  actions: {
    setstorepostType(postType: string) {
      this.storepostType = postType;
    },
    setstoreCategory(productType: string) {
      this.storeproductType = productType;
    },
    async createPost(productType: string) {
      var result = "";
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
        this.storehasPaymentHistory != null
          ? this.storehasPaymentHistory
          : false,
        this.storeisDuplicatedSync != null ? this.storeisDuplicatedSync : false
      );
      await homeApi
        .createPost(post)
        .then((res) => {
          console.log(res);
          result = res as string;
        })
        .catch((err) => {
          console.log(err);
          result = "";
        });
      return result;
    },
    getGameRole() {
      const commonStore = useCommonStore();
      const { commonStoreGameKeywordIdx } = storeToRefs(commonStore);
      homeApi
        .getGameRole(commonStoreGameKeywordIdx.value.toString())
        .then((res) => {
          this.storeRoleList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
