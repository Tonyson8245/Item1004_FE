<template>
  <div class="w-full cursor-pointer">
    <Carousel
      :autoplay="1000000"
      :wrap-around="true"
      class="w-full"
      @slide-start="handleSlideStart"
    >
      <Slide v-for="slide in 2" :key="slide">
        <div class="flex w-full">
          <div class="flex-grow" :class="bgColorClass(slide)"></div>
          <div class="flex-grow-none">
            <img
              :src="`/assets/img/banners/top_${slide}_desktop.jpg`"
              style="object-fit: none; height: auto; height: 440px"
            />
          </div>
          <div class="flex-grow" :class="bgColorClass(slide)"></div>
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
import { watch } from "vue";
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

const emit = defineEmits([`getColor`]);
const bgColorClass = (silde: number) => {
  if (silde == 1) return "bg-[#7900ac]";
  else return "bg-[#001839]";
};

const bgColorClass2 = (silde: number) => {
  if (silde == 2) return "bg-[#7900ac]";
  else return "bg-[#001839]";
};
function handleSlideStart(data: any) {
  var slide = data.slidingToIndex;
  emit("getColor", bgColorClass2(slide));
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
