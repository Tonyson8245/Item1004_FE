<template>
  <!-- <Test /> -->

  <BannerWeb class="hidden md:flex" />
  <BannerTablet class="hidden sm:flex md:hidden" />
  <BannerMobile class="flex sm:hidden" />

  <div class="flex">
    <div class="flex-1"></div>
    <div class="flex-none md:w-[73.75rem] w-full">
      <div class="hidden md:block mt-14">
        <img src="@/assets/img/banners/sale_giftCard_web.png" alt="" />
      </div>
      <div class="w-full flex justify-center my-8">
        <div class="flex space-x-5 md:space-x-24">
          <div
            class="flex justify-center flex-col items-center text-xs md:text-base"
          >
            <div
              class="bg-everly-light_blue rounded-full w-10 h-10 md:w-14 md:h-14 flex justify-center items-center mb-1"
            >
              <img
                src="@/assets/icon/gameTrade_blue.svg"
                alt=""
                srcset=""
                class="w-6 h-6 md:w-9 md:h-9 md:mt-2 md:ml-1"
              />
            </div>
            아이템거래
          </div>
          <div
            class="flex justify-center flex-col items-center text-xs md:text-base"
          >
            <div
              class="bg-everly-light_blue rounded-full w-10 h-10 md:w-14 md:h-14 flex justify-center items-center mb-1"
            >
              <img
                src="@/assets/icon/giftCardTrade_blue.svg"
                alt=""
                srcset=""
                class="w-6 h-6 md:w-9 md:h-9"
              />
            </div>
            상품권거래
          </div>
          <div
            class="flex justify-center flex-col items-center text-xs md:text-base"
          >
            <div
              class="bg-everly-light_blue rounded-full w-10 h-10 md:w-14 md:h-14 flex justify-center items-center mb-1"
            >
              <img
                src="@/assets/icon/myTrade.svg"
                alt=""
                srcset=""
                class="w-6 h-6 md:w-9 md:h-9"
              />
            </div>
            내거래
          </div>
          <div
            class="flex justify-center flex-col items-center text-xs md:text-base"
          >
            <div
              class="bg-everly-light_blue rounded-full w-10 h-10 md:w-14 md:h-14 flex justify-center items-center mb-1"
            >
              <img
                src="@/assets/icon/charge_blue.svg"
                alt=""
                srcset=""
                class="w-6 h-6 md:w-9 md:h-9"
              />
            </div>
            충전하기
          </div>
          <div
            class="flex justify-center flex-col items-center text-xs md:text-base"
          >
            <div
              class="bg-everly-light_blue rounded-full w-10 h-10 md:w-14 md:h-14 flex justify-center items-center mb-1"
            >
              <img
                src="@/assets/icon/withdraw_blue.svg"
                alt=""
                srcset=""
                class="w-6 h-6 md:w-9 md:h-9"
              />
            </div>
            출금하기
          </div>
        </div>
      </div>
      <div class="px-4 md:px-0">
        <span class="font-bold flex items-center">
          <img src="@/assets/icon/flame.svg" alt="" class="pb-1.5 pr-0.5" />
          인기거래</span
        >
        <div class="md:flex">
          <div v-for="card in cardQty">
            <mainCard />
          </div>
        </div>
      </div>
      <!-- 웹내용 -->
      <div class="hidden md:block">
        <div class="grid grid-cols-6 gap-10">
          <div class="col-span-4 bg-everly-light_grey">실시간 물품</div>
          <div class="col-span-2 bg-everly-light_grey">마일리지 충전</div>
          <div class="col-span-4 bg-everly-light_grey">동영상 컨텐츠</div>
          <div class="col-span-2 bg-everly-light_grey">마일리지 충전</div>
          <div class="col-span-3 bg-everly-light_grey">고객센터</div>
          <div class="col-span-3 bg-everly-light_grey">공지사항</div>
        </div>
      </div>
      <!-- 모바일 내용 -->
      <div class="md:hidden">
        <div>상품권판매시작</div>
        <div>포션퍼줄게</div>
        <div>공지사항</div>
        <div>
          <div>아이템천사 고객센터</div>
          <div>1:1 상담</div>
        </div>
      </div>

      <div>협력사들</div>
    </div>
    <div class="flex-1"></div>
  </div>
</template>

<script setup lang="ts">
import BannerWeb from "@/components/home/components/banner/bannerWeb.vue";
import BannerMobile from "@/components/home/components/banner/bannerMobile.vue";
import mainCard from "./components/cards/mainCard.vue";
import { useRouter } from "vue-router";
import { ref, computed, watch } from "vue";
import { useMediaQuery } from "@vueuse/core";
const router = useRouter();

const cardQty = ref(3);

const minSize = computed(() => {
  return useMediaQuery("(min-width: 640px)");
});
//화면이 작아지면 꺼지는 로직
watch(minSize.value, (minSize) => {
  if (!minSize) {
    //페이지가 모바일이되는 경우
    cardQty.value = 3;
  } else {
    cardQty.value = 10;
  }
});

//////배너
//carousel
const settings = {
  itemsToShow: 3,
  snapAlign: "start",
  autoplay: "2000",
};
const breakpoints = {
  // 700px and up
  768: {
    itemsToShow: 5,
    snapAlign: "start",
    autoplay: "0",
  },
};

//위로 올라가는 함수
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function scrollToTopinstant() {
  window.scrollTo({ top: 0, behavior: "auto" });
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

<style>
.carousel__icon {
  fill: lightgray !important;
}
</style>
