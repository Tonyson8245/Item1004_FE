<template>
  <div class="flex-grow sm:flex">
    <div class="grid place-items-center w-full sm:m-auto">
      <div class="hidden sm:block">
        <img class="w-36" src="@/assets/icon/logo_mobile.svg" alt="" />
      </div>
      <div
        class="text-left p-1 mt-16 sm:mt-5 w-11/12 sm:font-bold text-everly-main text-sm sm:text-lg text-center sm:text-left"
      >
        계정정보
      </div>

      <div class="grid gap-2 place-items-center w-11/12 mt-2 pt-1">
        <div class="flex items-center w-full relative">
          <input
            placeholder="아이디"
            class="flex-1 rounded-lg border border-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs sm:text-sm"
          />
          <div class="absolute right-5">
            <img
              src="@/assets/icon/check_small.svg"
              alt=""
              class="w-5 h-5"
              v-if="overlap"
            />
            <span class="text-everly-dark_grey text-xs" v-if="!overlap"
              >중복확인</span
            >
          </div>
        </div>
        <div class="flex items-center w-full relative">
          <input
            placeholder="비밀번호"
            class="flex-1 rounded-lg border border-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs sm:text-sm"
          />
          <img
            src="@/assets/icon/eyes_open.svg"
            class="w-5 h-5 absolute right-5"
            alt=""
          />
        </div>
        <div class="flex items-center w-full relative">
          <input
            placeholder="비밀번호 확인"
            class="flex-1 rounded-lg border border-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs sm:text-sm"
          />
          <img
            src="@/assets/icon/eyes_open.svg"
            class="w-5 h-5 absolute right-5"
            alt=""
          />
        </div>
      </div>

      <div class="grid gap-1 place-items-center mt-2 w-full p-1">
        <div class="text-center sm:text-left sm:mt-5 w-11/12">
          <span class="sm:font-bold text-everly-main text-sm sm:text-lg"
            >추천인</span
          >
        </div>
        <div class="pr-0 flex items-center w-11/12">
          <input
            placeholder="추천인 코드 10자리를 입력하세요"
            class="mr-1 rounded-lg border border-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs sm:text-sm w-4/5"
          />
          <button
            class="bg-everly-main text-white rounded-lg shadow-md text-xs sm:text-sm py-3 w-1/5"
          >
            확인
          </button>
        </div>
      </div>

      <div class="text-everly-dark_grey w-11/12 p-1 mt-5">
        <div class="flex items-center w-full">
          <img
            src="@/assets/icon/check_circle.svg"
            alt=""
            class="pr-2 w-6 h-6"
          />
          <div class="text-xs flex-1">
            아이템 천사 이용약관 전체 동의합니다. (선택 포함)
          </div>
        </div>
      </div>
      <div class="text-everly-dark_grey w-11/12 p-1 pt-0">
        <div>
          <contractVue
            v-for="contract in contractList"
            key="contract"
            :data="contract"
          />
        </div>
      </div>

      <div class="grid p-1 gap-2 place-items-center w-full mt-4 sm:mt-8">
        <button
          class="h-11 lg:h-15 px-6 py-2 rounded-lg text-sm text-everly-white bg-everly-mid_grey w-11/12"
        >
          가입하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import contractVue from "./common/contract.vue";

const overlap = ref(false);
const contractList = [
  {
    text: "(필수) 아이템 천사 거래 및 서비스 이용약관)",
    link: "(필수) 아이템 천사 거래 및 서비스 이용약관) 로 이동합니다.",
  },
  {
    text: "(필수) 개인 정보 수집 및 이용",
    link: "(필수) 개인 정보 수집 및 이용 로 이동합니다.",
  },
  {
    text: "(선택) 광고 정보 수신 동의",
    link: "(선택) 광고 정보 수신 동의 로 이동합니다.",
  },
  {
    text: "(선택) 마케팅 이용 동의(보류)",
    link: "(선택) 마케팅 이용 동의(보류) 로 이동합니다.",
  },
];
</script>

<style scoped></style>
