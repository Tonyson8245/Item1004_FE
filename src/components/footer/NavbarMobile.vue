<template>
  <div class="text-center w-full">
    <div
      class="text-center text-xs sm:text-sm text-everly-dark_grey cursor-pointr w-full h-14 sm:h-16 grid grid-cols-3 border-t bg-everly-white"
    >
      <div class="flex flex-col justify-center items-center">
        <img src="@/assets/icon/chat_mobile.svg" class="mt-1" alt="" />
        <div>채팅</div>
      </div>
      <div
        class="flex flex-col justify-center items-center bg-everly-light_blue"
        @click="router.push('/home')"
        v-if="route.meta.name == `home`"
      >
        <img src="@/assets/icon/home_blue_mobile.svg" class="mt-1" alt="" />
        <div class="text-everly-main">홈</div>
      </div>
      <div
        class="flex flex-col justify-center items-center"
        @click="router.push('/home')"
        v-else
      >
        <img src="@/assets/icon/home_grey_mobile.svg" class="mt-1" alt="" />
        <div class="text-everly-main">홈</div>
      </div>

      <div class="flex flex-col justify-center items-center">
        <img src="@/assets/icon/mypage_mobile.svg" class="mt-1" alt="" />
        <div>마이페이지</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
//라우터 생성
const router = useRouter();
const route = useRoute();
</script>

<style scoped></style>
