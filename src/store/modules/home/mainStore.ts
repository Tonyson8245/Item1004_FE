import { defineStore } from "pinia";
import dummyCard from "@/dummy/home/card/dummycard";

export const useMainStore = defineStore("mainStore", {
  state: () => ({
    storeProductCard: dummyCard,
  }),

  getters: {
    //서버로 부터 가져오는 로직 나중에 axios 붙힐때 연동할 생각할 것
  },
  actions: {},
});
