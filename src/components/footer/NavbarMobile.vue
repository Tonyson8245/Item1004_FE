<template>
  <div class="text-center w-full">
    <div
      class="text-center text-xs sm:text-sm text-everly-dark_grey cursor-pointr w-full h-14 sm:h-16 grid grid-cols-3 border-t bg-everly-white"
    >
      <div 
        class="flex flex-col justify-center items-center"
        :class="chatBackground"
        @click="router.push('/chat')"
      >
        <img
          :src="`/assets/icon/${chatIcon}.svg`"
          class="mt-1"
          alt=""
        />
        <div :class="chatClass">채팅</div>
      </div>
      <div
        class="flex flex-col justify-center items-center"
        :class="homeBackground"
        @click="router.push('/home')"
      >
        <!-- <img :src="`/src/assets/icon/${homeIcon}.svg`" class="mt-1" alt="" /> -->
        <img :src="`/assets/icon/${homeIcon}.svg`" class="mt-1" alt="" />
        <div :class="homeClass">홈</div>
      </div>
      <div
        class="flex flex-col justify-center items-center"
        :class="mypageBackground"
        @click="router.push('/mypage')"
      >
        <!-- <img :src="`/src/assets/icon/${mypageIcon}.svg`" class="mt-1" alt="" /> -->
        <img :src="`/assets/icon/${mypageIcon}.svg`" class="mt-1" alt="" />
        <div :class="mypageClass">마이페이지</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
//라우터 생성
const router = useRouter();
const route = useRoute();

//홈버튼 색 변경
const homeClass = computed(() => {
  if (route.meta.name == "home") return "text-everly-main";
  else return "text-everly-black";
});
const homeIcon = computed(() => {
  if (route.meta.name == "home") return "home_blue_mobile";
  else return "home_grey_mobile";
});
const homeBackground = computed(() => {
  if (route.meta.name == "home") return "bg-everly-light_blue";
  else return "bg-everly-white";
});

//마이페이지버튼 색 변경
const mypageClass = computed(() => {
  if (route.meta.name == "mypage") return "text-everly-main";
  else return "text-everly-black";
});
const mypageIcon = computed(() => {
  if (route.meta.name == "mypage") return "mypage_blue";
  else return "mypage_grey";
});
const mypageBackground = computed(() => {
  if (route.meta.name == "mypage") return "bg-everly-light_blue";
  else return "bg-everly-white";
});


//채팅 버튼 색 변경
const chatClass = computed(() => {
  if (route.meta.name == "chat") return "text-everly-main";
  else return "text-everly-black";
});
const chatIcon = computed(() => {
  if (route.meta.name == "chat") return "chat_mobile_blue";
  else return "chat_mobile";
});
const chatBackground = computed(() => {
  if (route.meta.name == "chat") return "bg-everly-light_blue";
  else return "bg-everly-white";
});
</script>

<style scoped></style>
