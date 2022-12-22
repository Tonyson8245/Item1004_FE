import { defineStore, storeToRefs } from "pinia";
import dummy_gameSimilar from "../../../assets/dummy/home/filter/gameSimilar";
import dummy_serverSimilar from "../../../assets/dummy/home/filter/serverSimilar";
import { useCommonStore } from "@/store/modules/common/commonStore";

export const useWriteStore = defineStore("writeStore", {
  state: () => ({
    storeSellBuy: `sell`,
  }),

  getters: {},
  actions: {
    setstoreSellBuy(status: string) {
      this.storeSellBuy = status;
    },
    test() {
      const user = useCommonStore();
      console.log(user.storeCategory);
    },
  },
});
