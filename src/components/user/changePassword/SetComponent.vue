<template>
  <div class="h-screen flex-grow md:flex">
    <modalSmall />
    <div class="grid place-items-center w-full md:m-auto">
      <div class="hidden md:block">
        <img class="w-36" src="@/assets/icon/logo_mobile.svg" alt="" />
      </div>
      <div class="text-left mt-20 md:mt-5 w-full px-6 md:text-center font-bold">
        <div class="text-2xl md:text-[30]">
          <span class="text-everly-main">item1004</span> 님의
        </div>
        <div class="text-lg md:text-[28]">새로운 비밀번호 만들기</div>
      </div>

      <div class="grid gap-3 place-items-center w-11/12 mt-20">
        <div class="flex items-center w-full relative">
          <input
            placeholder="새 비밀번호를 입력하세요"
            class="flex-1 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm"
          />
          <img
            src="@/assets/icon/eyes_close.svg"
            class="w-5 h-5 absolute right-5"
            alt=""
          />
        </div>
        <div class="flex items-center w-full relative">
          <input
            placeholder="새 비밀번호를 재확인"
            class="flex-1 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm"
          />
          <img
            src="@/assets/icon/eyes_open.svg"
            class="w-5 h-5 absolute right-5"
            alt=""
          />
        </div>
      </div>

      <div class="grid gap-2 place-items-center w-full mt-8 md:mt-8">
        <button
          @click="toggleModal"
          class="h-11 lg:h-15 px-6 py-2 rounded-lg text-base text-everly-white bg-everly-main w-11/12"
        >
          비밀번호 재설정
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import modalSmall from "@/components/common/modalSmall.vue";
import { useModal } from "@/store/modules/ui/modal";
import type { modalSetting } from "@/interface/ui/modal.interface";

const modalStore = useModal(); // 모달 store 가져오기
const set: modalSetting = {
  detail_content: "비밀번호 재설정이\n완료되었습니다",
  button_content: "로그인하기",
}; // 모달 내용 작성

const toggleModal = () => {
  modalStore.setModalSmall(set); // 모달 내용 저장하기
  modalStore.controlModalSmall(true); // 모달 상태 변경하여 저장하기
};
</script>

<style scoped></style>
