<template>
  <div class="pt-14 md:pt-0 w-full flex flex-col">
    <div class="flex">
      <div class="grow hidden md:block"></div>
      <div
        class="w-full md:flex-none md:w-[73.750rem] md:flex md:justify-center"
      >
        <div class="w-full md:w-[30.725rem] flex flex-col items-center py-10">
          <div>
            <img
              src="@/assets/icon/check_circle_green_full.svg"
              alt=""
              class="w-[1.875rem] md:w-[2.815rem]"
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
      <div class="grow bg-everly-light_grey border-dashed md:border-t"></div>
      <div
        class="w-full md:flex-none l md:w-[73.750rem] md:flex md:justify-center md:bg-[#f0f0f0] border-everly-mid_grey border-dashed md:border-t"
      >
        <div
          class="w-full md:w-[30.725rem] md:py-15 p-5 md:px-0 md:py-14 bg-everly-light_grey"
        >
          <div class="md:text-xl text-sm space-y-3 md:space-y-8">
            <div class="flex">
              <div class="font-bold w-22 md:w-[15rem]">출금 계좌</div>
              <div class="grow text-right md:text-left space-y-2">
                <div>(신한) 110-403-902006</div>
              </div>
            </div>

            <div class="flex">
              <div class="font-bold w-22 md:w-[15rem]">출금신청 마일리지</div>
              <div class="grow text-right md:text-left space-y-2">
                <div>40,000 원</div>
              </div>
            </div>

            <div class="flex">
              <div class="font-bold w-22 md:w-[15rem]">출금상태</div>
              <div class="grow text-right md:text-left">
                <div class="flex justify-end md:justify-between space-x-3">
                  <div>신청완료</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grow bg-everly-light_grey border-dashed md:border-t"></div>
    </div>
    <div class="flex">
      <div class="grow hidden md:block md:border-t"></div>
      <div
        class="w-full md:flex-none md:w-[73.750rem] md:flex md:justify-center grow md:border-t"
      >
        <div
          class="w-full md:w-[30.725rem] md:text-xl text-sm flex-col justify-start flex"
        >
          <div class="p-5 pb-0 md:px-0 md:py-[2.215rem] space-y-2 md:space-y-8">
            <div class="flex">
              <div class="font-bold md:w-[15rem]">남은 출금가능 마일리지</div>
              <div class="col-span-3 grow text-right md:text-left">
                6,250 원
              </div>
            </div>
          </div>
          <div
            class="flex flex-col items-center text-everly-dark_grey mt-10 text-sm md:text-base"
          >
            <img
              src="@/assets/icon/exclamation_circle_grey.svg"
              alt=""
              class="w-4 md:w-5 py-2 md:py-4"
            />
            <div>신청 후 24시간 이내에 출금 됩니다.</div>
            <div>출금되지 않을 시 고객센터로 문의 바랍니다.</div>
            <div class="pt-2">(고객센터 번호 또는 링크)</div>
          </div>
        </div>
      </div>
      <div class="grow hidden md:block md:border-t"></div>
    </div>
    <div class="flex-grow"></div>
    <div>
      <div class="flex py-8 md:py-16">
        <div class="grow"></div>
        <div
          class="w-full md:flex-none md:w-[73.750rem] md:flex md:justify-center"
        >
          <div class="md:w-[30.725rem] p-4 md:p-0">
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
import { computed, ref, onMounted } from "vue";
import { chargeCompleteBody } from "@/domain/payment/chargeCompleteDto";
const router = useRouter();
const route = useRoute();
const paymentStore = usePaymentStore();

const {
  storeChargeResult,
  chargeTotalPrice,
  chargeChargePoint,
  chargeafterChargePoint,
  chargewithdrawalPoint,
  chargepurchasePoint,
} = storeToRefs(paymentStore);

// router에 emit이 있어서 warning에 뜨는 데, 이를 없애기 위한 emit
const emit = defineEmits([`goPay`]);
function goPay() {}

const data = storeChargeResult;

const tid = ref("");
const amt = ref("");
const payMehod = ref("");
const ediDate = ref("");
const userIdx = ref("");

onMounted(() => {
  var querytid = route.query.tid?.toString();
  var queryamt = route.query.amt?.toString();
  var querypayMehod = route.query.payMethod?.toString();
  var queryediDate = route.query.ediDate?.toString();
  var queryuserIdx = route.query.userIdx?.toString();

  tid.value = querytid == undefined ? "" : querytid;
  amt.value = queryamt == undefined ? "" : queryamt;
  payMehod.value = querypayMehod == undefined ? "" : querypayMehod;
  ediDate.value = queryediDate == undefined ? "" : queryediDate;
  userIdx.value = queryuserIdx == undefined ? "" : queryuserIdx;

  var payload = new chargeCompleteBody(
    tid.value,
    payMehod.value,
    parseInt(userIdx.value)
  );
  paymentStore.getChargeCompleteResult(payload);
});
</script>

<style scoped></style>
