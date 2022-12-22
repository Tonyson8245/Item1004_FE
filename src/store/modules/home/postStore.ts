import { defineStore } from "pinia";
import dummyPost from "@/assets/dummy/home/post/dummypost";

export const usePostStore = defineStore("postStore", {
  state: () => ({
    storeShowBuy: false,
    storeShowManagePost: false,

    storePostTitle: "",
    storeUnitValue: 0, // 물품 단위
    storeMinValue: 0, // 물품 단위
    storeMaxValue: 0, // 물품 단위
    storeUnitName: "", // 물품 단위
    storePricePerUnit: 0, // 물품 단위당 가격

    storeGameName: "",
    storeServerName: "",
    storeCategory: "",

    storeUserCode: "",
    storeUserNickname: "",
    storeUserIdx: 0,
  }),

  getters: {},
  actions: {
    setStorePostData(idx: string) {
      var idxInt = parseInt(idx);
      var data = dummyPost[idxInt - 1];

      this.storeShowBuy = data.ShowBuy;
      this.storeShowManagePost = data.ShowManagePost;

      this.storePostTitle = data.PostTitle;
      this.storeUnitValue = data.UnitValue;
      this.storeMinValue = data.MinValue;
      this.storeMaxValue = data.MaxValue;
      this.storeUnitName = data.UnitName;
      this.storePricePerUnit = data.PricePerUnit;
      this.storeGameName = data.GameName;
      this.storeServerName = data.ServerName;
      this.storeCategory = data.Category;

      this.storeUserCode = data.userinfo.code;
      this.storeUserNickname = data.userinfo.nickname;
      this.storeUserIdx = data.userinfo.userIdx;
    },
    setstoreShowBuy(status: boolean) {
      this.storeShowBuy = status;
    },
    setstoreShowManagePost(status: boolean) {
      this.storeShowManagePost = status;
    },
    setPayment(title: string) {
      this.storePostTitle = title;
    },
  },
});
