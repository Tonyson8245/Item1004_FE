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

    //기존 필터 값
    storeTempCategory: [false, false, false, false],
    storeTempGameKeyword: "",
    storeTempServerKeyword: "",

    //게임 및 서버 설정
    filterStoreGameKeyword: "",
    filterStoreServerKeyword: "",

    filterStoreGameKeywordIdx: 0,
    filterStoreServerKeywordIdx: 0,
  }),

  getters: {
    //서버로 부터 가져오는 로직 나중에 axios 붙힐때 연동할 생각할 것
    getCategorys: (state) => {
      var result = "";
      if (state.storeCategoryCharacter) result += "character,";
      if (state.storeCategoryGamemoney) result += "gameMoney,";
      if (state.storeCategoryItem) result += "item,";
      if (state.storeCategoryEtc) result += "etc,";
      result = result.slice(0, -1);

      return result;
    },
    //서버로 부터 가져오는 로직 나중에 axios 붙힐때 연동할 생각할 것
    //게임 서버 뱃지
    storeGameServerBadge: (state) => {
      var gameName = state.filterStoreGameKeyword;
      var serverName = state.filterStoreServerKeyword;
      if (gameName != "" && serverName != "")
        return gameName + "-" + serverName;
      else if (gameName != "") return gameName + "-전체서버";
      else return "";
    },
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
        case "gameMoney":
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
      this.filterStoreGameKeyword = "";
      this.filterStoreServerKeyword = "";

      this.filterStoreGameKeywordIdx = 0;
      this.filterStoreServerKeywordIdx = 0;
    },
    // 기존 필터 저장해두는 곳
    setstoreTempfilter() {
      this.storeTempCategory = [
        this.storeCategoryGamemoney,
        this.storeCategoryItem,
        this.storeCategoryCharacter,
        this.storeCategoryEtc,
      ];

      this.storeTempGameKeyword = this.filterStoreGameKeyword;
      this.storeTempServerKeyword = this.filterStoreServerKeyword;
    },
    //취소할경우 기존 필터를 다시 넣음
    cancelstoreFilter() {
      this.storeCategoryGamemoney = this.storeTempCategory[0];
      this.storeCategoryItem = this.storeTempCategory[1];
      this.storeCategoryCharacter = this.storeTempCategory[2];
      this.storeCategoryEtc = this.storeTempCategory[3];
    },

    refreshSearchGameServer() {
      this.filterStoreGameKeywordIdx = 0;
      this.filterStoreServerKeyword = "";
      this.filterStoreServerKeywordIdx = 0;
      this.filterStoreGameKeyword = "";
    },

    //
    setstoreGameServerFilter(
      game: string,
      server: string,
      gameIdx: number,
      serverIdx: number
    ) {
      this.filterStoreGameKeyword = game;
      this.filterStoreServerKeyword = server;
      this.filterStoreGameKeywordIdx = gameIdx;
      this.filterStoreServerKeywordIdx = serverIdx;
    },
  },
});
