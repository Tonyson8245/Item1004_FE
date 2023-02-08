import { defineStore } from "pinia";
import { useCommonStore } from "@/store/modules/common/commonStore";
import * as homeApi from "@/api/home-service/index";
import { CreatePostDtoBody } from "@/domain/home/writePost/CreatePostDto";
import { storeToRefs } from "pinia";
import type { GameRoleDto } from "@/domain/home/gameRoleDto";
import { isEmpty } from "class-validator";

export const useWriteStore = defineStore("writeStore", {
  state: () => ({
    storepostType: `sell`,
    storetitle: "",
    storecontent: "",
    storeproductType: "",
    storesaleUnit: "",
    storepricePerUnit: "",
    storemaxAmount: "",
    storeminAmount: "",
    storecharacterName: "",
    storeregistration: "",
    storeroleIdx: 0,
    storelevel: 0,
    storeroleName: "",
    storehasPaymentHistory: null as boolean | null,
    storeisDuplicatedSync: null as boolean | null,

    // 직업리스트
    storeRoleList: {} as GameRoleDto[],
  }),

  getters: {
    getstoreregistration: (state) => {
      var value = state.storeregistration;
      if (value == null || isEmpty(value)) return null;
      else {
        switch (value) {
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
            return "핸드폰";
          case "etc":
            return "기타";
        }
      }
    },
  },
  actions: {
    setstorepostType(postType: string) {
      this.storepostType = postType;
    },
    setstoreCategory(productType: string) {
      this.storeproductType = productType;
    },
    async createPost(productType: string) {
      var result = "";
      var commonStore = useCommonStore();
      var { commonStoreGameKeywordIdx, commonStoreServerKeywordIdx } =
        storeToRefs(commonStore);
      var post = new CreatePostDtoBody(
        this.storetitle,
        this.storecontent,
        commonStoreGameKeywordIdx.value,
        commonStoreServerKeywordIdx.value,
        productType,
        this.storepostType,
        parseInt(this.storesaleUnit),
        parseInt(this.storepricePerUnit),
        parseInt(this.storemaxAmount),
        parseInt(this.storeminAmount),
        this.storecharacterName,
        this.storeregistration,
        this.storeroleIdx,
        this.storelevel,
        this.storehasPaymentHistory != null
          ? this.storehasPaymentHistory
          : false,
        this.storeisDuplicatedSync != null ? this.storeisDuplicatedSync : false
      );
      await homeApi
        .createPost(post)
        .then((res) => {
          console.log(res);
          this.router.replace("/post?postId=" + res);
        })
        .catch((err) => {
          console.log(err);
          alert("등록에 실패하였습니다.");
          this.router.replace("/");
        });
      return result;
    },
    getGameRole() {
      const commonStore = useCommonStore();
      const { commonStoreGameKeywordIdx } = storeToRefs(commonStore);
      homeApi
        .getGameRole(commonStoreGameKeywordIdx.value.toString())
        .then((res) => {
          this.storeRoleList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //  수정을 위해 불러오는 역할
    setStorePostDataforEdit(idx: string) {
      var commonStore = useCommonStore();
      homeApi
        .getProduct(idx)
        .then((res) => {
          //거래글
          this.storetitle = res.post.title;
          res.post.saleUnit != null
            ? (this.storesaleUnit = res.post.saleUnit.toString())
            : {};
          res.post.minAmount != null
            ? (this.storeminAmount = res.post.minAmount.toString())
            : {};
          res.post.maxAmount != null
            ? (this.storemaxAmount = res.post.maxAmount.toString())
            : {};
          this.storepricePerUnit = res.post.pricePerUnit.toString();

          commonStore.setstoreGameKeyword(res.post.gameName, res.post.gameIdx);
          commonStore.setstoreTempGameKeyword(res.post.gameName);

          commonStore.setstoreServerKeyword(
            res.post.serverName,
            res.post.serverIdx
          );
          commonStore.setstoreTempServerKeyword(res.post.serverName);
          commonStore.setstoreShowServerFilter(true);

          commonStore.setstoreCategory(res.post.productType);

          this.storepostType = res.post.type;
          res.post.content != null
            ? (this.storecontent = res.post.content)
            : {};

          res.post.level != null ? (this.storelevel = res.post.level) : {};

          res.post.roleName != null
            ? (this.storeroleName = res.post.roleName)
            : {};

          res.post.characterName != null
            ? (this.storecharacterName = res.post.characterName)
            : {};
          res.post.registration != null
            ? (this.storeregistration = res.post.registration)
            : {};
          res.post.hasInGamePaymentHistory != null
            ? (this.storehasPaymentHistory = res.post.hasInGamePaymentHistory)
            : {};
          res.post.isDuplicatedSync != null
            ? (this.storeisDuplicatedSync = res.post.isDuplicatedSync)
            : {};

          this.storeroleIdx = res.post.roleIdx;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async editPost(productType: string, postIdx: string) {
      var result = "";
      var commonStore = useCommonStore();
      var { commonStoreGameKeywordIdx, commonStoreServerKeywordIdx } =
        storeToRefs(commonStore);
      var post = new CreatePostDtoBody(
        this.storetitle,
        this.storecontent,
        commonStoreGameKeywordIdx.value,
        commonStoreServerKeywordIdx.value,
        productType,
        this.storepostType,
        parseInt(this.storesaleUnit),
        parseInt(this.storepricePerUnit),
        parseInt(this.storemaxAmount),
        parseInt(this.storeminAmount),
        this.storecharacterName,
        this.storeregistration,
        this.storeroleIdx,
        this.storelevel,
        this.storehasPaymentHistory != null
          ? this.storehasPaymentHistory
          : false,
        this.storeisDuplicatedSync != null ? this.storeisDuplicatedSync : false
      );
      await homeApi
        .editPost(post, postIdx)
        .then((res) => {
          this.router.replace("/post?postId=" + postIdx);
        })
        .catch((err) => {
          console.log(err);
          alert("등록에 실패하였습니다.");
          this.router.replace("/");
        });
      return result;
    },
  },
});
