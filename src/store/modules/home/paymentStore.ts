import * as paymentApi from "@/api/payment-service";

import { defineStore } from "pinia";
import { numberToKorean } from "@/common";
import type {
  contractCompleteBody,
  contractCompleteResult,
} from "@/domain/payment/contractCompleteDto";
import type {
  chargeCompleteBody,
  chargeCompleteResult,
} from "@/domain/payment/chargeCompleteDto";
import type { user } from "@/domain/user/user.interface";
import { isEmpty } from "class-validator";

export const usePaymentStore = defineStore("paymentStore", {
  state: () => ({
    //서버로 부터 업데이되야할 정보
    //포스트 정보
    storePostIdx: 0,
    storePostTitle: "", // 게시글명
    storeSaleUnit: 1, // 물품 단위
    storeMinValue: 1, // 물품 단위
    storeSaleUnitName: "", // 물품 단위
    storePricePerUnit: 1, // 물품 단위당 가격
    storeSellerIdx: 0,

    storeGameName: "",
    storeServerName: "",
    storeCategory: "",

    storeCharaterName: "", // 유저 캐릭터 이름

    // 쿠폰/마일리지
    storeCouponList: ["30% 할인", "1,000원 할인", "10,000원 할인"], //쿠폰 종류
    storeCouponEffect: "*0.3",
    storeTotalMileage: 0, // 보유마일리지
    storeDiscountMileage: 0, // 사용 마일리지

    //여기서는 클라만 있는 정보
    storePaymentMethod: "CARD", // 결제방법

    storeProductPrice: 0, //상품금액
    storeDiscountCoupon: 0, //쿠폰 효과
    storeTotalPrice: 0, //최종결제금액 (제품가격+수수료)
    storeFinalPrice: 0, //최종결제금액 (수수료 + 제품가격 - 마일리지 - 쿠폰)
    storeOrderQty: 0,

    // 동의 내용
    storeTerms: false,
    // storeTerms: [false, false],
    //수수료
    storefeePercent: 20,
    storefeePrice: 0,

    ///결과 값 모음
    storeContractResult: {} as contractCompleteResult,
    storeChargeResult: {} as chargeCompleteResult,
  }),

  getters: {
    storeProductunit: (state) => {
      if (state.storeCategory == "gameMoney") return "게임머니";
      else return "개";
    },

    chargeTotalPrice: (state) => {
      var value = state.storeChargeResult.totalPrice;
      if (value != undefined) return value.toLocaleString();
      else return "";
    },
    chargeChargePoint: (state) => {
      var value = state.storeChargeResult.afterChargePoint;
      if (value != undefined) return value.toLocaleString();
      else return "";
    },
    chargeafterChargePoint: (state) => {
      var value = state.storeChargeResult.chargePoint;
      if (value != undefined) return value.toLocaleString();
      else return "";
    },
    chargewithdrawalPoint: (state) => {
      var value = state.storeChargeResult.withdrawalPoint;
      if (value != undefined) return value.toLocaleString();
      else return "";
    },
    chargepurchasePoint: (state) => {
      var value = state.storeChargeResult.purchasePoint;
      if (value != undefined) return value.toLocaleString();
      else return "";
    },
    getProductType: (state) => {
      var res = state.storeContractResult.productType;
      if (res != undefined) {
        switch (res) {
          case "gameMoney":
            return "게임머니";
          case "character":
            return "캐릭터";
          case "item":
            return "아이템";
          case "etc":
            return "기타";
        }
      } else return "";
    },
    productInfo: (state) => {
      var saleUnit = state.storeContractResult.saleUnit;
      var pricePerUnit = state.storeContractResult.pricePerUnit;
      var count = state.storeContractResult.countPricePerUnit;
      var multiPrice = state.storeContractResult.multiPricePerUnit;
      var unitName = "개";
      if (state.storeCategory == "gameMoney") unitName = "게임머니";
      else unitName = "개";

      console.log(saleUnit, pricePerUnit, count, multiPrice, unitName);

      if (
        !isEmpty(saleUnit) &&
        !isEmpty(pricePerUnit) &&
        !isEmpty(count) &&
        !isEmpty(multiPrice)
      ) {
        console.log("공백임");

        return (
          numberToKorean(saleUnit) +
          unitName +
          "당 " +
          pricePerUnit +
          "/" +
          numberToKorean(count) +
          "(" +
          multiPrice +
          ")"
        );
      } else return "";
    },
  },
  actions: {
    // 약관 각각 선택상황
    // setstoreTerms(type: string) {
    //   if (type == "use")
    //     this.storeTerms[0] = !this.storeTerms[0]; // 개인 정보 수집 이용동의/
    //   else this.storeTerms[1] = !this.storeTerms[1];

    //   if (this.storeTerms[0] && this.storeTerms[1]) this.setstoreTermsAll(true);
    //   else this.storeTermsAll = false;
    // },
    // // 전체 선택 값 변경
    // setstoreTermsAll(status: boolean) {
    //   this.storeTermsAll = status;
    //   if (status) this.storeTerms = [true, true];
    //   else this.storeTerms = [false, false];
    // },
    // 전체 선택 값 변경

    setstoreTerms(status: boolean) {
      this.storeTerms = status;
    },

    resetstorePaymentMethod() {
      this.storePaymentMethod = "";
    },
    setstorePaymentMethod(type: string) {
      this.storePaymentMethod = type;
    },
    setstoreCharaterName(name: string) {
      this.storeCharaterName = name;
    },
    setstoreDiscountMileage(amount: number) {
      let limitPrice =
        this.storeTotalMileage > this.storeProductPrice
          ? this.storeProductPrice
          : this.storeTotalMileage;

      if (isNaN(amount)) amount = 0;
      else if (amount > limitPrice) amount = limitPrice;

      this.storeDiscountMileage = amount;
    },
    setstoreFinalPrice(coupon: string, mileage: number) {
      this.storeFinalPrice = Math.round(
        (this.storeProductPrice - mileage) * (1 + this.storefeePercent / 100)
      ); // (제품 가격 - 마일리지) 에 수수료추가한 값(x1.**)
      this.storefeePrice = Math.round(
        (this.storeProductPrice - mileage) * (this.storefeePercent / 100)
      );
    },
    setPostTitle(title: string) {
      this.storePostTitle = title;
    },
    setPostData(
      idx: number,
      title: string,
      unit: number,
      saleUnit: number,
      saleUnitName: string,
      pricePerUnit: number,
      orderQty: number,
      GameName: string,
      ServerName: string,
      Category: string,
      SellerIdx: number
    ) {
      this.storePostIdx = idx;
      this.storePostTitle = title;
      this.storeMinValue = unit;
      this.storeSaleUnit = saleUnit;
      this.storeSaleUnitName = saleUnitName;
      this.storePricePerUnit = pricePerUnit;
      this.storeOrderQty = orderQty;
      this.storeGameName = GameName;
      this.storeServerName = ServerName;
      this.storeCategory = Category;
      this.storeSellerIdx = SellerIdx;
    },

    //해당 페이지 들어갈 때 값 설정할 때 사용
    mountstoreProductPrice(price: number) {
      this.storeProductPrice = price;
    },
    //최종값과 수수료 값 세팅
    mountstoreFinalPrice(price: number) {
      this.storeFinalPrice = Math.round(
        price * (1 + this.storefeePercent / 100)
      );
      this.storeTotalPrice = Math.round(
        price * (1 + this.storefeePercent / 100)
      );
      this.storefeePrice = this.storeFinalPrice - this.storeProductPrice;
    },

    // 충전 페이지 들어갈 때 값 설정할 때 사용
    chargestoreProductPrice(price: number) {
      this.storeProductPrice = price;
    },
    //최종값과 수수료 값 세팅
    chargestoreFinalPrice(price: number) {
      this.storeFinalPrice = price / 0.95;
      this.storefeePrice = Math.round(
        this.storeFinalPrice - this.storeProductPrice
      );
    },

    getContractCompleteResult(payload: contractCompleteBody) {
      paymentApi
        .getcontractResult(payload)
        .then((res) => {
          this.storeContractResult = res;
        })
        .catch((err) => {});
    },
    getChargeCompleteResult(payload: chargeCompleteBody) {
      paymentApi
        .getchargeResult(payload)
        .then((res) => {
          this.storeChargeResult = res;
        })
        .catch((err) => {});
    },
    getCheckUseablePoint() {
      const localData = localStorage.getItem("user");
      const userIdx =
        localData == null ? `로그인하기` : (JSON.parse(localData) as user).idx;

      paymentApi
        .chechUseablePoint(userIdx.toString())
        .then((res) => {
          console.log(res);
          this.storeTotalMileage = parseInt(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
