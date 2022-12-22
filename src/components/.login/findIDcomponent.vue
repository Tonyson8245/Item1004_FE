<template>
  <div class="grid place-items-center w-full h-full flex-none">
    <div class="hidden sm:block">
      <img class="w-36" src="@/assets/icon/logo_mobile.svg" alt="" />
    </div>
    <div class="text-left sm:text-center">
      <div>아이디를 잊었다고요?</div>
      <div>걱정 마세요. 금방찾아드릴게요!</div>
    </div>

    <div class="grid gap-2 place-items-center w-11/12 mt-8 md:mt-16">
      <form action="#" class="w-full">
        <div class="p-1 pr-0 flex items-center">
          <input
            type="email"
            placeholder="휴대 전화번호 입력('-'제외)"
            class="flex-1 appearance-none mr-2 rounded-lg border border-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm"
          />
          <button
            type="submit"
            class="bg-everly-main text-white text-base rounded-lg shadow-md p-3 text-xs md:text-sm"
          >
            인증번호 발송
          </button>
        </div>
        <div class="p-1 pr-0 flex items-center">
          <input
            type="email"
            placeholder="휴대 전화번호 입력('-'제외)"
            class="flex-1 appearance-none mr-2 rounded-lg border border-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm"
          />
          <button
            type="submit"
            class="bg-everly-main text-white text-base rounded-lg shadow-md p-3 text-xs md:text-sm"
          >
            인증번호 확인
          </button>
        </div>
      </form>
    </div>

    <div class="grid gap-2 place-items-center w-full mt-4 md:mt-8">
      <button
        class="h-11 lg:h-15 px-6 py-2 rounded-md text-lg text-everly-white bg-everly-main w-11/12 hover:bg-everly-sub_blue"
      >
        아이디 찾기
      </button>
    </div>

    <div class="bg-red-300">12312</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
