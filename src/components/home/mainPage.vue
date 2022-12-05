<template>
  <BannerWeb class="hidden md:block" />
  <BannerMobile class="block md:hidden" />
  <div class="flex w-full z-0">
    <div class="flex-grow"></div>
    <div class="flex-none w-full md:w-[1180px] bg-[#f0f0f0] md:bg-white pt-6">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 px-3 md:px-0"
        v-show="!storeShowFilter_mobile"
      >
        <div
          v-for="card in cards"
          class="border rounded-xl shadow-md md:shadow-none bg-white"
        >
          <ProductCard :card="card" />
        </div>

        <VueEternalLoading :load="load">
          <template #loading>
            <div class="w-full flex justify-center">
              <spinner v-if="infiniteStatus" />
            </div> </template
        ></VueEternalLoading>
      </div>
      <div
        class="w-full justify-center items-center flex p-4 cursor-default"
        v-if="!infiniteStatus"
      >
        <div
          class="rounded-lg py-1 md:py-3 px-3 md:px-10 flex text-everly-drak_grey bg-everly-white text-sm md:text-base shadow-none md:shadow-xl border border-black md:border"
          @click="toggleInfiniteStatus(true)"
        >
          <span class="pr-2">전체보기</span
          ><img src="@/assets/icon/plus_grey.svg" alt="" />
        </div>
      </div>

      <!--  하단 배너 -->
      <div class="md:mt-12 mt-2">
        <div class="grid-cols-3 gap-4 flex-grow w-full hidden md:grid">
          <div
            class="bg-green-100 w-[373px] h-[140px] flex justify-center items-center h-full"
          >
            373*140px 하단 배너
          </div>
          <div
            class="bg-yellow-100 w-[373px] h-[140px] flex justify-center items-center h-full"
          >
            373*140px 하단 배너
          </div>
          <div
            class="bg-red-100 w-[373px] h-[140px] flex justify-center items-center h-full"
          >
            373*140px 하단 배너
          </div>
        </div>
        <div class="grid md:hidden grid-cols-1 gap-0 flex-grow w-full">
          <div
            class="bg-green-100 flex justify-center items-center h-full w-full h-[65px]"
          >
            w:100% x h 65px
          </div>
          <div
            class="bg-yellow-100 flex justify-center items-center h-full w-full h-[65px]"
          >
            w:100% x h 65px
          </div>
          <div
            class="bg-red-100 flex justify-center items-center h-full w-full h-[65px]"
          >
            w:100% x h 65px
          </div>
        </div>
      </div>
      <!-- 협력사 -->

      <div
        class="grid grid-cols-1 divide-y py-10 w-screen left-0 absolute hidden md:block"
      >
        <div></div>
        <div></div>
      </div>

      <div class="md:mt-14 bg-white md:pb-4 py-2">
        <Carousel :settings="settings" :breakpoints="breakpoints">
          <Slide v-for="slide in 30" :key="slide">
            <div
              class="carousel__item bg-everly-light_grey w-[100px] h-[50px] text-sm md:text-base md:w-[132px] md:h-[60px] flex justify-center items-center h-full text-everly-mid_grey"
            >
              <div>logo{{ slide }}</div>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
      <FooterMobile class="block md:hidden" />
    </div>
    <div class="flex-grow"></div>
  </div>
</template>

<script setup lang="ts">
import BannerWeb from "@/components/home/components/banner/bannerWeb.vue";
import BannerMobile from "@/components/home/components/banner/bannerMobile.vue";
import ProductCard from "./components/cards/productCard.vue";
import { useFilterStore } from "@/store/modules/home/filterStore";
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store/modules/home/mainStore";
import { VueEternalLoading } from "@ts-pro/vue-eternal-loading";
import spinner from "@/components/common/spinner.vue";
import type { LoadAction } from "@ts-pro/vue-eternal-loading";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import FooterMobile from "../footer/footerMobile.vue";

const filterStore = useFilterStore();
const { storeShowFilter_mobile } = storeToRefs(filterStore);

const mainStore = useMainStore();
const { storeProductCard } = storeToRefs(mainStore);

const cards = storeProductCard;

// Infinite scroll on off
let infiniteStatus = false;
function toggleInfiniteStatus(status: boolean) {
  console.log(123);
  infiniteStatus = status;
}

// 무한 스크롤 동작
function load({ loaded }: LoadAction) {
  if (infiniteStatus) {
    console.log("it works?");
    mainStore.setstoreProductCard();
  }

  loaded();
}

//carousel
const settings = {
  itemsToShow: 4,
  snapAlign: "center",
};
const breakpoints = {
  // 700px and up
  768: {
    itemsToShow: 8,
    snapAlign: "start",
  },
};
</script>

<style scoped></style>
