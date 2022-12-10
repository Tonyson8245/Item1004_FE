import { defineStore } from "pinia";
export const useFilterStore = defineStore("filterStore", {
  state: () => ({
    //웹,모바일 상태에서 필터창 켜졌는지 여부
    storeShowFilter_mobile: false,
    storeShowFilter_web: false,

    //카테고리 설정
    storeCategoryGamemoney: false,
    storeCategoryItem: false,
    storeCategoryCharacter: false,
    storeCategoryEtc: false,

    //기존 필터 값ㅅ
    storeTempCategory: [false, false, false, false],
    storeTempKeyword: "",
  }),

  getters: {
    //서버로 부터 가져오는 로직 나중에 axios 붙힐때 연동할 생각할 것
  },
  actions: {
    setstoreShowFilter_mobile(status: boolean) {
      //debounce는 0.6초 뒤에 값 적용되게 해주는 함수
      this.storeShowFilter_mobile = status;
    },
    setstoreShowFilter_web(status: boolean) {
      this.storeShowFilter_web = status;
    },

    setCategory(category: boolean[]) {
      this.storeCategoryGamemoney = category[0];
      this.storeCategoryItem = category[1];
      this.storeCategoryCharacter = category[2];
      this.storeCategoryEtc = category[3];
    },
    changeCategory(type: string) {
      switch (type) {
        case "gamemoney":
          this.storeCategoryGamemoney = !this.storeCategoryGamemoney;
          break;

        case "item":
          this.storeCategoryItem = !this.storeCategoryItem;
          break;

        case "character":
          this.storeCategoryCharacter = !this.storeCategoryCharacter;
          break;

        case "etc":
          this.storeCategoryEtc = !this.storeCategoryEtc;
          break;
      }
    },
    refresh() {
      this.setCategory([false, false, false, false]);
    },
    // 기존 필터 저장해두는 곳
    setstoreTempfilter() {
      console.log("저장");
      this.storeTempCategory = [
        this.storeCategoryGamemoney,
        this.storeCategoryItem,
        this.storeCategoryCharacter,
        this.storeCategoryEtc,
      ];
    },
    //취소할경우 기존 필터를 다시 넣음
    cancelstoreFilter() {
      this.storeCategoryGamemoney = this.storeTempCategory[0];
      this.storeCategoryItem = this.storeTempCategory[1];
      this.storeCategoryCharacter = this.storeTempCategory[2];
      this.storeCategoryEtc = this.storeTempCategory[3];
    },
  },
});
