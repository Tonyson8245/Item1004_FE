import { defineStore } from "pinia";
import dummy_serverSimilar from "../../../assets/dummy/home/filter/serverSimilar";
import * as homeApi from "@/api/home-service/index";
import type { GameDto } from "@/domain/home/gameDto";
import type { GameServerDto } from "@/domain/home/gameServerDto";

export const useCommonStore = defineStore("commonStore", {
  state: () => ({
    //사용하는 변수
    //더비 파일
    storeGameSimilar: {} as GameDto[],
    storeServerSimilar: {} as GameServerDto[],

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

    storeGameKeywordIdx: 0,
    storeServerKeywordIdx: 0,

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
    setstoreGameKeyword(keyword: string, idx: number) {
      this.storeGameKeyword = keyword;
      this.storeGameKeywordIdx = idx;
    },
    setstoreServerKeyword(keyword: string) {
      this.storeServerKeyword = keyword;
    },

    //입력된 게임 검색값으로 리스트를 가져오는 함수
    setstoreTempGameKeyword(keyword: string) {
      this.storeTempGameKeyword = keyword;
      this.storeShowGameSimilar = true;
      //값이 있을때만 실행

      if (keyword != null && keyword != "") {
        homeApi
          .getGameName(keyword)
          .then((res) => {
            this.storeGameSimilar = res as GameDto[];
          })
          .catch((err) => {
            if (err.code == `"extinct_result"`) {
              //오류시 내용 초기화 조건에 맞는 값이 없는 경우
              this.resetstoreGameSmilar();
            } else this.resetstoreGameSmilar();
          });
      }
      // 값이 없을 떄는 실행하지 않음
      else {
        this.storeShowGameSimilar = true;
        this.resetstoreGameSmilar();
      }
    },
    //입력된 서버 검색값으로 리스트를 가져오는 함수
    setstoreTempServerKeyword(keyword: string) {
      this.storeTempServerKeyword = keyword;
      console.log(keyword);

      if (keyword != null && keyword != "") {
        homeApi
          .getServerName(this.storeGameKeywordIdx, keyword)
          .then((res) => {
            console.log(res);

            this.storeServerSimilar = res as GameServerDto[];
          })
          .catch((err) => {
            console.log(err);

            if (err.code == `"extinct_result"`) {
              //오류시 내용 초기화 조건에 맞는 값이 없는 경우
              this.resetstoreServerSmilar();
            } else this.resetstoreServerSmilar();
          });
      }
      // 값이 없을 떄는 실행하지 않음
      else {
        this.storeShowServerSimilar = true;
        this.resetstoreServerSmilar();
      }
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
      this.storeGameSimilar = {} as GameDto[];
      this.storeServerSimilar = {} as GameServerDto[];

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

    resetstoreGameSmilar() {
      this.storeGameSimilar = {} as GameDto[];
    },
    resetstoreServerSmilar() {
      this.storeServerSimilar = {} as GameDto[];
    },

    refreshSearchGameServer() {
      this.resetstoreGameSmilar();
      this.resetstoreServerSmilar();
      this.storeTempGameKeyword = "";
      this.storeTempServerKeyword = "";
      this.storeGameKeywordIdx = 0;
      this.storeServerKeyword = "";
      this.storeGameKeyword = "";
    },
  },
});
