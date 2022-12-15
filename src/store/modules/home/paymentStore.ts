import { defineStore } from "pinia";

export const usePaymentStore = defineStore("paymentStore", {
  state: () => ({
    //서버로 부터 업데이되야할 정보
    //포스트 정보
    storePostTitle: "8억~580억 메이플 메소 판매합니다", // 게시글명
    storeUnitInt: "8억메소당", // 물품 단위
    storeUnit: "8억메소당", // 물품 단위
    storePricePerUnit: "26,046원", // 물품 단위당 가격
    // 유저 정보
    storeName: "김철수", // 유저 이름
    storeNickname: "이걸닉네임이라고짓다니말도안돼", // 유저 닉네임
    storePhonenumber: "010-1234-5678", // 유저 전화번호
    storeCharaterName: "", // 유저 캐릭터 이름

    // 쿠폰/마일리지
    storeCouponList: ["30% 할인", "1,000원 할인", "10,000원 할인"], //쿠폰 종류
    storeCouponEffect: "*0.3",
    storeTotalMileage: 210000, // 보유마일리지
    storeDiscountMileage: 0, // 사용 마일리지

    //여기서는 클라만 있는 정보
    storePaymentMethod: "", // 결제방법

    storeProductPrice: 206303, //상품금액
    storeDiscountCoupon: 0, //쿠폰 효과
    storeFinalPrice: 206303, //최종결제금액

    // 동의 내용
    storeTermsAll: false,
    storeTerms: [false, false],

    storeTermsforUse: false,
    storeOrderQty: 8,
    storeTotalQty: "64억메소",
  }),

  getters: {},
  actions: {
    // 약관 각각 선택상황
    setstoreTerms(type: string) {
      if (type == "use")
        this.storeTerms[0] = !this.storeTerms[0]; // 개인 정보 수집 이용동의/
      else this.storeTerms[1] = !this.storeTerms[1];

      if (this.storeTerms[0] && this.storeTerms[1]) this.setstoreTermsAll(true);
      else this.storeTermsAll = false;
    },
    // 전체 선택 값 변경
    setstoreTermsAll(status: boolean) {
      this.storeTermsAll = status;
      if (status) this.storeTerms = [true, true];
      else this.storeTerms = [false, false];
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
      this.storeFinalPrice = this.storeProductPrice - mileage;
    },
  },
});
