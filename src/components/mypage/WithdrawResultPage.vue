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
                <div>{{ getterwithdrawResultBankname }}</div>
              </div>
            </div>

            <div class="flex">
              <div class="font-bold w-22 md:w-[15rem]">출금신청 마일리지</div>
              <div class="grow text-right md:text-left space-y-2">
                <div>
                  {{ commonFunction.comma(data.withdrawalPoint) }}
                  원
                </div>
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
                {{ commonFunction.comma(data.currentWithdrawalPoint) }} 원
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
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import commonFunction from "@/common";
const router = useRouter();
const route = useRoute();
const mypageStore = usemypageStore();

const { getterstorewithdrawResult, getterwithdrawResultBankname } =
  storeToRefs(mypageStore);

const data = getterstorewithdrawResult;
</script>

<style scoped></style>
