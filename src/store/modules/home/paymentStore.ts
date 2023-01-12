import { defineStore } from "pinia";

export const usePaymentStore = defineStore("paymentStore", {
  state: () => ({
    //서버로 부터 업데이되야할 정보
    //포스트 정보
    storePostIdx: 0,
    storePostTitle: "", // 게시글명
    storeMinValue: 0, // 물품 단위
    storeUnitName: "", // 물품 단위
    storePricePerUnit: 0, // 물품 단위당 가격

    storeGameName: "",
    storeServerName: "",
    storeCategory: "",

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
    storePaymentMethod: "CARD", // 결제방법

    storeProductPrice: 0, //상품금액
    storeDiscountCoupon: 0, //쿠폰 효과
    storeTotalPrice: 0, //최종결제금액 (제품가격+수수료)
    storeFinalPrice: 0, //최종결제금액 (수수료 + 제품가격 - 마일리지 - 쿠폰)

    // 동의 내용
    storeTerms: false,
    // storeTerms: [false, false],

    storeTermsforUse: false,
    storeOrderQty: 0,
    storeTotalQty: 6400000000,

    //reslt
    storeResultTid: "",
    storeResultAmt: "",
    storeResultPayMethod: "",
    storeResultPayDate: "",

    //수수료
    storefeePercent: 20,
    storefeePrice: 0,
  }),

  getters: {},
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
      unitName: string,
      pricePerUnit: number,
      orderQty: number,
      GameName: string,
      ServerName: string,
      Category: string
    ) {
      this.storePostIdx = idx;
      this.storePostTitle = title;
      this.storeMinValue = unit;
      this.storeUnitName = unitName;
      this.storePricePerUnit = pricePerUnit;
      this.storeOrderQty = orderQty;
      this.storeGameName = GameName;
      this.storeServerName = ServerName;
      this.storeCategory = Category;
    },

    //해당 페이지 들어갈 때 값 설정할 때 사용
    mountstoreProductPrice(price: number) {
      this.storeProductPrice = price;
    },
    //최종값과 수수료 값 세팅
    mountstoreFinalPrice(price: number) {
      this.storeFinalPrice = price * (1 + this.storefeePercent / 100);
      this.storeTotalPrice = price * (1 + this.storefeePercent / 100);
      this.storefeePrice = Math.round(
        this.storeFinalPrice - this.storeProductPrice
      );
    },

    setResult(Tid: string, Amt: string, PayMethod: string, PayDate: string) {
      this.storeResultTid = Tid;
      this.storeResultAmt = Amt;
      this.storeResultPayMethod = PayMethod;
      this.storeResultPayDate = PayDate;
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

    resetpaymentStore() {
      //서버로 부터 업데이되야할 정보
      //포스트 정보
      this.storePostTitle = ""; // 게시글명
      this.storeMinValue = 0; // 물품 단위
      this.storeUnitName = ""; // 물품 단위
      this.storePricePerUnit = 0; // 물품 단위당 가격

      (this.storeGameName = ""),
        (this.storeServerName = ""),
        (this.storeCategory = ""),
        // 유저 정보
        (this.storeName = "김철수"); // 유저 이름
      this.storeNickname = "이걸닉네임이라고짓다니말도안돼"; // 유저 닉네임
      this.storePhonenumber = "010-1234-5678"; // 유저 전화번호
      this.storeCharaterName = ""; // 유저 캐릭터 이름

      // 쿠폰/마일리지
      this.storeCouponList = ["30% 할인", "1,000원 할인", "10,000원 할인"]; //쿠폰 종류
      (this.storeCouponEffect = "*0.3"), (this.storeTotalMileage = 210000); // 보유마일리지
      this.storeDiscountMileage = 0; // 사용 마일리지

      //여기서는 클라만 있는 정보
      this.storePaymentMethod = "CARD"; // 결제방법

      this.storeProductPrice = 0; //상품금액
      this.storeDiscountCoupon = 0; //쿠폰 효과
      this.storeTotalPrice = 0; //최종결제금액 (제품가격+수수료)
      this.storeFinalPrice = 0; //최종결제금액 (수수료 + 제품가격 - 마일리지 - 쿠폰)

      // 동의 내용
      this.storeTerms = false;
      // this.// storeTerms= [false, false],

      this.storeTermsforUse = false;
      this.storeOrderQty = 0;
      this.storeTotalQty = 6400000000;

      //reslt
      this.storeResultTid = "";
      this.storeResultAmt = "";
      this.storeResultPayMethod = "";
      this.storeResultPayDate = "";

      //수수료
      this.storefeePercent = 20;
      this.storefeePrice = 0;
    },
  },
});
