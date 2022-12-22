<template>
  <div class="h-screen flex-grow md:flex">
    <modalSmall
      :propsShowModal="showModal"
      :propsButtonText="`확인`"
      :propsContentText="contentText"
      :propsLink="``"
      @update:propsShowModal="toggle()"
    />
    <div class="grid place-items-center w-full md:m-auto">
      <div class="hidden md:block">
        <img class="w-36" src="@/assets/icon/logo_mobile.svg" alt="" />
      </div>
      <div
        class="text-left mt-20 md:mt-5 w-full px-6 md:text-center font-bold sm"
      >
        <div class="text-2xl md:text-[30]">아이디를 잊으셨나요?</div>
        <div class="text-lg md:text-[28]">걱정 마세요. 금방 찾아드릴게요!</div>
      </div>

      <div class="grid gap-2 place-items-center w-11/12 mt-8 md:mt-16">
        <div class="w-full">
          <div class="p-1 pr-0 flex items-center">
            <input
              placeholder="휴대 전화번호 입력('-'제외)"
              class="flex-1 mr-2 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm"
            />
            <button
              class="bg-everly-main text-white rounded-lg shadow-md p-3 text-xs md:text-sm"
              @click="
                contentText = `인증번호가 발송되었습니다.`;
                toggle();
              "
            >
              인증번호 발송
            </button>
          </div>
          <div class="p-1 pr-0 flex items-center">
            <input
              placeholder="인증 번호 6자리를 입력하세요"
              class="flex-1 mr-2 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm"
            />
            <button
              class="bg-everly-main text-white rounded-lg shadow-md p-3 text-xs md:text-sm"
              @click="
                contentText = '인증번호가 확인되었습니다.';
                toggle();
              "
            >
              인증번호 확인
            </button>
          </div>
        </div>
      </div>

      <div class="grid p-1 gap-2 place-items-center w-full mt-4 md:mt-8">
        <button
          class="h-11 lg:h-15 px-6 py-2 rounded-lg text-sm text-everly-white bg-everly-main w-11/12"
          @click="moveLink('result')"
        >
          아이디 찾기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import modalSmall from "@/components/modal/modalSmall.vue";

import { ref } from "vue";
import { useToggle } from "@vueuse/shared";

import { useRouter } from "vue-router";

let link: string;
const router = useRouter();

function moveLink(type: string) {
  switch (type) {
    case "result":
      link = "/account/findid/result";
      break;
  }
  router.push(link);
}

const showModal = ref(false);
const toggle = useToggle(showModal);
const contentText = ``;
</script>

<style scoped></style>
