<template>
  <div class="h-screen flex-grow sm:flex">
    <div class="grid place-items-center w-full sm:m-auto">
      <div class="hidden sm:block">
        <img class="w-36" src="@/assets/icon/logo_mobile.svg" alt="" />
      </div>
      <div
        class="text-left p-1 mt-20 sm:mt-5 w-11/12 sm:font-bold text-everly-main text-sm sm:text-lg"
      >
        계정정보
      </div>

      <div class="grid gap-2 place-items-center w-11/12 mt-2 pt-1">
        <div class="flex items-center w-full relactive">
          <input
            placeholder="아이디"
            class="flex-1 rounded-lg border border-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs sm:text-sm"
          />
          <div class="absolute right-10">
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
        <div class="flex items-center w-full">
          <input
            placeholder="비밀번호"
            class="flex-1 rounded-lg border border-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs sm:text-sm"
          />
          <img
            src="@/assets/icon/eyes_open.svg"
            class="w-5 h-5 absolute right-10"
            alt=""
          />
        </div>
        <div class="flex items-center w-full">
          <input
            placeholder="비밀번호 확인"
            class="flex-1 rounded-lg border border-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs sm:text-sm"
          />
          <img
            src="@/assets/icon/eyes_open.svg"
            class="w-5 h-5 absolute right-10"
            alt=""
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

const overlap = ref(false);
</script>

<style scoped></style>
