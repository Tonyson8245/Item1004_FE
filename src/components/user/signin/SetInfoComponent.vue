<template>
  <div class="h-screen sm:flex">
    <div
      class="place-items-center sm:w-full h-full flex flex-col justify-between sm:h-auto"
    >
      <div class="hidden sm:block">
        <img class="w-36" src="@/assets/icon/logo_mobile.svg" alt="" />
      </div>

      <div
        class="grid gap-2 place-items-center w-full px-2 mt-2 pt-1 flex-none"
      >
        <div
          class="text-left p-1 mt-16 sm:mt-5 w-11/12 sm:font-bold text-everly-main text-sm sm:text-lg text-center sm:text-left"
        >
          계정정보
        </div>
        <div class="flex items-center w-full relative">
          <input
            placeholder="아이디"
            class="flex-1 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs sm:text-sm"
          />
          <img
            src="@/assets/icon/check_small.svg"
            class="w-5 h-5 absolute right-5"
            alt=""
          />
        </div>
        <div class="flex items-center w-full relative">
          <input
            placeholder="비밀번호"
            class="flex-1 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs sm:text-sm"
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
            class="flex-1 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs sm:text-sm"
          />
          <img
            src="@/assets/icon/eyes_open.svg"
            class="w-5 h-5 absolute right-5"
            alt=""
          />
        </div>
        <div class="w-full pl-2 text-xs sm:text-sm">
          <span class="text-everly-red"
            >*비밀번호 영문,숫자,특수문자 조합으로 8자리 이상입니다.</span
          >
        </div>
      </div>

      <div class="grid gap-1 place-items-center mt-1 w-full p-2 flex-none">
        <div class="text-center sm:text-left sm:mt-2 w-full">
          <span class="sm:font-bold text-everly-main text-sm sm:text-lg"
            >추천인</span
          >
        </div>
        <div class="pr-0 flex items-center w-full">
          <input
            placeholder="추천인 코드 10자리를 입력하세요"
            class="mr-1 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs sm:text-sm w-4/5"
          />
          <button
            class="bg-everly-main text-white rounded-lg shadow-md text-xs sm:text-sm py-3 w-1/5"
          >
            확인
          </button>
        </div>
      </div>

      <div class="w-full py-0 p-2 flex-none">
        <div
          class="text-everly-dark_grey mt-2 sm:mt-5 border-[1px] px-3 py-2 rounded-lg border-everly-mid_grey"
        >
          <div class="flex items-center w-full">
            <img
              src="@/assets/icon/check_circle.svg"
              alt=""
              class="pr-2 w-6 h-6"
            />
            <div class="text-xs flex-1">전체 동의</div>
          </div>
        </div>
        <div class="text-everly-dark_grey pt-0">
          <div class="px-4 py-1">
            <contractVue
              v-for="contract in contractList"
              key="contract"
              class="py-1"
              :data="contract"
            />
          </div>
        </div>
      </div>

      <div class="flex-grow"></div>
      <div
        class="flex-none grid gap-2 place-items-center h-24 sm:mb-5 w-full sm:static"
      >
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
