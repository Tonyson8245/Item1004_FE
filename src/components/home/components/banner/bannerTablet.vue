<template>
  <div class="cursor-pointer min-w-[640px] w-full h-[300px] mt-[6.7rem]">
    <Carousel :autoplay="5000" :wrap-around="true" class="w-full">
      <Slide v-for="slide in 4" :key="slide">
        <div class="flex w-full cursor-pointer" @click="moveLink(slide)">
          <div class="flex-grow"></div>
          <div class="flex-grow-none">
            <img
              :src="`/assets/img/banners/top_${slide}_tablet.jpeg`"
              style="object-fit: none; height: auto; height: 300px"
            />
          </div>
          <div class="flex-grow"></div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>
<script setup lang="ts">
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { isNotEmpty } from "class-validator";
import { moveExternalLink } from "@/common";
import { useRouter } from "vue-router";

const router = useRouter();
// 페이지 이동
function moveLink(slide: number) {
  if (slide == 1) {
    let link;
    // 로그인 되어있는 상태면 마이페이지의 마일리지 현황 페이지로 이동
    const localData = localStorage.getItem("user");
    if (isNotEmpty(localData)) link = "/mypage/mileage/overview";
    else link = "/account/signUp/confirm";
    router.push(link);
  } else if (slide == 2) {
    let link;
    // 로그인 되어있는 상태면 마이페이지의 마일리지 현황 페이지로 이동
    const localData = localStorage.getItem("user");
    if (isNotEmpty(localData)) link = "/mypage/mileage/overview";
    else link = "/account/signUp/confirm";
    router.push(link);
  } else if (slide == 3) {
    moveExternalLink("카카오채널");
  } else if (slide == 4) {
    let link;
    // 로그인 되어있는 상태면 마이페이지의 마일리지 현황 페이지로 이동
    const localData = localStorage.getItem("user");
    if (isNotEmpty(localData)) link = "/write";
    else link = "/account/signUp/confirm";
    router.push(link);
  }
}

//////배너
//carousel
</script>

<style scoped>
.carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style></style>
