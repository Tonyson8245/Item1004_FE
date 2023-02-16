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
        <div class="flex justify-between py-2">
          <span class="font-bold flex items-center">
            <img src="@/assets/icon/flame.svg" alt="" class="pb-1.5 pr-0.5" />
            인기거래</span
          >
          <div>
            <button @click="prev" class="mr-2" :class="prevClass">
              <img src="@/assets/icon/arrow_circle_left.svg" alt="" />
            </button>
            <button @click="next" :class="nextClass">
              <img src="@/assets/icon/arrow_circle_right.svg" alt="" />
            </button>
          </div>
        </div>
        <div class="md:hidden space-y-4 md:space-y-0">
          <div v-for="card in cardQty" :key="card"><mainCard /></div>
        </div>
        <div class="hidden md:block relative">
          <Carousel :settings="settings" ref="myCarousel">
            <Slide v-for="slide in cardQty" :key="slide">
              <mainCard />
            </Slide>
          </Carousel>
        </div>
      </div>
      <!-- 웹내용 -->
      <div class="hidden md:block py-8">
        <div class="grid grid-cols-6 gap-12">
          <!-- 실시간물품 -->
          <div class="col-span-4">
            <div class="flex justify-between">
              <div class="font-bold">실시간물품</div>
              <div class="font-bold text-everly-main">팔래요</div>
            </div>
            <hr class="border-everly-mid_grey border-0.5 my-4" />
            <div class="text-sm text-everly-dark_grey">
              <div class="flex font-bold pb-3 w-full">
                <div class="w-[5.625rem]">종류</div>
                <div class="w-[16.05rem]">게임명/서버명</div>
                <div class="w-[20.375rem]">제목</div>
                <div class="w-[6rem] text-right pr-2">금액(원)</div>
              </div>
              <div class="flex flex-col space-y-4">
                <div class="flex" v-for="key in 5">
                  <div class="w-[5.625rem]">게임머니</div>
                  <div class="w-[16.05rem]">
                    디아블로2:레저렉션 > 레더하드코어
                  </div>
                  <div
                    class="w-[20.375rem] overflow-ellipsis overflow-hidden whitespace-nowrap"
                  >
                    엄청 짱짱 싼 게임머니 팝니다.채팅 바로 답하니까 연락주세요
                    엄청 짱짱 싼 로 답하니까 연 엄청 짱짱 싼 게임머니 팝니다.
                    채팅 바로 답하니까 연
                  </div>
                  <div class="w-[6rem] text-right pr-2">22,800</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 마일리지 충전 -->
          <div class="col-span-2">
            <div class="flex justify-between">
              <div class="font-bold">마일리지 충전</div>
              <div
                class="text-xs flex bg-everly-main rounded-lg text-everly-white items-center justify-center px-2"
              >
                카카오채널 바로가기
              </div>
            </div>
            <div class="flex items-start text-sm pt-3 pb-5">
              <span class="pr-1"> * </span>
              <span>
                계좌이체와 문화상품권은 아이템천사 카카오채널을 통해 수동결제가
                가능합니다.
              </span>
            </div>
            <div class="flex w-full justify-between">
              <div
                class="border border-everly-mid_grey rounded-lg w-24 h-24 flex justify-center items-center"
              >
                <div class="text-center">
                  <img
                    src="@/assets/icon/creditcardwithblue_black1.svg"
                    alt=""
                  />
                  신용카드
                </div>
              </div>
              <div
                class="border border-everly-mid_grey rounded-lg w-24 h-24 flex justify-center items-center"
              >
                <div class="text-center">
                  <img
                    src="@/assets/icon/virtualAccontwithblue_black.svg"
                    alt=""
                  />
                  가상계좌
                </div>
              </div>
              <div
                class="border border-everly-mid_grey rounded-lg w-24 h-24 flex justify-center items-center"
              >
                <div class="text-center">
                  <img src="@/assets/icon/culturewithblue_black.svg" alt="" />
                  문화상품권
                </div>
              </div>
            </div>
          </div>
          <!-- 동영상 컨텐스 -->
          <div class="col-span-4">
            <div class="font-bold">동영상컨텐츠</div>
            <div class="flex justify-between items-center space-x-4 py-4">
              <div
                class="rounded-lg bg-cover bg-center w-[15rem] h-[8.75rem] video_01"
              ></div>
              <div
                class="rounded-lg bg-cover bg-center w-[15rem] h-[8.75rem] video_02"
              ></div>
              <div
                class="rounded-lg bg-cover bg-center w-[15rem] h-[8.75rem] video_03"
              ></div>
            </div>
          </div>
          <!-- 이벤트 -->
          <div class="col-span-2">
            <div class="font-bold flex justify-between">
              <div>이벤트</div>
              <div class="h-4">
                <button class="cursor-not-allowed">
                  <img src="@/assets/icon/arrow_circle_left.svg" alt="" />
                </button>
                <button class="cursor-not-allowed">
                  <img src="@/assets/icon/arrow_circle_right.svg" alt="" />
                </button>
              </div>
            </div>
            <div class="flex justify-between items-center py-4">
              <div class="rounded-lg overflow-hidden">
                <img
                  src="@/assets/img/event/event_mileage.jpg"
                  alt=""
                  class="h-[8.75rem]"
                />
              </div>
            </div>
          </div>
          <!-- 고객센터 -->
          <div class="col-span-3 pr-10">
            <div class="font-bold">고객센터</div>
            <div class="flex py-4 justify-between">
              <div class="font-bold">
                <div class="text-xl">1833-2585</div>
                <div>운영시간 : 24시간 연중무휴</div>
              </div>
              <div class="flex space-x-3">
                <img src="@/assets/icon/kakao_addchannel.svg" alt="" />
                <img src="@/assets/icon/kakao_customercenter.svg" alt="" />
              </div>
            </div>
            <div class="flex space-x-3 justify-end">
              <img src="@/assets/icon/instagram_black.svg" alt="" />
              <img src="@/assets/icon/youtube_black.svg" alt="" />
              <img src="@/assets/icon/blog_black.svg" alt="" />
              <img src="@/assets/icon/facebook_black.svg" alt="" />
            </div>
          </div>
          <!-- 공지사항 -->
          <div class="col-span-3">
            <div class="font-bold">공지사항</div>
            <div class="space-y-3 py-4">
              <div
                class="text-everly-dark_grey text-sm flex w-full grid-cols-12 grid"
                v-for="key in 3"
              >
                <div class="col-span-2">[이벤트발표]</div>
                <div class="col-span-8 text-left">
                  마일리지 추가 지금이벤트 당첨자 안내
                </div>
                <div class="col-span-2 text-right">2023-02-01</div>
              </div>
            </div>
          </div>
          <!-- 웹 플로팅 버튼 -->
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
              </div>
            </div>
            <div class="flex-grow"></div>
          </div>
        </div>
      </div>
      <!-- 모바일 내용 -->
      <div class="md:hidden">
        <div class="mt-10 flex justify-center bg-[#8CCC36]">
          <img
            src="@/assets/img/banners/sale_giftCard_mobile.png"
            alt=""
            class="h-[5rem]"
          />
        </div>
        <div class="flex justify-center bg-[#FE8803]">
          <img
            src="@/assets/img/event/event_potion_mobile.webp"
            alt=""
            class="h-[7.5rem]"
          />
        </div>
        <div class="px-4 py-4">
          <div class="font-bold mb-3">공지사항</div>
          <div class="border-everly-mid_grey border space-y-3 p-3">
            <div v-for="key in 3">
              <div class="text-sm">아이템천사 결제 업데이트 안내</div>
              <div class="text-xs text-everly-mid_grey">2023.02.08</div>
            </div>
          </div>
        </div>
        <div class="px-4 flex gap-5">
          <div
            class="bg-[#f6f6ff] flex-1 h-36 rounded-xl p-3 text-everly-main font-bold flex flex-col justify-between relative"
          >
            <div>아이템천사<br />고객센터</div>
            <div class="text-right">1833-2585</div>
            <img
              src="@/assets/icon/24hour_headphone.svg"
              alt=""
              class="absolute right-3 top-8"
            />
          </div>
          <div
            class="bg-[#fffde4] flex-1 h-36 rounded-xl p-3 font-bold flex flex-col justify-between relative"
          >
            <div>실시간 1:1 상담</div>
            <div>카카오톡<br />친구추가</div>
            <div class="text-right inline-block">
              <div class="inline-block bg-everly-white px-2 py-1">
                Item1004
                <img
                  src="@/assets/icon/kakao_plus.svg"
                  alt=""
                  class="float-right pt-1 mx-1"
                />
              </div>
            </div>

            <img
              src="@/assets/icon/24hour_kako.svg"
              alt=""
              class="absolute right-3 top-8"
            />
          </div>
        </div>
      </div>

      <div class="px-4 pt-10">
        <hr class="border-everly-light_grey border-0.5 md:hidden" />
      </div>

      <div class="my-1 md:mb-24">
        <div class="hidden md:block">
          <Carousel
            :settings="company_settings"
            :breakpoints="company_breakpoints"
          >
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
          <Carousel
            :settings="company_settings"
            :breakpoints="company_breakpoints"
          >
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

      <FooterMobile class="block md:hidden" />
    </div>
    <div class="flex-1"></div>
    <!-- 모바일 플로팅 버튼 -->
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
    </div>
  </div>
</template>

<script setup lang="ts">
import FooterMobile from "../footer/footerMobile.vue";
import BannerWeb from "@/components/home/components/banner/bannerWeb.vue";
import BannerTablet from "@/components/home/components/banner/bannerTablet.vue";
import BannerMobile from "@/components/home/components/banner/bannerMobile.vue";
import mainCard from "./components/cards/mainCard.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, watch, onMounted } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { useListStore } from "@/store/modules/home/listStore";
import { usePostStore } from "@/store/modules/home/postStore";
import { useComponentStore } from "@/store/modules/common/componentStore";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { useCookie } from "vue-cookie-next";
import { moveExternalLink } from "@/common";
import { getProductCardBodyDto } from "@/domain/home/getProductCardDto";
const router = useRouter();

const cardQty = ref([0, 1, 2]);

//// 반응형 사이즈 조정
const minSize = computed(() => {
  return useMediaQuery("(min-width: 768px)");
});
console.log(minSize);

//화면이 작아지면 꺼지는 로직
watch(minSize.value, (minSize) => {
  if (!minSize) {
    //페이지가 모바일이되는 경우
    cardQty.value = [0, 1, 2];
  } else {
    cardQty.value = [0, 1, 2, 3, 4, 5, 6, 10];
  }
});
// 초기 설정
onMounted(() => {
  if (minSize.value.value) cardQty.value = [0, 1, 2, 3, 4, 5, 6, 10];
});

////로드 관련
const listStore = useListStore();
const postStore = usePostStore();
const componentStore = useComponentStore();
const { getCookie } = useCookie();
const route = useRoute();
//처음 페이지 로드 될때 동작
onMounted(() => {
  listStore.$reset();
  postStore.$reset();
  // getProductList(6);
  //일단 다끔
  if (getCookie("noti") == "stop") {
    componentStore.setstoreshowNotify(false);
  } else {
    if (route.meta.name == "list") {
      componentStore.setstoreshowNotify(false);
    }
  }
});

//////배너

//carousel
//carousel
const company_settings = {
  itemsToShow: 3.5,
  snapAlign: "start",
  autoplay: "2000",
};
const company_breakpoints = {
  // 700px and up
  400: {
    itemsToShow: 5,
    snapAlign: "start",
    autoplay: "0",
  },
  768: {
    itemsToShow: 8,
    snapAlign: "start",
    autoplay: "0",
  },
};
const myCarousel = ref(null);
const settings = {
  itemsToShow: 3.1,
  snapAlign: "start",
  autoplay: "0",
};
const prevClass = ref("cursor-not-allowed");
const nextClass = ref("cursor-pointer");

function prev() {
  // Methods are available in this reference
  //@ts-ignore
  if (myCarousel.value.data.currentSlide.value == 0)
    prevClass.value = "cursor-not-allowed";
  else {
    prevClass.value = "cursor-pointer";
    //@ts-ignore
    myCarousel.value.prev();
  }
}
function next() {
  // Methods are available in this reference
  //@ts-ignore
  if (myCarousel.value.data.currentSlide.value > cardQty.value - 4)
    nextClass.value = "cursor-not-allowed";
  else {
    nextClass.value = "cursor-pointer";
    //@ts-ignore
    myCarousel.value.next();
  }
}

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

// 처음 페이지 로드 될때 동작
onMounted(() => {
  listStore.$reset();
  postStore.$reset();
  getProductList(10);
  //일단 다끔
  if (getCookie("noti") == "stop") {
    componentStore.setstoreshowNotify(false);
  } else {
    if (route.meta.name == "list") {
      componentStore.setstoreshowNotify(false);
    }
  }
});

function getProductList(pageUnit: number) {
  var payload = new getProductCardBodyDto(1, pageUnit, "sell");

  listStore.setstoreProductCard(payload).then((res) => {});
}
</script>

<style scoped lang="scss">
.video_01 {
  background-image: url(@/assets/img/video_01.png);
}
.video_02 {
  background-image: url(@/assets/img/video_02.png);
}
.video_03 {
  background-image: url(@/assets/img/video_03.png);
}
</style>

<style>
.carousel__icon {
  fill: lightgray !important;
}
</style>
