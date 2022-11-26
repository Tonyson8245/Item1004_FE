<template>
  <div class="h-screen flex-grow sm:flex">
    <div class="grid place-items-center w-full sm:m-auto">
      <div class="hidden sm:block">
        <img class="w-36" src="@/assets/icon/logo_mobile.svg" alt="" />
      </div>
      <div
        class="text-left p-1 mt-20 sm:mt-5 w-11/12 sm:font-bold text-everly-main text-sm sm:text-lg"
      >
        본인인증
      </div>

      <div class="grid gap-2 place-items-center w-11/12 mt-2">
        <div class="w-full">
          <div class="p-1 pr-0 flex items-center">
            <dropdown animation="fade" color="white" class="pr-2"></dropdown>
            <input
              type="email"
              placeholder="휴대 전화번호 입력('-'제외)"
              class="flex-1 appearance-none mr-2 rounded-lg border border-mid_grey bg-white py-3 px-4 sm:px-0 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs sm:text-sm"
            />
            <button
              class="bg-everly-main text-white rounded-lg shadow-md p-3 text-xs sm:text-sm"
            >
              인증번호 전송
            </button>
          </div>
          <div class="p-1 pr-0 flex items-center">
            <input
              type="email"
              placeholder="인증 번호 6자리를 입력하세요"
              class="flex-1 appearance-none mr-2 rounded-lg border border-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs sm:text-sm"
            />
            <button
              class="bg-everly-main text-white rounded-lg shadow-md p-3 text-xs sm:text-sm"
            >
              인증번호 확인
            </button>
          </div>
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
<script lang="ts" setup>
import dropdown from "@/components/common/dropdown.vue";
// import { userMq } from "vue-mq"; // 반응형 값 변경 시도하다가 포기
</script>

<style scoped></style>
