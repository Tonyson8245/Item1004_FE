import { defineStore, storeToRefs } from "pinia";
import dummy_gameSimilar from "../../../assets/dummy/home/filter/gameSimilar";
import dummy_serverSimilar from "../../../assets/dummy/home/filter/serverSimilar";
import { useCommonStore } from "@/store/modules/common/commonStore";

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
    test() {
      const user = useCommonStore();
      console.log(user.storeCategory);
    },
  },
});
