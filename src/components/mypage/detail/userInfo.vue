<template>
  <div class="py-5 md:py-0 md:pl-8">
    <div class="hidden md:block text-xl font-bold pb-8">
      <div class="pb-8">회원 정보수정</div>
      <hr class="border-everly-dark_grey hidden md:block" />
    </div>
    <div class="px-5 md:px-0">
      <div class="font-bold md:text-lg pb-4 md:pb-8">기본정보</div>

      <div class="w-full md:w-[39.25rem] space-y-2 md:space-y-5">
        <div class="flex text-sm md:text-base">
          <div class="font-bold w-[5.5rem] md:w-[10rem]">이름</div>
          <div class="md:w-[25rem]">김철수</div>
        </div>
        <div class="flex text-sm md:text-base">
          <div class="font-bold w-[5.5rem] md:w-[10rem]">아이디</div>
          <div class="md:w-[25rem]">item1004</div>
        </div>
        <div class="flex text-sm md:text-base">
          <div class="font-bold w-[5.5rem] md:w-[10rem]">추천인코드</div>
          <div class="flex md:w-[25rem]">
            #A2379F56GH
            <img
              src="@/assets/icon/copy_grey.svg"
              alt=""
              class="ml-2"
              @click="copy(`#A2379F56GH`)"
            />
          </div>
        </div>
        <div class="flex text-sm md:text-base items-center">
          <div class="font-bold w-[5.5rem] md:w-[10rem]">새 비밀번호</div>
          <div class="flex-1 md:w-[25rem]">• • • • • • • • •</div>
          <div
            class="text-xs whitespace-nowrap text-everly-dark_grey rounded-lg border py-1 px-2 bg-everly-white md:px-5 cursor-pointer"
          >
            수정
          </div>
        </div>
      </div>
    </div>
    <hr class="border-everly-light_grey my-4 md:my-8" />
    <div class="px-5 md:px-0 space-y-2 md:space-y-5 md:w-[39.25rem]">
      <div class="md:flex w-full md:pb-3">
        <div class="font-bold pb-2 md:pb-0 md:w-[10rem] md:text-xl">
          프로필 설정
        </div>
        <div
          class="flex text-everly-dark_grey text-xs space-x-2 items-center hidden md:flex"
        >
          <img
            src="@/assets/icon/exclamation_circle_grey.svg"
            alt=""
            class="md:w-3"
          />
          <div>프로필 설정 시 다른 사람들이 날 알아보기 더 쉬워져요!</div>
        </div>
      </div>
      <div class="flex items-center">
        <div class="font-bold w-[5.5rem] md:w-[10rem] hidden md:block">
          프로필이미지
        </div>
        <div class="flex-1 md:w-[25rem]">
          <div
            class="bg-everly-mid_grey rounded-lg w-16 h-16 md:w-16 md:h-16"
          ></div>
        </div>
        <div
          class="text-xs whitespace-nowrap text-everly-dark_grey rounded-lg border py-1 px-2 bg-everly-white md:px-5 cursor-pointer"
        >
          수정
        </div>
      </div>
      <div class="flex items-center text-sm md:text-base">
        <div class="font-bold w-[5.5rem] md:w-[10rem]">닉네임</div>
        <div class="flex-1 md:w-[25rem]">아이템천사7654</div>
        <div
          class="text-xs whitespace-nowrap text-everly-dark_grey rounded-lg border py-1 px-2 bg-everly-white md:px-5 cursor-pointer"
        >
          수정
        </div>
      </div>
    </div>
    <hr class="border-everly-light_grey my-4 md:my-8" />
    <div class="px-5 md:px-0 space-y-2 md:space-y-5 md:w-[39.25rem]">
      <div class="md:flex w-full md:pb-3">
        <div class="font-bold pb-2 md:pb-0 md:w-[10rem] md:text-xl">
          내 인증 현황
        </div>
        <div
          class="flex text-everly-dark_grey text-xs space-x-2 items-center hidden md:flex"
        >
          <img
            src="@/assets/icon/exclamation_circle_grey.svg"
            alt=""
            class="md:w-3"
          />
          <div>
            세 가지 인증을 모두 받으면 닉네임 옆에 파란 마크가 표시돼요!
          </div>
        </div>
      </div>
      <div class="flex items-center text-sm md:text-base">
        <div class="font-bold hidden sm:w-[5.5rem] md:w-[10rem] sm:block">
          핸드폰번호
        </div>
        <div class="flex-1 md:w-[25rem] flex items-center">
          010-1234-5678
          <img
            src="@/assets/icon/check_circle_blue.svg"
            alt=""
            class="w-4 ml-2"
          />
        </div>
        <div
          class="text-xs whitespace-nowrap text-everly-dark_grey rounded-lg border py-1 px-2 bg-everly-white md:px-5 cursor-pointer"
        >
          수정
        </div>
      </div>
      <div class="flex items-center text-sm md:text-base">
        <div class="font-bold hidden sm:w-[5.5rem] md:w-[10rem] sm:block">
          이메일
        </div>
        <div class="flex-1 md:w-[25rem] flex items-center">
          {{ contentEmail }}
          <img
            src="@/assets/icon/check_circle_blue.svg"
            alt=""
            class="w-4 ml-2"
            v-if="storeverifiedEmail"
          />
        </div>
        <div
          class="text-xs whitespace-nowrap text-everly-dark_grey rounded-lg border py-1 px-2 bg-everly-white md:px-5 cursor-pointer"
        >
          {{ buttonContent(storeverifiedEmail) }}
        </div>
      </div>
      <div class="flex items-center text-sm md:text-base">
        <div class="font-bold hidden sm:w-[5.5rem] md:w-[10rem] sm:block">
          출금계좌
        </div>
        <div class="flex-1 md:w-[25rem] flex items-center">
          <div
            class="bg-everly-main rounded-lg text-everly-white text-xs md:text-sm p-0.5 px-1 mr-2"
            v-if="storeverifiedBankAccount"
          >
            우리은행
          </div>
          <div class="md:flex">
            <div class="pr-2">{{ contentBankAccount }}</div>
            <span v-if="!storeverifiedBankAccount" class="text-everly-dark_grey"
              >(본인계좌 등록만 가능)</span
            >
          </div>
          <img
            src="@/assets/icon/check_circle_blue.svg"
            alt=""
            class="w-4 ml-2"
            v-if="storeverifiedBankAccount"
          />
        </div>
        <div
          class="text-xs whitespace-nowrap text-everly-dark_grey rounded-lg border py-1 px-2 bg-everly-white md:px-5 cursor-pointer"
        >
          {{ buttonContent(storeverifiedBankAccount) }}
        </div>
      </div>
    </div>
    <hr class="border-everly-light_grey my-4 md:my-8" />
    <div class="px-5 pt-1 block md:hidden text-everly-dark_grey font-bold">
      로그아웃
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useClipboard } from "@vueuse/core";

const { copy } = useClipboard({});

const storeverifiedEmail = ref(false);
const storeverifiedBankAccount = ref(true);

const contentEmail = computed(() => {
  if (!storeverifiedEmail.value) return `이메일 인증을 해주세요.`;
  else return `item1004@naver.com`;
});
const contentBankAccount = computed(() => {
  if (!storeverifiedBankAccount.value) return `출금계좌 인증을 해주세요.`;
  else return `120502-161-093136`;
});

const buttonContent = (status: boolean) => {
  if (status) return `수정`;
  else return `등록`;
};
</script>

<style scoped></style>
