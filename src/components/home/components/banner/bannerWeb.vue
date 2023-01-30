<template>
  <div class="w-full cursor-pointer">
    <Carousel :autoplay="1000000" :wrap-around="true" class="w-full">
      <Slide v-for="slide in 2" :key="slide">
        <div class="carousel__item crop">
          <img
            :src="`/assets/img/banners/top_${slide}_desktop.jpeg`"
            style="object-fit: none; height: auto; height: 440px"
          />
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
import router from "@/router";
import { isNotEmpty } from "class-validator";
// 페이지 이동
function moveLink(type: string) {
  let link = type;
  if (type == "signUp") {
    // 로그인 되어있는 상태면 마이페이지의 마일리지 현황 페이지로 이동
    const localData = localStorage.getItem("user");
    if (isNotEmpty(localData)) link = "/mypage/mileage/overview";
    else link = "/account/signUp/confirm";
  }
  router.push(link);
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

<style>
.carousel__icon {
  fill: white !important;
}
</style>
