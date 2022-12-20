import { defineStore } from "pinia";
import dummy_gameSimilar from "../../../assets/dummy/home/filter/gameSimilar";
import dummy_serverSimilar from "../../../assets/dummy/home/filter/serverSimilar";
import homeApi from "@/api/home-service/index";

export const useCommonStore = defineStore("commonStore", {
  state: () => ({
    //사용하는 변수
    //더비 파일
    storeGameSimilar: dummy_gameSimilar,
    storeServerSimilar: dummy_serverSimilar,

    //게임, 게임 서버 검색할 때, 유사리스트 상태값
    storeShowServerSimilar: false,
    storeShowGameSimilar: false,

    //게임 서버 검색 상태값
    storeShowServerFilter: false,

    //기존 필터 값
    storeTempKeyword: "",

    storeCategory: ``,
    //게임,게임서버 설정
    storeGameKeyword: "",
    storeServerKeyword: "",

    storeTempGameKeyword: "",
    storeTempServerKeyword: "",
  }),

  getters: {
    //서버로 부터 가져오는 로직 나중에 axios 붙힐때 연동할 생각할 것
  },
  actions: {
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
    setstoreTempGameKeyword(keyword: string) {
      this.storeTempGameKeyword = keyword;
      homeApi
        .getGameName(keyword)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setstoreTempServerKeyword(keyword: string) {
      this.storeTempServerKeyword = keyword;
    },
    setstoreShowServerFilter(status: boolean) {
      this.storeShowServerFilter = status;
    },
    // 기존 필터 저장해두는 곳
    setstoreTempfilter() {
      console.log("저장");
      this.storeTempKeyword =
        this.storeGameKeyword + "-" + this.storeServerKeyword;
    },

    setstoreCategory(Category: string) {
      this.storeCategory = Category;
    },

    reset() {
      this.storeGameSimilar = dummy_gameSimilar;
      this.storeServerSimilar = dummy_serverSimilar;

      //게임; 게임 서버 검색할 때, 유사리스트 상태값
      this.storeShowServerSimilar = false;
      this.storeShowGameSimilar = false;

      //게임 서버 검색 상태값
      this.storeShowServerFilter = false;

      //기존 필터 값
      this.storeTempKeyword = "";

      this.storeCategory = ``;
      //게임,게임서버 설정
      this.storeGameKeyword = "";
      this.storeServerKeyword = "";

      this.storeTempGameKeyword = "";
      this.storeTempServerKeyword = "";
    },
  },
});
