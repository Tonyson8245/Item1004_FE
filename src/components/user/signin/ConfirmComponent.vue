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

      <div class="grid gap-2 place-items-center mt-2 w-full p-1">
        <div class="pr-0 flex items-center w-11/12">
          <div class="flex w-4/5 mr-1">
            <dropdown animation="fade" color="white" class="pr-1"></dropdown>
            <input
              placeholder="휴대 전화번호 입력('-'제외)"
              class="rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs sm:text-sm w-full"
            />
          </div>
          <button
            class="bg-everly-main text-white rounded-lg shadow-md text-xs sm:text-sm py-3 w-1/5"
          >
            {{ buttonContent }} 전송
          </button>
        </div>
        <div class="pr-0 flex items-center w-11/12">
          <input
            placeholder="인증 번호 6자리를 입력하세요"
            class="mr-1 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs sm:text-sm w-4/5"
          />
          <button
            class="bg-everly-main text-white rounded-lg shadow-md text-xs sm:text-sm py-3 w-1/5"
          >
            {{ buttonContent }} 확인
          </button>
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
import { useMediaQuery } from "@vueuse/core";
import { computed, watch, ref } from "vue";
// import { userMq } from "vue-mq"; // 반응형 값 변경 시도하다가 포기

let buttonContent = ref("");

let isLargeScreen = computed(() => useMediaQuery("(min-width: 1024px)"));

watch(isLargeScreen.value, () => {
  if (isLargeScreen.value.value) buttonContent.value = "인증번호";
  else buttonContent.value = "";
});
</script>

<style scoped></style>
