<template>
  <!-- <Test /> -->
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
            <div v-if="storeinfiniteStatus">
              <div class="flex w-full hidden md:block">
                <div class="w-[1180px] flex justify-center pl-2 pb-3">
                  <spinner />
                </div>
              </div>
              <div class="block md:hidden w-full text-center">
                <div class="inline-block"><spinner /></div>
              </div>
            </div>
            <div v-else></div></template
        ></VueEternalLoading>
      </div>
      <div
        class="w-full justify-center items-center flex p-4 cursor-default"
        v-if="!storeinfiniteStatus"
      >
        <div
          class="rounded-lg py-1 md:py-3 px-3 md:px-10 flex text-everly-drak_grey bg-everly-white text-sm md:text-base shadow-none md:shadow-xl border border-black md:border-none"
          @click="toggleInfiniteStatus(true)"
        >
          <span class="pr-2">전체보기</span
          ><img src="@/assets/icon/plus_grey.svg" alt="" />
        </div>
      </div>

      <div
        class="hidden md:block flex fixed bottom-10"
        v-if="storeinfiniteStatus"
      >
        <div class="flex-grow"></div>
        <div class="flex-none w-[1180px]">
          <div class="absolute right-0 bottom-0">
            <img
              @click="scrollToTop"
              src="@/assets/icon/button_goup.svg"
              alt=""
              class="w-[55px] h-[55px] inline-block"
            />
          </div>
        </div>
        <div class="flex-grow"></div>
      </div>

      <!--  하단 배너 -->
      <div
        class="md:mt-12 mt-2"
        v-if="!storeinfiniteStatus && !storeShowFilter_mobile"
      >
        <div class="grid-cols-3 gap-4 flex-grow w-full hidden md:grid">
          <div
            class="bg-green-100 w-[373px] h-[140px] flex justify-center items-center h-full"
          >
            <img src="@/assets/img/bottomBanner_web1.jpeg" alt="" />
          </div>
          <div
            class="bg-yellow-100 w-[373px] h-[140px] flex justify-center items-center h-full"
          >
            <img src="@/assets/img/bottomBanner_web2.jpg" alt="" />
          </div>
          <div
            class="bg-red-100 w-[373px] h-[140px] flex justify-center items-center h-full"
          >
            <img src="@/assets/img/bottomBanner_web3.jpg" alt="" />
          </div>
        </div>
        <div class="grid md:hidden grid-cols-1 gap-0 flex-grow w-full">
          <div class="flex justify-center items-center h-full w-full">
            <img
              src="@/assets/img/banner_footer_mobile1.jpg"
              alt=""
              class="w-full"
            />
          </div>
          <div class="flex justify-center items-center h-full w-full">
            <img
              src="@/assets/img/banner_footer_mobile2.jpg"
              alt=""
              class="w-full"
            />
          </div>
          <div class="flex justify-center items-center h-full w-full">
            <img
              src="@/assets/img/banner_footer_mobile3.jpg"
              alt=""
              class="w-full"
            />
          </div>
        </div>
      </div>
      <!-- 협력사 -->

      <div
        class="grid grid-cols-1 divide-y py-10 w-screen left-0 fixed hidden md:block"
        v-if="!storeinfiniteStatus"
      >
        <div></div>
        <div></div>
      </div>

      <div
        class="md:mt-14 bg-white md:pb-10 py-2"
        v-if="!storeinfiniteStatus && !storeShowFilter_mobile"
      >
        <Carousel :settings="settings" :breakpoints="breakpoints">
          <Slide v-for="slide in 5" :key="slide">
            <div
              class="carousel__item w-[100px] h-[50px] text-sm md:text-base md:w-[132px] md:h-[60px] flex justify-center items-center h-full text-everly-mid_grey"
            >
              <div>
                <!-- <img :src="`/assets/img/logo/${slide}.jpg`" alt="" /> -->
                <img :src="`/assets/img/logo/${slide}.jpg`" alt="" />
              </div>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>

      <FooterMobile
        class="block md:hidden"
        v-if="!storeinfiniteStatus && !storeShowFilter_mobile"
      />
    </div>
    <div class="flex-grow"></div>

    <!-- 맨위로 모바일-->

    <!-- 모바일 글작성 -->
    <div class="block md:hidden bottom-20 w-full fixed z-20">
      <div class="flex justify-end">
        <img
          src="@/assets/icon/button_write_mobile.svg"
          alt=""
          @click="moveLink('/write')"
        />
      </div>
      <div
        class="block md:hidden flex justify-center absolute w-full top-7"
        v-if="storeinfiniteStatus"
      >
        <div @click="scrollToTop">
          <div><img src="@/assets/icon/button_gotop_mobile.svg" alt="" /></div>
        </div>
      </div>
    </div>
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
import { useRouter } from "vue-router";
import Test from "../common/ChargeModal.vue";

// router에 emit이 있어서 warning에 뜨는 데, 이를 없애기 위한 emit
const emit = defineEmits([`goPay`]);
function goPay() {}

//로고
function getImageUrl(path: any) {
  return new URL(path).href;
}

const router = useRouter();
const filterStore = useFilterStore();
const { storeShowFilter_mobile } = storeToRefs(filterStore);

const mainStore = useMainStore();
const { storeProductCard, storeinfiniteStatus } = storeToRefs(mainStore);

const cards = storeProductCard;

// Infinite scroll on off
function toggleInfiniteStatus(status: boolean) {
  mainStore.setstoreinfiniteStatus(true);
}

// 무한 스크롤 동작
function load({ loaded }: LoadAction) {
  if (storeinfiniteStatus.value) {
    console.log("it works?");
    mainStore.setstoreProductCard();
  }

  loaded();
}

//carousel
const settings = {
  itemsToShow: 3,
  snapAlign: "center",
};
const breakpoints = {
  // 700px and up
  768: {
    itemsToShow: 5,
    snapAlign: "start",
  },
};

//위로 올라가는 함수
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function moveLink(link: string) {
  router.push(link);
}

// 페이지 벗어날때 초기화 할경우
// onBeforeUnmount(() => {
//   mainStore.resetsetstoreProductCard();
//   mainStore.setstoreinfiniteStatus(false);
// });
</script>

<style scoped></style>
