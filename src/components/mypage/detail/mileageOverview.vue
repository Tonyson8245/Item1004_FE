<template>
  <div class="md:pl-8">
    <hr class="border-everly-black hidden md:block" />
    <!-- 프로필 -->
    <div class="flex bg-everly-wbg_grey md:py-6 md:space-x-6 md:bg-transparent">
      <img
        src="@/assets/img/profile_green.jpeg"
        alt=""
        class="w-[6.4rem] h-[6.4rem] rounded-2xl hidden md:block"
      />
      <div class="flex-grow">
        <div class="hidden md:block text-lg font-bold">
          {{ nickName }} 님의 사용가능 마일리지는 총
          <span class="text-everly-main"
            >{{ storemileageOverview?.availablePoint.toLocaleString() }}원</span
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
        <div
          class="flex md:hidden text-sm font-bold px-3 py-2 m-5 mt-0 border border-everly-mid_grey rounded-lg bg-everly-white items-center justify-between"
        >
          마일리지 입출금 내역
          <img src="@/assets/icon/arrow_right.svg" alt="" />
        </div>
      </div>
    </div>
    <!-- 마일리지 현황 -->
    <div
      class="flex flex-wrap md:flex-nowrap mt-5 mx-5 rounded-lg border-everly-light_grey border md:border-none md:mx-0"
    >
      <div
        class="w-full bg-everly-light_grey p-3 text-sm md:bg-transparent md:text-lg flex justify-between items-center md:pl-0 md:pr-8 md:flex-1"
      >
        <div class="flex items-center">
          <div>전체마일리지</div>
        </div>
        <div class="font-bold flex items-center text-base">
          <span class="md:text-2xl pr-0.5">{{
            storemileageOverview?.entirePoint.toLocaleString()
          }}</span
          ><span class="md:text-xl">원</span>
        </div>
      </div>
      <div class="w-full md:block md:border-l border-everly-mid_grey md:flex-1">
        <div
          class="flex-grow text-xs p-2.5 md:text-lg md:border-b border-everly-mid_grey md:p-5 flex justify-between items-center space-y-0"
        >
          <div class="flex">
            <div>사용가능 마일리지</div>
          </div>
          <div>
            <div class="font-bold flex items-center text-base">
              <span class="pr-1 md:text-2xl md:pr-0.5">{{
                storemileageOverview?.availablePoint.toLocaleString()
              }}</span
              ><span class="md:text-xl">원</span>
            </div>
          </div>
        </div>
        <div
          class="flex-grow text-xs p-2.5 md:text-lg md:p-5 flex justify-between items-center space-y-0"
        >
          <div class="flex">
            <div>소멸예정 마일리지</div>
          </div>
          <div>
            <div class="font-bold flex items-center text-base">
              <span class="pr-1 md:text-2xl md:pr-0.5">{{
                storemileageOverview?.expireDatePoint.toLocaleString()
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
        </div>
        <div
          class="md:px-10 md:py-3 text-right text-sm md:text-base md:text-left"
        >
          {{ storemileageOverview?.pointWithdrawal.toLocaleString() }}원
        </div>
      </div>
      <div class="flex-grow md:divide-y md:divide-[#f0f0f0] py-3 md:py-0">
        <div class="md:px-10 md:py-3 text-xs md:text-lg font-bold flex">
          구매전용
        </div>
        <div
          class="md:px-10 md:py-3 text-right text-sm md:text-base md:text-left"
        >
          {{ storemileageOverview?.pointPurchase.toLocaleString() }}원
        </div>
      </div>
      <div class="flex-grow md:divide-y md:divide-[#f0f0f0] py-3 md:py-0">
        <div class="md:px-10 md:py-3 text-xs md:text-lg font-bold flex">
          거래 사용중
        </div>
        <div
          class="md:px-10 md:py-3 text-right text-sm md:text-base md:text-left"
        >
          {{ storemileageOverview?.contractUserPoint.toLocaleString() }}원
        </div>
      </div>
      <div class="flex-grow md:divide-y md:divide-[#f0f0f0] py-3 md:py-0">
        <div class="md:px-10 md:py-3 text-xs md:text-lg font-bold flex">
          출금 요청중
        </div>
        <div
          class="md:px-10 md:py-3 text-right text-sm md:text-base md:text-left"
        >
          {{ storemileageOverview?.withdrawalUsePoint.toLocaleString() }}원
        </div>
      </div>
    </div>
    <hr class="border-everly-light_grey hidden md:block" />
    <div class="hidden md:block mt-10">
      <guide />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { user } from "@/domain/user/user.interface";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import guide from "../components/guide.vue";

//프로필 쪽
const nickName = computed(() => {
  return "이걸닉네임이라고짓다니말도안돼";
});
//마일리지 현황 (전체/사용가능/소멸예정)
const mypageStore = usemypageStore();
const { storemileageOverview } = storeToRefs(mypageStore);

onMounted(() => {
  const localData = localStorage.getItem("user");
  var mypageStore = usemypageStore();

  if (localData != null) {
    var userData = JSON.parse(localData) as user;
    mypageStore.getMileageOverview(userData.idx.toString());
  }
});
</script>

<style scoped></style>
