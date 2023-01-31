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
                <div>{{ chargeTotalPrice }} 원</div>
              </div>
            </div>

            <div class="flex">
              <div class="font-bold w-20 md:w-[10.5rem]">충전마일리지</div>
              <div class="grow text-right md:text-left space-y-2">
                <div>{{ chargeChargePoint }} 원</div>
              </div>
            </div>

            <div class="flex">
              <div class="font-bold w-20 md:w-[10.5rem]">결제번호</div>
              <div class="grow text-right md:text-left">
                <div class="flex justify-end md:justify-between space-x-3">
                  <div>{{ data.tid }}</div>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="font-bold w-20 md:w-[10.5rem]">결제상태</div>
              <div class="grow text-right md:text-left">
                <div class="flex justify-end md:justify-between space-x-3">
                  <div>결제완료</div>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="font-bold w-20 md:w-[10.5rem]">결제방법</div>
              <div class="grow text-right md:text-left">
                <div class="flex justify-end md:justify-between space-x-3">
                  <div>{{ data.payMethod }}</div>
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
                {{ chargeafterChargePoint }} 원
              </div>
            </div>
            <div class="flex">
              <div class="font-bold md:w-[10.5rem]">출금가능 마일리지</div>
              <div class="col-span-3 grow text-right md:text-left">
                {{ chargewithdrawalPoint }} 원
              </div>
            </div>

            <div class="flex">
              <div class="font-bold md:w-[10.5rem]">구매전용 마일리지</div>
              <div class="col-span-3 grow text-right md:text-left">
                {{ chargepurchasePoint }} 원
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grow hidden md:block border-t border-everly-mid_grey"></div>
    </div>
    <div class="flex-grow"></div>
    <div class="flex">
      <div class="grow border-t border-everly-mid_grey"></div>
      <div
        class="w-full md:flex-none md:w-[73.750rem] md:flex md:justify-center border-t border-everly-mid_grey"
      >
        <div class="md:w-[30.625rem] p-4 md:p-0">
          <div
            class="p-5 pb-0 md:px-0 md:py-[2.215rem] space-y-2 md:space-y-8 text-sm"
          >
            출금신청 후 카카오 채널로 문의 주시면 더 빠른 출금이 가능합니다
            <span
              class="bg-everly-main px-2 py-1 m-1 rounded-lg w-12 text-center text-everly-white text-xs cursor-pointer"
              @click="moveExternalLink('카카오채널')"
            >
              카카오 채널 바로가기
            </span>
          </div>
        </div>
      </div>
      <div class="grow border-t border-everly-mid_grey"></div>
    </div>
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
import { computed, ref, onMounted } from "vue";
import { chargeCompleteBody } from "@/domain/payment/chargeCompleteDto";
import { moveExternalLink } from "@/common";
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
