<template>
  <div class="md:pl-8">
    <hr class="border-everly-black hidden md:block" />
    <!-- 프로필 -->
    <div class="flex md:py-6 md:space-x-6">
      <img
        src="@/assets/img/profile_green.jpeg"
        alt=""
        class="w-[6.4rem] h-[6.4rem] rounded-2xl hidden md:block"
      />
      <div class="flex-grow">
        <div class="hidden md:block text-lg font-bold">
          {{ nickName }} 님의 사용가능 마일리지는 총
          <span class="text-everly-main"
            >{{ mileageAvailableUse.toLocaleString() }}원</span
          >
          입니다.
        </div>
        <div class="flex text-everly-white p-5 space-x-3 md:px-0">
          <div class="flex-grow">
            <div
              class="bg-everly-main py-1.5 md:py-3 text-center rounded-lg flex justify-center text-sm md:text-lg"
            >
              충전하기
              <img src="@/assets/icon/deposit_white.svg" alt="" class="pl-2" />
            </div>
          </div>
          <div class="flex-grow">
            <div
              class="bg-everly-main py-1.5 md:py-3 text-center rounded-lg flex justify-center text-sm md:text-lg"
            >
              인출하기
              <img src="@/assets/icon/withdraw_white.svg" alt="" class="pl-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 마일리지 현황 -->
    <div
      class="flex flex-wrap md:flex-nowrap mx-5 rounded-lg border-everly-light_grey border md:border-none md:mx-0"
    >
      <div
        class="w-full bg-everly-light_grey p-3 text-sm md:bg-transparent md:text-lg flex justify-between items-center md:pl-0 md:pr-8 md:flex-1"
      >
        <div class="flex items-center">
          <div>전체마일리지</div>
          <img
            src="@/assets/icon/question_grey.svg"
            alt=""
            class="pl-1 md:pl-2 md:w-6"
          />
        </div>
        <div class="font-bold flex items-center">
          <span class="md:text-2xl pr-0.5">{{
            mileageTotal.toLocaleString()
          }}</span
          ><span class="md:text-xl">원</span>
        </div>
      </div>
      <div
        class="w-full flex md:block md:border-l border-everly-mid_grey md:flex-1"
      >
        <div
          class="flex-grow text-xs p-3 md:text-lg md:border-b border-everly-mid_grey md:p-5 md:flex md:justify-between space-y-1 md:space-y-0"
        >
          <div class="flex">
            <div>사용가능 마일리지</div>
            <img
              src="@/assets/icon/question_grey.svg"
              alt=""
              class="pl-1 md:pl-2 md:w-6"
            />
          </div>
          <div>
            <div class="font-bold flex items-center text-base">
              <span class="pr-1 md:text-2xl md:pr-0.5">{{
                mileageAvailableUse.toLocaleString()
              }}</span
              ><span class="md:text-xl">원</span>
            </div>
          </div>
        </div>
        <div
          class="flex-grow text-xs p-3 md:text-lg md:p-5 md:flex md:justify-between space-y-1 md:space-y-0"
        >
          <div class="flex">
            <div>소멸예정 마일리지</div>
            <img
              src="@/assets/icon/question_grey.svg"
              alt=""
              class="pl-1 md:pl-2 md:w-6"
            />
          </div>
          <div>
            <div class="font-bold flex items-center text-base">
              <span class="pr-1 md:text-2xl md:pr-0.5">{{
                mileageExpiry.toLocaleString()
              }}</span
              ><span class="md:text-xl">원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 마일리지 상세 -->
    <div
      class="mt-5 md:flex w-full divide-y md:border-t md:border-t-[#707070] md:divide-y-0 px-5 md:px-0"
    >
      <div class="flex-grow md:divide-y md:divide-[#f0f0f0] py-3 md:py-0">
        <div class="md:px-10 md:py-3 text-xs md:text-lg font-bold flex">
          출금가능
          <img
            src="@/assets/icon/question_grey.svg"
            alt=""
            class="pl-1 md:pl-2 md:w-6"
          />
        </div>
        <div
          class="md:px-10 md:py-3 text-right text-sm md:text-base md:text-left"
        >
          {{ mileageAvailabeWithdraw.toLocaleString() }}원
        </div>
      </div>
      <div class="flex-grow md:divide-y md:divide-[#f0f0f0] py-3 md:py-0">
        <div class="md:px-10 md:py-3 text-xs md:text-lg font-bold flex">
          구매전용
          <img
            src="@/assets/icon/question_grey.svg"
            alt=""
            class="pl-1 md:pl-2 md:w-6"
          />
        </div>
        <div
          class="md:px-10 md:py-3 text-right text-sm md:text-base md:text-left"
        >
          {{ mileageOnlyforBuy.toLocaleString() }}원
        </div>
      </div>
      <div class="flex-grow md:divide-y md:divide-[#f0f0f0] py-3 md:py-0">
        <div class="md:px-10 md:py-3 text-xs md:text-lg font-bold flex">
          거래 사용중
          <img
            src="@/assets/icon/question_grey.svg"
            alt=""
            class="pl-1 md:pl-2 md:w-6"
          />
        </div>
        <div
          class="md:px-10 md:py-3 text-right text-sm md:text-base md:text-left"
        >
          {{ mileageUseforDeal.toLocaleString() }}원
        </div>
      </div>
      <div class="flex-grow md:divide-y md:divide-[#f0f0f0] py-3 md:py-0">
        <div class="md:px-10 md:py-3 text-xs md:text-lg font-bold flex">
          출금 요청중
          <img
            src="@/assets/icon/question_grey.svg"
            alt=""
            class="pl-1 md:pl-2 md:w-6"
          />
        </div>
        <div
          class="md:px-10 md:py-3 text-right text-sm md:text-base md:text-left"
        >
          {{ mileageRequestWithdraw.toLocaleString() }}원
        </div>
      </div>
    </div>
    <hr class="border-everly-light_grey hidden md:block" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

//프로필 쪽
const nickName = computed(() => {
  return "이걸닉네임이라고짓다니말도안돼";
});
//마일리지 현황 (전체/사용가능/소멸예정)
const mileageAvailableUse = computed(() => {
  return 800;
});
const mileageTotal = computed(() => {
  return 1000;
});
const mileageExpiry = computed(() => {
  return 200;
});
const mileageAvailabeWithdraw = computed(() => {
  return 800;
});
const mileageOnlyforBuy = computed(() => {
  return 200;
});
const mileageUseforDeal = computed(() => {
  return 0;
});
const mileageRequestWithdraw = computed(() => {
  return 0;
});
</script>

<style scoped></style>
