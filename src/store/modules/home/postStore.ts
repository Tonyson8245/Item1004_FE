import { defineStore } from "pinia";
import dummyPost from "@/assets/dummy/home/post/dummypost";
import * as homeApi from "@/api/home-service/index";
import type { PropType } from "vue";
import { useCommonStore } from "../common/commonStore";

export const usePostStore = defineStore("postStore", {
  state: () => ({
    storeShowBuy: false,
    storeShowManagePost: false,

    //거래글
    storecreatAt: "",
    storePostTitle: "",
    storePostIdx: 0,
    storeSaleUnit: 1, // 물품 단위
    storeMinValue: 0, // 최소 갯수
    storeMaxValue: 0, // 최대 갯수
    storeUnitName: "개", // 물품 단위
    storePricePerUnit: 0, // 물품 단위당 가격

    storeGameName: "",
    storeServerName: "",
    storeCategory: "",

    storeSellBuy: "",
    storeWishCount: 0,
    storeChatCount: 0,
    storeCharacterlevel: 0,
    storeCharacterRoleName: "",
    storeContent: "",

    storecharacterName: "",
    storeregistration: "",
    storehasInGamePaymentHistory: false,
    storeisDuplicatedSync: false,

    //유저
    storeUserCode: "",
    storeUserNickname: "",
    storeUserIdx: 0,

    storeemailVerify: false,
    storephoneVerify: false,
    storebankAccountVerify: false,

    storeUserImg: "",
    storeUserIsVerfied: false,
    storeUsercontractLevelName: "",
    storeUsersellPostCount: 0,
    storeUserbuyPostCount: 0,
    storeUserreviewCount: 0,

    storeqty: 1,
  }),

  getters: {
    getterregistration: (state) => {
      if (state.storeregistration != undefined) {
        var res = state.storeregistration;
        switch (res) {
          case "google":
            return "구글";
          case "local":
            return "게임사";
          case "facebook":
            return "페이스북";
          case "kakao":
            return "카카오";
          case "naver":
            return "네이버";
          case "phone":
            return "전화번호";
          case "etc":
            return "기타";
        }
      }
    },
    storeemailVerifyClass: (state) => {
      if (state.storeemailVerify) return "border-everly-main text-everly-main";
      else return "border-everly-dark-grey text-everly-dark_grey";
    },
    storephoneVerifyClass: (state) => {
      if (state.storephoneVerify) return "border-everly-main text-everly-main";
      else return "border-everly-dark-grey text-everly-dark_grey";
    },
    storebankaccountlVerifyClass: (state) => {
      if (state.storebankAccountVerify)
        return "border-everly-main text-everly-main";
      else return "border-everly-dark-grey text-everly-dark_grey";
    },
    storelevelBadge: (state) => {
      var level = state.storeUsercontractLevelName;
      switch (level) {
        case "rookie":
          return "level_rookie";
        case "bronze":
          return "level_bronze";
        case "silver":
          return "level_silver";
        case "gold":
          return "level_gold";
        case "platinum":
          return "level_platinum";
        case "diamond":
          return "level_diamond";
        default:
          return "";
      }
    },
    storeCategoryName: (state) => {
      switch (state.storeCategory) {
        case "gameMoney":
          return "게임머니";
        case "character":
          return "캐릭터";
        case "item":
          return "아이템";
        case "etc":
          return "기타";
      }
    },
    storehasInGamePaymentHistoryOX: (state) => {
      if (state.storehasInGamePaymentHistory) return "O";
      else return "X";
    },
    storeisDuplicatedSyncOX: (state) => {
      if (state.storeisDuplicatedSync) return "O";
      else return "X";
    },
    storeProductunit: (state) => {
      if (state.storeCategory == "gameMoney") return "게임머니";
      else return "개";
    },
  },
  actions: {
    setstoreQty(qty: number) {
      this.storeqty = qty;
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
    setStorePostData(idx: string) {
      homeApi
        .getProduct(idx)
        .then((res) => {
          // console.log(res);
          var idxInt = parseInt(idx);
          //본인 꺼면 이거 켜야됨
          // this.storeShowManagePost = data.ShowManagePost;

          //모바일 꺼
          //this.storeShowBuy = data.ShowBuy;

          //거래글
          res.post.idx != null ? (this.storePostIdx = res.post.idx) : {};

          this.storePostTitle = res.post.title;
          res.post.saleUnit != null
            ? (this.storeSaleUnit = res.post.saleUnit)
            : {};
          res.post.minAmount != null
            ? (this.storeMinValue = res.post.minAmount)
            : {};
          res.post.maxAmount != null
            ? (this.storeMaxValue = res.post.maxAmount)
            : {};
          this.storeUnitName = "개";
          this.storePricePerUnit = res.post.pricePerUnit;
          this.storeGameName = res.post.gameName;
          this.storeServerName = res.post.serverName;
          this.storeCategory = res.post.productType;
          this.storecreatAt = res.post.createAt.toString();

          this.storeSellBuy = res.post.type;
          this.storeWishCount = res.post.wishCount;
          this.storeChatCount = res.post.chatCount;
          res.post.content != null
            ? (this.storeContent = res.post.content)
            : {};

          res.post.level != null
            ? (this.storeCharacterlevel = res.post.level)
            : {};
          res.post.roleName != null
            ? (this.storeCharacterRoleName = res.post.roleName)
            : {};
          res.post.characterName != null
            ? (this.storecharacterName = res.post.characterName)
            : {};
          res.post.registration != null
            ? (this.storeregistration = res.post.registration)
            : {};
          res.post.hasInGamePaymentHistory != null
            ? (this.storehasInGamePaymentHistory =
                res.post.hasInGamePaymentHistory)
            : {};
          res.post.isDuplicatedSync != null
            ? (this.storeisDuplicatedSync = res.post.isDuplicatedSync)
            : {};

          //유저
          res.writer.code != null ? (this.storeUserCode = res.writer.code) : {};
          this.storeUserNickname = res.writer.nickname;
          this.storeUserIdx = res.writer.idx;

          this.storeUserImg = res.writer.image;
          this.storeUserIsVerfied = res.writer.isVerified;
          res.writer.contractLevelName != null
            ? (this.storeUsercontractLevelName = res.writer.contractLevelName)
            : {};
          res.writer.sellPostCount != null
            ? (this.storeUsersellPostCount = res.writer.sellPostCount)
            : {};
          res.writer.buyPostCount != null
            ? (this.storeUserbuyPostCount = res.writer.buyPostCount)
            : {};
          res.writer.reviewCount != null
            ? (this.storeUserreviewCount = res.writer.reviewCount)
            : {};

          //인증 관련
          res.writer.isEmailValid != null
            ? (this.storeemailVerify = res.writer.isEmailValid)
            : {};
          res.writer.isAccountValid != null
            ? (this.storebankAccountVerify = res.writer.isAccountValid)
            : {};
          res.writer.isPhoneValid != null
            ? (this.storephoneVerify = res.writer.isPhoneValid)
            : {};
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async deletePost() {
      var result = false;
      var postIdx = this.storePostIdx.toString();
      await homeApi
        .deletePost(postIdx)
        .then((res) => {
          result = true;
        })
        .catch((err) => {
          var message = "";

          // 예외처리
          switch (err.code) {
            case "contract_ongoing_post":
              message = "거래 진행 중인 게시글은 삭제가 불가합니다.";
              break;
            default:
              message = "올바르지 않은 요청입니다.";
              break;
          }
          alert(message);
          result = false;
        });
      return result;
    },
  },
});
