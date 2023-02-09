<template>
  <!-- <Test /> -->

  <BannerWeb class="hidden md:flex" />
  <BannerTablet class="hidden sm:flex md:hidden" />
  <BannerMobile class="flex sm:hidden" />

  <div class="flex">
    <div class="flex-1"></div>
    <div class="flex-none w-[73.75rem]">
      <div class="hidden md:block">상품권판매시작</div>
      <div class="flex">
        <div>아이템거래</div>
        <div>상품권거래</div>
        <div>내거래</div>
        <div>충전하기</div>
        <div>출금하기</div>
      </div>
      <div>
        인기거래
        <div class="md:flex">
          <div>거래글 1</div>
          <div>거래글 2</div>
          <div>거래글 3</div>
          <div>거래글 4</div>
          <div>거래글 5</div>
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
import { usePostStore } from "@/store/modules/home/postStore";
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
const postStore = usePostStore();
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
  postStore.$reset();
  getProductList(6);
  //일단 다끔
  if (getCookie("noti") == "stop") {
    componentStore.setstoreshowNotify(false);
  } else {
    if (route.meta.name == "list") {
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
