import { defineStore } from "pinia";
import dummy_gameSimilar from "../../../dummy/home/filter/gameSimilar";
import dummy_serverSimilar from "../../../dummy/home/filter/serverSimilar";

export const useWriteStore = defineStore("writeStore", {
  state: () => ({
    storeSellBuy: `sell`,
    storeCategory: ``,
    storeGameName: ``,
    storeServerName: ``,
    //더비 파일
    storeGameSimilar: dummy_gameSimilar,
    storeServerSimilar: dummy_serverSimilar,
    //게임, 게임 서버 검색할 때, 유사리스트 상태값
    storeShowServerSimilar: false,
    storeShowGameSimilar: false,

    //게임 서버 검색 상태값
    storeShowServerFilter: false,
  }),

  getters: {},
  actions: {
    setstoreSellBuy(status: string) {
      this.storeSellBuy = status;
    },
    setstoreCategory(Category: string) {
      this.storeCategory = Category;
    },
    setstoreGameName(Game: string) {
      this.storeGameName = Game;
    },
    setstoreServerName(Server: string) {
      this.storeServerName = Server;
    },
  },
});
