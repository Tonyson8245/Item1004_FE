<template>
  <div class="h-screen md:h-auto">
    <div class="flex flex-col h-full justify-between md:h-auto">
      <div class="h-full md:h-auto">
        <div class="pt-14 md:pt-0 flex-col justify-between">
          <div>
            <div class="flex">
              <div class="grow"></div>
              <div
                class="w-full md:w-[30.625em] flex flex-col items-center py-10"
              >
                <div>
                  <img
                    src="@/assets/icon/check_circle_green_full.svg"
                    alt=""
                    class="w-[1.875em] md:w-[2.813em]"
                  />
                </div>
                <div class="text-base md:text-3xl font-bold mt-5 md:mt-7">
                  안전하게 결제완료
                </div>
              </div>
              <div class="grow"></div>
            </div>
            <hr
              class="border border-everly-mid_grey border-dashed hidden md:block"
            />
            <div class="flex">
              <div class="grow bg-everly-light_grey"></div>
              <div
                class="w-full md:w-[30.625em] p-5 md:px-0 md:py-13 p-5 md:px-0 md:py-14 bg-everly-light_grey"
              >
                <div class="md:text-xl text-sm space-y-3 md:space-y-8">
                  <div class="flex">
                    <div class="font-bold w-14 md:w-[6.9em]">거래물품</div>
                    <div class="grow text-right md:text-left space-y-2">
                      <div>{{ storePostTitle }}</div>
                      <div class="md:text-base">
                        {{ storeGameName }} > {{ storeServerName }} >
                        {{ storeCategory }}
                      </div>
                    </div>
                  </div>

                  <div class="flex">
                    <div class="font-bold w-14 md:w-[6.9em]">결제금액</div>
                    <div class="grow text-right md:text-left space-y-2">
                      <div>{{ storeProductPrice.toLocaleString() }} 원</div>
                      <div class="md:text-base">{{ productInfo }}</div>
                    </div>
                  </div>

                  <div class="flex">
                    <div class="font-bold w-14 md:w-[6.9em]">할인금액</div>
                    <div class="grow text-right md:text-left">
                      <div
                        class="flex justify-end md:justify-between space-x-3"
                      >
                        <div class="md:text-base text-everly-dark_grey">
                          (쿠폰)
                        </div>
                        <div>
                          - {{ storeDiscountCoupon.toLocaleString() }}원
                        </div>
                      </div>
                      <div
                        class="flex justify-end md:justify-between space-x-3"
                      >
                        <div class="md:text-base text-everly-dark_grey">
                          (마일리지)
                        </div>
                        <div>
                          - {{ storeDiscountMileage.toLocaleString() }}원
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex">
                    <div
                      class="font-bold w-14 md:w-[6.9em] text-right md:text-left"
                    >
                      최종결제<br class="md:hidden" />금액
                    </div>
                    <div
                      class="grow text-right md:text-left md:flex md:items-end"
                    >
                      <div class="text-base font-bold md:text-xl">
                        {{ parseInt(storeResultAmt).toLocaleString() }} 원
                      </div>
                      <div class="text-everly-dark_grey text-xs md:text-sm">
                        (수수료 포함)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grow bg-everly-light_grey"></div>
            </div>
            <hr class="border border-everly-mid_grey hidden md:block" />
            <div class="flex">
              <div class="grow"></div>
              <div class="w-full md:w-[30.625em] md:text-xl text-sm">
                <div
                  class="p-5 pb-0 md:px-[4.25em] md:py-[2.215em] space-y-2 md:space-y-4"
                >
                  <div class="flex md:space-x-11">
                    <div class="font-bold">결제번호</div>
                    <div class="col-span-3 grow text-right md:text-left">
                      {{ storeResultTid }}
                    </div>
                  </div>
                  <div class="flex md:space-x-11">
                    <div class="font-bold">결제일시</div>
                    <div class="col-span-3 grow text-right md:text-left">
                      {{ storeResultPayDate }}
                    </div>
                  </div>

                  <div class="flex md:space-x-11">
                    <div class="font-bold">결제방법</div>
                    <div class="col-span-3 grow text-right md:text-left">
                      {{ storeResultPayMethod }}
                    </div>
                  </div>

                  <div class="flex md:space-x-11">
                    <div class="font-bold">거래상태</div>
                    <div class="col-span-3 grow text-right md:text-left">
                      결제완료
                    </div>
                  </div>
                </div>
              </div>
              <div class="grow"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-grow"></div>
      <div>
        <div class="flex py-8 md:py-16">
          <div class="grow"></div>
          <div class="w-full md:w-[30.625em] p-4 md:p-0">
            <div
              class="bg-everly-main text-white text-base md:text-lg text-center p-3 rounded-lg cursor-pointer"
              @click="router.push('/')"
            >
              확인
            </div>
          </div>
          <div class="grow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePaymentStore } from "@/store/modules/home/paymentStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { numberToKorean } from "@/common";
import { computed } from "vue";
const router = useRouter();
const paymentStore = usePaymentStore();

const {
  storeTotalQty,
  storePostTitle,
  storeProductPrice,
  storePricePerUnit,
  storeMinValue,
  storeUnitName,
  storeOrderQty,
  storeDiscountCoupon,
  storeDiscountMileage,
  storeResultAmt,
  storeResultTid,
  storeResultPayDate,
  storeResultPayMethod,

  storeGameName,
  storeServerName,
  storeCategory,
} = storeToRefs(paymentStore);

// router에 emit이 있어서 warning에 뜨는 데, 이를 없애기 위한 emit
const emit = defineEmits([`goPay`]);
function goPay() {}

const productInfo = computed(() => {
  return (
    numberToKorean(storeMinValue.value) +
    " " +
    storeUnitName.value +
    " " +
    storePricePerUnit.value.toLocaleString() +
    `원 / ` +
    storeOrderQty.value +
    "개 (" +
    numberToKorean(storeTotalQty.value) +
    " " +
    storeUnitName.value +
    ")"
  );
});
</script>

<style scoped></style>
