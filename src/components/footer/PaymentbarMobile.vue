<template>
  <div class="text-center w-full fixed bottom-0 z-40 py-2 px-4 bg-everly-white">
    <div class="w-full flex space-x-2">
      <div class="flex-1 text-left font-bold">
        <div class="text-sm flex items-end">
          <div>최종결제금액</div>
          <div class="ml-1 text-xs text-everly-dark_grey font-normal">
            (수수료 포함)
          </div>
        </div>

        <div class="text-lg text-everly-main">
          {{ storeFinalPrice.toLocaleString() }} 원
        </div>
      </div>
      <div class="flex-1 flex items-center">
        <div
          class="rounded-lg text-everly-white bg-everly-mid_grey font-bold py-2 text-center text-sm w-full"
          @click="goPayment()"
          :class="paymentButtonClass"
        >
          결제하기
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePaymentStore } from "@/store/modules/home/paymentStore";
import { storeToRefs } from "pinia";
import { payment } from "@/api/payment-module";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import type { user } from "@/domain/user/user.interface";
//결제 클릭
// 스마트로 버전
// const emit = defineEmits([`goPay`]);
// function goPay() {
//   emit("goPay");
// }
const router = useRouter();
const paymentStore = usePaymentStore();
const {
  storePricePerUnit,
  // 유저 정보
  // 쿠폰/마일리지
  storeDiscountMileage,

  //여기서는 클라만 있는 정보
  storePostIdx,
  storeProductPrice,
  storeFinalPrice,
  storeSellerIdx,

  // 동의 내용
  storeTerms,
  storeOrderQty,
  storeSaleUnit,

  //수수료
  storefeePrice,
} = storeToRefs(paymentStore);

function goPayment() {
  //포인트로만 결제 할 떄,
  if (!storeTerms.value) return;

  const localData = localStorage.getItem("user");
  if (localData != null) {
    const userIdx = (JSON.parse(localData) as user).idx;
    // TODO 쿠폰 들어 갈때 수정 필요
    if (storeDiscountMileage.value == storeProductPrice.value) {
      payment(
        router,
        "onlyPoint", // 포인트로만 결제
        "point", // 결제방식
        userIdx, // buyerIdx
        storefeePrice.value, // fee
        storeProductPrice.value, // productPrice
        storeProductPrice.value, // totalPrice
        storeProductPrice.value, // point
        storeSellerIdx.value, // sellerIdx
        storePostIdx.value, // postIdx
        storePricePerUnit.value,
        storeSaleUnit.value,
        storeOrderQty.value
      );
    }
    //포인트 + 일반 결제일 경우
    else {
      payment(
        router,
        "contract", // 결제
        "card", // 결제 방식
        userIdx, // buyerIdx
        storefeePrice.value, // fee
        storeProductPrice.value, // productPrice
        storeFinalPrice.value, // totalPrice
        storeDiscountMileage.value, // point
        storeSellerIdx.value, // sellerIdx
        storePostIdx.value, // postIdx
        storePricePerUnit.value,
        storeSaleUnit.value,
        storeOrderQty.value
      );
    }
  } else console.log("유저정보가 없습니다.");
}

//결제하기 버튼
const paymentButtonClass = ref("cursor-not-allowed bg-everly-mid_grey");
watch(storeTerms, () => {
  if (!storeTerms.value)
    paymentButtonClass.value = "cursor-not-allowed bg-everly-mid_grey";
  else paymentButtonClass.value = "cursor-pointer bg-everly-main";
});
</script>

<style scoped></style>
