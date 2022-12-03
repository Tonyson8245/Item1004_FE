import { defineStore } from "pinia";
import dummy_gameSimilar from "../../../dummy/home/filter/gameSimilar";
import dummy_serverSimilar from "../../../dummy/home/filter/serverSimilar";

export const useFilterStore = defineStore("filterStore", {
  state: () => ({
    //웹,모바일 상태에서 필터창 켜졌는지 여부
    storeShowFilter_mobile: false,
    storeShowFilter_web: true,

    //게임, 게임 서버 검색할 때, 유사리스트 상태값
    storeShowServerSimilar: false,
    storeShowGameSimilar: false,

    //게임 서버 검색 상태값
    storeShowServerFilter: false,

    //더비 파일
    storeGameSimilar: dummy_gameSimilar,
    storeServerSimilar: dummy_serverSimilar,

    //카테고리 설정
    storeCategoryGamemoney: true,
    storeCategoryItem: true,
    storeCategoryCharacter: true,
    storeCategoryEtc: true,

    //게임,게임서버 설정
    storeGameKeyword: "메이플스토리",
    storeServerKeyword: "크로아",

    //기존 필터 값ㅅ
    storeTempCategory: [false, false, false, false],
    storeTempKeyword: "",
  }),

  getters: {
    //서버로 부터 가져오는 로직 나중에 axios 붙힐때 연동할 생각할 것
  },
  actions: {
    setstoreShowFilter_mobile(status: boolean) {
      this.storeShowFilter_mobile = status;
    },
    setstoreShowFilter_web(status: boolean) {
      this.storeShowFilter_web = status;
    },
    setstoreShowGameSimilar(status: boolean) {
      this.storeShowGameSimilar = status;
    },
    setstoreShowServerSimilar(status: boolean) {
      this.storeShowServerSimilar = status;
    },

    setstoreGameKeyword(keyword: string) {
      this.storeGameKeyword = keyword;
    },
    setstoreServerKeyword(keyword: string) {
      this.storeServerKeyword = keyword;
    },
    setstoreShowServerFilter(status: boolean) {
      this.storeShowServerFilter = status;
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
      this.setstoreGameKeyword("");
      this.setstoreServerKeyword("");
      this.setCategory([false, false, false, false]);
      this.setstoreShowServerFilter(false);
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
      this.storeTempKeyword =
        this.storeGameKeyword + "-" + this.storeServerKeyword;
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
