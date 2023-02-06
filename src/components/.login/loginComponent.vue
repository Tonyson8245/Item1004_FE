<template>
  <div class="grid place-items-center w-full">
    <div class="">
      <img src="@/assets/icon/logo_mobile.svg" alt="" />
    </div>
    <!-- 19세 표시 주의 문구 -->
    <div class="flex px-5 mt-20  md:mt-16 md:px-6 items-center">
      <img class=" w-14 h-14" src="@/assets/icon/19.svg" alt="">
      <div class=" pl-2 text-sm md:text-base">
        본 정보 내용은 청소년 유해매체물로서 [정보통신망 이용촉진 및 정보보호 등에 관한 법률] 및 [청소년 보호법]에 따라 19세 미만의 청소년은 거래를 이용할 수 없습니다.
      </div>
    </div>

    <div class="grid gap-2 place-items-center w-full mt-8 md:mt-16">
      <input
        placeholder="아이디를 입력하세요"
        class="h-11 lg:h-15 w-11/12 appearance-none rounded-lg border border-mid_grey bg-white py-3 px-5 text-base text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md"
      />
      <input
        placeholder="비빌번호를 입력하세요"
        type="password"
        class="h-11 lg:h-15 w-11/12 appearance-none rounded-lg border border-mid_grey bg-white py-3 px-5 text-base text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md"
      />
    </div>

    <div class="grid gap-2 place-items-center w-full mt-4 md:mt-8">
      <button
        class="h-11 lg:h-15 px-6 py-2 rounded-lg text-lg text-everly-white bg-everly-main w-11/12 hover:bg-everly-sub_blue"
        @click="router.push('/')"
      >
        로그인
      </button>
      <div class="grid place-items-center w-full px-0 cursor-default">
        <div class="flex divide-x divide-[#707070]">
          <div class="text-center px-2 text-everly-dark_grey">
            <button class="text-sm">아이디 찾기</button>
          </div>
          <div class="text-center px-2 text-everly-dark_grey">
            <button class="text-sm">비밀번호 재설정</button>
          </div>
          <div class="text-center px-2 text-everly-dark_grey">
            <button class="text-sm">회원가입</button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mt-5 mb-1 md:mt-12">
      <div class="inline-flex justify-center items-center w-full">
        <hr class="md:invisible w-11/12 h-px bg-everly-mid_grey border-0" />
        <span
          class="invisible md:visible absolute left-1/2 px-3 text-sm text-everly-dark_grey -translate-x-1/2 bg-white md:bg-[#fafafa]"
          >SNS 계정으로 간편하게 진행하기</span
        >
        <span
          class="absolute left-1/2 px-3 text-sm text-everly-dark_grey -translate-x-1/2 md:invisible bg-white md:bg-[#fafafa]"
          >간편하게 진행하기</span
        >
      </div>
    </div>

    <div
      class="grid grid-cols-4 gap-3 w-full px-10 text-center text-xs md:text-sm sm:px-30"
    >
      <div>
        <img
          class="object-none object-center w-full"
          src="@/assets/icon/login_naver.svg"
        />
        <span class="text-everly-dark_grey visible md:invisible cursor-default"
          >네이버</span
        >
      </div>
      <div>
        <img
          src="@/assets/icon/login_kakao.svg"
          alt=""
          class="object-none object-center w-full"
        />
        <span class="text-everly-dark_grey visible md:invisible cursor-default"
          >카카오</span
        >
      </div>
      <div>
        <img
          src="@/assets/icon/login_google.svg"
          alt=""
          class="object-none object-center w-full"
        />
        <span class="text-everly-dark_grey visible md:invisible cursor-default"
          >구글</span
        >
      </div>
      <div>
        <img
          src="@/assets/icon/login_apple.svg"
          alt=""
          class="object-none object-center w-full"
        />
        <span class="text-everly-dark_grey visible md:invisible cursor-default"
          >애플</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped></style>
