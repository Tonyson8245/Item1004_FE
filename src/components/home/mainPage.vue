<template>
  <!-- <Test /> -->

  <BannerWeb class="hidden md:flex" />
  <BannerTablet class="hidden sm:flex md:hidden" />
  <BannerMobile class="flex sm:hidden" />

  <div class="flex w-full z-0">
    <div class="flex-grow"></div>
    <div
      class="flex-none w-full md:w-[1180px] bg-[#f0f0f0] md:bg-white pt-6 md:min-h-none min-h-[30rem]"
    >
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 px-3 md:px-0"
        v-show="!storeShowFilter_mobile"
      >
        <div
          v-for="card in storeProductCard"
          class="border rounded-xl shadow-md md:shadow-none bg-white"
        >
          <ProductCard :card="card" />
        </div>
        <VueEternalLoading
          :load="load"
          v-if="storeinfiniteStatus && storehasnextPage"
        >
          <template #loading> <div></div></template
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

      <div class="hidden md:flex fixed bottom-10 z-50">
        <div class="flex-grow"></div>
        <div class="flex-none w-[1180px]">
          <div
            class="absolute right-0 bottom-0 flex-col flex items-center justify-center gap-y-2"
          >
            <img
              @click="moveExternalLink('블로그')"
              src="@/assets/icon/noti_blog.png"
              alt=""
              class="w-[45px] h-[45px] inline-block cursor-pointer"
            />
            <img
              @click="moveExternalLink('카카오채널')"
              src="@/assets/icon/goto_kakao.svg"
              alt=""
              class="w-[45px] h-[45px] inline-block cursor-pointer"
            />
            <img
              v-if="storeinfiniteStatus"
              @click="scrollToTop"
              src="@/assets/icon/button_goup.svg"
              alt=""
              class="w-[45px] h-[45px] inline-block cursor-pointer"
            />
          </div>
        </div>
        <div class="flex-grow"></div>
      </div>

      <!--  하단 배너 -->
      <!-- TODO 1차 수정 2023-01-30 11:16:42 -->
      <!-- <div
        class="md:mt-12 mt-2"
        v-if="!storeinfiniteStatus && !storeShowFilter_mobile"
      > -->
      <div class="md:mt-12 mt-2" v-if="!storeShowFilter_mobile">
        <!-- 웹 -->
        <div class="grid-cols-3 gap-4 flex-grow w-full hidden md:grid">
          <div
            class="bg-green-100 w-[373px] flex justify-center items-center h-full"
          >
            <img
              src="@/assets/img/banners/bottom_1_desktop.jpeg"
              alt=""
              @click="moveExternalLink('유튜브')"
            />
          </div>
          <div
            class="bg-yellow-100 w-[373px] flex justify-center items-center h-full"
          >
            <img
              src="@/assets/img/banners/bottom_2_desktop.jpeg"
              alt=""
              @click="moveExternalLink('인스타')"
            />
          </div>
          <div
            class="bg-red-100 w-[373px] flex justify-center items-center h-full"
          >
            <img
              src="@/assets/img/banners/bottom_3_desktop.jpeg"
              alt=""
              @click="moveExternalLink('카페')"
            />
          </div>
        </div>
        <!-- 태블릿 -->
        <div
          class="grid-cols-1 gap-0 flex-grow w-full hidden sm:grid md:hidden"
        >
          <div
            class="bg-green-100 flex justify-center items-center h-full flex-grow"
          >
            <img
              src="@/assets/img/banners/bottom_1_tablet.jpeg"
              alt=""
              @click="moveExternalLink('유튜브')"
            />
          </div>
          <div
            class="bg-yellow-100 flex justify-center items-center h-full flex-grow"
          >
            <img
              src="@/assets/img/banners/bottom_2_tablet.jpeg"
              alt=""
              @click="moveExternalLink('인스타')"
            />
          </div>
          <div
            class="bg-red-100 flex justify-center items-center h-full flex-grow"
          >
            <img
              src="@/assets/img/banners/bottom_3_tablet.jpeg"
              alt=""
              @click="moveExternalLink('카페')"
            />
          </div>
        </div>
        <!-- 모바일 -->
        <div class="grid sm:hidden grid-cols-1 gap-0 flex-grow w-full">
          <div
            class="flex justify-center items-center h-full w-full"
            @click="moveExternalLink('유튜브')"
          >
            <img
              src="@/assets/img/banners/bottom_1_mobile.jpeg"
              alt=""
              class="w-full"
            />
          </div>
          <div
            class="flex justify-center items-center h-full w-full"
            @click="moveExternalLink('인스타')"
          >
            <img
              src="@/assets/img/banners/bottom_2_mobile.jpeg"
              alt=""
              class="w-full"
            />
          </div>
          <div
            class="flex justify-center items-center h-full w-full"
            @click="moveExternalLink('카페')"
          >
            <img
              src="@/assets/img/banners/bottom_3_mobile.jpeg"
              alt=""
              class="w-full"
            />
          </div>
        </div>
      </div>
      <!-- 협력사 -->

      <div
        class="grid grid-cols-1 divide-y py-10 w-screen left-0 fixed md:block"
        v-if="!storeinfiniteStatus"
      >
        <div></div>
        <div></div>
      </div>

      <div
        class="md:mt-14 bg-white md:pb-14 py-2"
        v-if="!storeShowFilter_mobile"
      >
        <div class="hidden md:block">
          <Carousel :settings="settings" :breakpoints="breakpoints">
            <Slide v-for="slide in 8" :key="slide">
              <div
                class="carousel__item w-[100px] h-[50px] text-sm md:text-base md:w-[132px] md:h-[60px] flex justify-center items-center text-everly-mid_grey"
              >
                <div>
                  <!-- <img :src="`/assets/img/logo/${slide}.jpg`" alt="" /> -->
                  <img :src="`/assets/img/logo/${slide - 1}.png`" alt="" />
                </div>
              </div>
            </Slide>
            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div>
        <div class="md:hidden">
          <Carousel :settings="settings" :breakpoints="breakpoints">
            <Slide v-for="slide in 8" :key="slide">
              <div
                class="carousel__item w-[100px] h-[50px] text-sm md:text-base md:w-[132px] md:h-[60px] flex justify-center items-center text-everly-mid_grey"
              >
                <div>
                  <!-- <img :src="`/assets/img/logo/${slide}.jpg`" alt="" /> -->
                  <img :src="`/assets/img/logo/${slide - 1}.png`" alt="" />
                </div>
              </div>
            </Slide>
          </Carousel>
        </div>
      </div>

      <FooterMobile class="block md:hidden" v-if="!storeShowFilter_mobile" />
    </div>
    <div class="flex-grow"></div>

    <!-- 맨위로 모바일-->

    <!-- 모바일 글작성 -->
    <div class="block md:hidden bottom-20 w-full fixed" style="z-index: 2">
      <div class="flex justify-end">
        <div class="flex flex-col items-end justify-center gap-y-1 pr-2">
          <img
            src="@/assets/icon/noti_blog.png"
            alt=""
            class="w-[40px]"
            @click="moveExternalLink('블로그')"
          />
          <img
            src="@/assets/icon/goto_kakao.svg"
            alt=""
            class="w-[40px]"
            @click="moveExternalLink('카카오채널')"
          />
          <div
            class="flex items-center bg-everly-main rounded-full text-everly-white pr-3 text-sm"
          >
            <img
              src="@/assets/icon/button_write_mobile.svg"
              alt=""
              class="w-[35px]"
              @click="moveLink('/write')"
            />
            글 작성
          </div>
        </div>
      </div>
      <div
        class="md:hidden flex justify-center absolute w-full bottom-0"
        v-if="storeinfiniteStatus"
      >
        <div @click="scrollToTop">
          <img src="@/assets/icon/button_gotop_mobile.svg" alt="" />
        </div>
      </div>
    </div>

    <!-- 카카오 상담 버튼 -->
    <!-- <div @click="moveExternalLink('카카오문의')" class="hidden md:block fixed bottom-10 right-10">
      <button class=" rounded-full border flex flex-col items-center p-3 bg-yellow-200">
        <p>카톡</p>
        <p>1:1상담</p>      
      </button>
    </div> -->
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
import type { LoadAction } from "@ts-pro/vue-eternal-loading";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import FooterMobile from "../footer/footerMobile.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, watch, ref } from "vue";
import { getProductCardBodyDto } from "@/domain/home/getProductCardDto";
import { useSearchStore } from "@/store/modules/home/searchStore";
import BannerTablet from "./components/banner/bannerTablet.vue";
import { moveExternalLink } from "@/common";
import { useComponentStore } from "@/store/modules/common/componentStore";
import { useCookie } from "vue-cookie-next";
const { getCookie } = useCookie();

// router에 emit이 있어서 warning에 뜨는 데, 이를 없애기 위한 emit
const emit = defineEmits([`goPay`]);
function goPay() {}
const route = useRoute();
const router = useRouter();
const componentStore = useComponentStore();
const { storeshowNotify } = storeToRefs(componentStore);
//////조회 관련
const filterStore = useFilterStore();
const {
  storeShowFilter_mobile,
  filterStoreGameKeywordIdx,
  filterStoreServerKeywordIdx,
} = storeToRefs(filterStore); //  웹 필터 켜짐 여부
const mainStore = useMainStore();
const {
  storeProductCard,
  storeinfiniteStatus,
  storeNextPage,
  storehasnextPage,
  storeLoad,
} = storeToRefs(mainStore); // 거래들 정보, 무한 스크롤, 다음 가져옾 페이지 ,다음  페이지 여부
const searchStore = useSearchStore();
const { storeSellBuy } = storeToRefs(searchStore); //팔래요 살래요 정보

//처음 페이지 로드 될때 동작
onMounted(() => {
  mainStore.$reset();
  getProductList(6);

  //일단 다끔
  if (getCookie("noti") == "stop") {
    componentStore.setstoreshowNotify(false);
  } else {
    if (route.meta.name == "home") {
      componentStore.setstoreshowNotify(false);
    }
  }
});

// Infinite scroll on off
function toggleInfiniteStatus(status: boolean) {
  mainStore.setstoreinfiniteStatus(status);
}

// 무한 스크롤 동작
function load({ loaded }: LoadAction) {
  if (storeinfiniteStatus.value) {
    //이전 페이지가 로드 성공해서 새로운 페이지를 받을수 있는 상태일때 실행
    //다음 페이지가 있을때
    if (storehasnextPage.value) {
      var page = storeNextPage.value;
      var sellbuy = storeSellBuy.value;
      var categorys = filterStore.getCategorys;
      var gameIdx = filterStoreGameKeywordIdx.value;
      var serverIdx = filterStoreServerKeywordIdx.value;

      var payload = new getProductCardBodyDto(
        page,
        6,
        sellbuy,
        categorys,
        gameIdx,
        serverIdx
      );

      mainStore
        .setstoreProductCard(payload)
        .then((res) => {
          if (res) {
          } else console.log("loaded failed");
          loaded();
        })
        .catch(() => {});
    }
  }
}

function getProductList(pageUnit: number) {
  if (storehasnextPage.value) {
    var page = storeNextPage.value;
    var sellbuy = storeSellBuy.value;
    var categorys = filterStore.getCategorys;
    var gameIdx = filterStoreGameKeywordIdx.value;
    var serverIdx = filterStoreServerKeywordIdx.value;

    var payload = new getProductCardBodyDto(
      page,
      pageUnit,
      sellbuy,
      categorys,
      gameIdx,
      serverIdx
    );

    mainStore.setstoreProductCard(payload).then((res) => {});
  }
}

watch(storeLoad, () => {
  if (storeLoad.value) {
    console.log("watch load");
    scrollToTopinstant();
    toggleInfiniteStatus(true);
    mainStore.setstoreLoad(false);
  }
});
watch(storehasnextPage, () => {
  if (!storehasnextPage.value) mainStore.setstoreinfiniteStatus(false);
  else mainStore.setstoreinfiniteStatus(true);
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

//배너 색
const bannerColorClass = ref("bg-[#7900ac]");
function getColor(color: string) {
  bannerColorClass.value = color;
}
</script>

<style>
.carousel__icon {
  fill: lightgray !important;
}
</style>
