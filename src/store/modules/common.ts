import { defineStore } from "pinia";

export const useCommon = defineStore("common", {
  state: () => ({
    headerTitle: "",
  }),

  getters: {
    //서버로 부터 가져오는 로직 나중에 axios 붙힐때 연동할 생각할 것
  },
  actions: {
    // 액션 동작 예시
    setheaderTitle(title: string) {
      this.headerTitle = title;
    },
    resetheaderTitle() {
      this.headerTitle = "";
    },
  },
});
