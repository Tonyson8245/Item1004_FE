<template>
  <div class="pt-14 md:pt-0 w-full flex flex-col">
    <div class="flex">
      <div class="grow hidden md:block"></div>
      <div
        class="w-full md:flex-none md:w-[73.750rem] md:flex md:justify-center"
      >
        <div class="w-full md:w-[30.625rem] flex flex-col items-center py-10">
          <div>
            <img
              src="@/assets/icon/check_circle_green_full.svg"
              alt=""
              class="w-[1.875rem] md:w-[2.813rem]"
            />
          </div>
          <div class="text-base md:text-3xl font-bold mt-5 md:mt-7">
            마일리지 {{ route.meta.title }}
          </div>
        </div>
      </div>
      <div class="grow hidden md:block"></div>
    </div>
    <div class="flex">
      <div
        class="grow bg-everly-light_grey border-t border-everly-mid_grey border-dashed"
      ></div>
      <div
        class="w-full md:flex-none w-full md:w-[73.750rem] md:flex md:justify-center md:bg-[#f0f0f0] border-t border-everly-mid_grey border-dashed"
      >
        <div
          class="w-full md:w-[30.625rem] p-5 md:px-0 md:py-13 p-5 md:px-0 md:py-14 bg-everly-light_grey"
        >
          <div class="md:text-xl text-sm space-y-3 md:space-y-8">
            <div class="flex">
              <div class="font-bold w-20 md:w-[10.5rem]">충전금액</div>
              <div class="grow text-right md:text-left space-y-2">
                <div>{{ chargeAmount.toLocaleString() }} 원</div>
              </div>
            </div>

            <div class="flex">
              <div class="font-bold w-20 md:w-[10.5rem]">충전마일리지</div>
              <div class="grow text-right md:text-left space-y-2">
                <div>{{ chargeMileagAmount.toLocaleString() }} 원</div>
              </div>
            </div>

            <div class="flex">
              <div class="font-bold w-20 md:w-[10.5rem]">결제번호</div>
              <div class="grow text-right md:text-left">
                <div class="flex justify-end md:justify-between space-x-3">
                  <div>{{ paymentId }}</div>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="font-bold w-20 md:w-[10.5rem]">결제상태</div>
              <div class="grow text-right md:text-left">
                <div class="flex justify-end md:justify-between space-x-3">
                  <div>{{ paymentStatus }}</div>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="font-bold w-20 md:w-[10.5rem]">결제방법</div>
              <div class="grow text-right md:text-left">
                <div class="flex justify-end md:justify-between space-x-3">
                  <div>{{ paymentMethod }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="grow bg-everly-light_grey border-t border-everly-mid_grey border-dashed"
      ></div>
    </div>
    <div class="flex">
      <div class="grow hidden md:block border-t border-everly-mid_grey"></div>
      <div
        class="w-full md:flex-none md:w-[73.750rem] md:flex md:justify-center grow border-t border-everly-mid_grey"
      >
        <div
          class="w-full md:w-[30.625rem] md:text-xl text-sm flex-col justify-start flex"
        >
          <div class="p-5 pb-0 md:px-0 md:py-[2.215rem] space-y-2 md:space-y-8">
            <div class="flex">
              <div class="font-bold md:w-[10.5rem]">충전 후 마일리지</div>
              <div class="col-span-3 grow text-right md:text-left">
                {{ mileagefterCharge.toLocaleString() }} 원
              </div>
            </div>
            <div class="flex">
              <div class="font-bold md:w-[10.5rem]">출금가능 마일리지</div>
              <div class="col-span-3 grow text-right md:text-left">
                {{ milageWithdrawlable.toLocaleString() }} 원
              </div>
            </div>

            <div class="flex">
              <div class="font-bold md:w-[10.5rem]">구매전용 마일리지</div>
              <div class="col-span-3 grow text-right md:text-left">
                {{ mileageOnlyforBuy.toLocaleString() }} 원
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grow hidden md:block border-t border-everly-mid_grey"></div>
    </div>
    <div class="flex-grow"></div>
    <div>
      <div class="flex py-8 md:py-16">
        <div class="grow"></div>
        <div
          class="w-full md:flex-none md:w-[73.750rem] md:flex md:justify-center"
        >
          <div class="md:w-[30.625rem] p-4 md:p-0">
            <div
              class="bg-everly-main text-white text-base md:text-lg text-center p-3 rounded-lg cursor-pointer"
              @click="router.push('/')"
            >
              확인
            </div>
          </div>
        </div>
        <div class="grow"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePaymentStore } from "@/store/modules/home/paymentStore";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { numberToKorean } from "@/common";
import { computed, ref } from "vue";
const router = useRouter();
const route = useRoute();
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

const chargeAmount = ref(50000);
const chargeMileagAmount = ref(47250);
const paymentId = ref("A1234-67890");
const paymentStatus = ref("충전완료");
const paymentMethod = ref("신용카드");
const mileagefterCharge = ref(10250);
const milageWithdrawlable = ref(47250);
const mileageOnlyforBuy = ref(53000);
</script>

<style scoped></style>
