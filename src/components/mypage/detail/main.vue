<template>
  <div class="w-full pb-16">
    <!-- 프로필 -->
    <div class="flex px-5 pt-6 md:pt-0 bg-everly-wbg_grey md:bg-transparent">
      <div class="pr-5">
        <img
          src="@/assets/img/profile_green.jpeg"
          alt=""
          class="rounded-lg w-[3.9rem] sm:w-[4.375rem] md:w-[6.438rem]"
        />
      </div>
      <div>
        <div class="flex items-center space-x-2">
          <div class="font-bold text-xs sm:text-base md:text-lg">
            이걸닉네임이라고짓다니말도안돼
          </div>
          <div>
            <img
              src="@/assets/icon/check_circle_blue.svg"
              alt=""
              v-if="stroretotalVerified"
            />
          </div>
        </div>
        <div class="flex items-center">
          <div class="pr-6 hidden md:block">유저코드</div>
          <div class="text-xs sm:text-base text-everly-dark_grey pr-1">
            #A2379F56GH
          </div>
          <div>
            <button @click="copy(`#A2379F56GH`)">
              <img src="@/assets/icon/copy_grey.svg" alt="" />
            </button>
          </div>
        </div>
        <div>
          <div class="flex items-center">
            <div class="pr-6 hidden md:block">인증상태</div>
            <div class="space-x-2">
              <span
                class="rounded border px-2 sm:px-3 md:px-3 text-xs py-0.5 md:py-1 bg-everly-white"
                :class="verifiedPhone"
              >
                휴대폰
              </span>
              <span
                class="rounded border px-2 sm:px-3 md:px-3 text-xs py-0.5 md:py-1 bg-everly-white"
                :class="verifiedEmail"
              >
                이메일
              </span>
              <span
                class="rounded border px-2 sm:px-3 md:px-3 text-xs py-0.5 md:py-1 bg-everly-white"
                :class="verifiedAccount"
              >
                출금계좌
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 거래등급 -->
    <div
      class="flex flex-wrap-reverse md:py-5 bg-everly-wbg_grey md:bg-transparent"
    >
      <div
        class="flex-1 flex items-center justify-between md:block md:border-r py-3 md:py-0 md:px-5 md:space-y-2"
      >
        <div class="text-sm md:text-lg md:font-bold pl-5 md:pl-0 flex">
          거래등급
          <img
            src="@/assets/icon/info_grey.svg"
            alt=""
            class="pl-2 md:hidden"
          />
        </div>
        <div
          class="text-right font-bold md:text-2xl border-r pr-2 md:border-0 md:pr-0"
        >
          <div class="justify-end hidden sm:flex">
            <div class="flex w-[8rem] justify-center rounded-full">
              <!-- <img
                :src="`/src/assets/icon/${levelBadge}withTitle.svg`"
                class="sm:h-[2rem] md:h-auto"
                alt=""
              /> -->
              <img
                :src="`/assets/icon/${levelBadge}withTitle.svg`"
                class="sm:h-[2rem] md:h-auto"
                alt=""
              />
            </div>
          </div>
          <div class="sm:hidden">
            <!-- <img :src="`/src/assets/icon/${levelBadge}.svg`" alt="" /> -->
            <img :src="`/assets/icon/${levelBadge}.svg`" alt="" />
          </div>
        </div>
      </div>
      <div
        class="flex-1 flex items-center justify-between md:block border-r-0 md:border-r py-3 md:py-0 md:px-5 md:space-y-2"
      >
        <div
          class="flex text-sm md:text-lg md:font-bold justify-between pl-2 md:pl-0"
        >
          <div class="flex">
            <span class="hidden md:block pr-2">사용가능</span>쿠폰
          </div>
          <img
            src="@/assets/icon/arrow_right.svg"
            alt=""
            class="hidden md:block"
          />
        </div>
        <div
          class="flex md:block text-right font-bold md:text-2xl pr-5 md:pr-0"
        >
          3개
          <img
            src="@/assets/icon/arrow_right.svg"
            alt=""
            class="md:hidden block ml-3 w-1.5"
          />
        </div>
      </div>
      <div
        class="w-full items-center flex py-3 px-5 justify-between md:w-auto md:flex-grow md:block md:py-0 md:space-y-2"
      >
        <div class="text-sm md:text-lg md:font-bold flex justify-between">
          마일리지
          <img
            src="@/assets/icon/arrow_right.svg"
            alt=""
            class="hidden md:block"
          />
        </div>
        <div class="flex md:block text-right font-bold md:text-2xl">
          5,000원
          <img
            src="@/assets/icon/arrow_right.svg"
            alt=""
            class="md:hidden block ml-3 w-1.5"
          />
        </div>
      </div>
    </div>
    <!-- 판매 / 구매 -->
    <div class="sm:mt-2 sm:flex p-5 space-y-4 sm:space-y-0 sm:space-x-10">
      <div class="sm:flex-1">
        <div class="hidden md:flex text-lg font-bold py-3">
          <img
            src="@/assets/icon/tag_grey.svg"
            alt=""
            class="hidden md:block pr-2"
          />판매내역
        </div>
        <div class="flex rounded-lg border-everly-main border py-2 md:bg-white">
          <div class="flex-grow text-center">
            <div class="text-xs md:text-base">판매등록</div>
            <div class="text-base md:text-lg font-bold text-everly-main">
              {{ sellRegister }}
            </div>
          </div>
          <div class="py-3 md:py-4">
            <div class="border-r h-4 md:h-5 border-black"></div>
          </div>
          <div class="flex-grow text-center">
            <div class="text-xs md:text-base">판매중</div>
            <div class="text-base md:text-lg font-bold text-everly-main">
              {{ sellOngoing }}
            </div>
          </div>
          <div class="py-3 md:py-4">
            <div class="border-r h-4 md:h-5 border-black"></div>
          </div>
          <div class="flex-grow text-center">
            <div class="text-xs md:text-base">판매완료</div>
            <div class="text-base md:text-lg font-bold text-everly-main">
              {{ sellDone }}
            </div>
          </div>
        </div>
      </div>
      <div class="sm:flex-1">
        <div class="hidden md:flex text-lg font-bold py-3">
          <img
            src="@/assets/icon/tag_grey.svg"
            alt=""
            class="hidden md:block pr-2"
          />구매내역
        </div>
        <div class="flex rounded-lg border-everly-red border py-2 md:bg-white">
          <div class="flex-grow text-center">
            <div class="text-xs md:text-base">판매등록</div>
            <div class="text-base md:text-lg font-bold text-everly-red">
              {{ buyRegister }}
            </div>
          </div>
          <div class="py-3 md:py-4">
            <div class="border-r h-4 md:h-5 border-black"></div>
          </div>
          <div class="flex-grow text-center">
            <div class="text-xs md:text-base">판매중</div>
            <div class="text-base md:text-lg font-bold text-everly-red">
              {{ buyOngoing }}
            </div>
          </div>
          <div class="py-3 md:py-4">
            <div class="border-r h-4 md:h-5 border-black"></div>
          </div>
          <div class="flex-grow text-center">
            <div class="text-xs md:text-base">판매완료</div>
            <div class="text-base md:text-lg font-bold text-everly-red">
              {{ buyDone }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 찜한 목록 -->
    <div class="border-t flex justify-between px-5 py-3 md:py-5">
      <div class="flex">
        <img src="@/assets/icon/like_main_web.svg" alt="" class="w-4 md:w-5" />
        <div class="px-3 text-sm md:text-xl font-bold">찜한 목록</div>
        <div class="text-sm md:text-xl">{{ likeQty }}개</div>
      </div>
      <img src="@/assets/icon/arrow_right.svg" alt="" />
    </div>
    <!-- 받은 리뷰 -->
    <div class="border-t flex justify-between px-5 py-3 md:py-5">
      <div class="flex">
        <img src="@/assets/icon/review_grey.svg" alt="" class="w-4 md:w-5" />
        <div class="px-3 text-sm md:text-xl font-bold">받은 리뷰</div>
      </div>
      <div>
        <img src="@/assets/icon/arrow_right.svg" alt="" class="md:hidden" />
        <div class="hidden md:block text-base text-everly-dark_grey">
          * 별로예요는 나에게만 보입니다
        </div>
      </div>
    </div>
    <!-- 받은 리뷰 리스트 -->
    <div class="px-5 md:flex pb-7">
      <div class="flex-grow">
        <div class="md:w-[18.75rem] space-y-3 md:space-y-4">
          <div class="hidden md:flex">
            <img src="@/assets/icon/thumbup_blue.svg" alt="" class="pr-2" />
            좋아요
          </div>
          <div
            class="flex bg-everly-light_grey rounded-b-lg rounded-tr-lg text-sm md:text-base py-2"
          >
            <div class="w-12 md:w-14 font-bold text-center">
              {{ quickReply }}
            </div>
            <div class="flex-grow">답장이 빨라요</div>
          </div>
          <div
            class="flex bg-everly-light_grey rounded-b-lg rounded-tr-lg text-sm md:text-base py-2"
          >
            <div class="w-12 md:w-14 font-bold text-center">
              {{ goodPrice }}
            </div>
            <div class="flex-grow">합리적인 가격에 판매해요</div>
          </div>
          <div
            class="flex bg-everly-light_grey rounded-b-lg rounded-tr-lg text-sm md:text-base py-2"
          >
            <div class="w-12 md:w-14 font-bold text-center">
              {{ quickdeal }}
            </div>
            <div class="flex-grow">거래가 빠르게 진행 됐어요</div>
          </div>
          <div
            class="flex bg-everly-light_grey rounded-b-lg rounded-tr-lg text-sm md:text-base py-2"
          >
            <div class="w-12 md:w-14 font-bold text-center">{{ kindMan }}</div>
            <div class="flex-grow">친절하게 알려줘요</div>
          </div>
        </div>
      </div>
      <div class="flex-grow hidden md:block">
        <div class="md:w-[18.75rem] space-y-3 md:space-y-4">
          <div class="hidden md:flex">
            <img src="@/assets/icon/thumbdown_blue.svg" alt="" class="pr-2" />
            별로예요
          </div>
          <div
            class="flex bg-everly-light_grey rounded-b-lg rounded-tr-lg text-sm md:text-base py-2"
          >
            <div class="w-12 md:w-14 font-bold text-center">
              {{ slowReply }}
            </div>
            <div class="flex-grow">답장이 느려요</div>
          </div>
          <div
            class="flex bg-everly-light_grey rounded-b-lg rounded-tr-lg text-sm md:text-base py-2"
          >
            <div class="w-12 md:w-14 font-bold text-center">{{ badMan }}</div>
            <div class="flex-grow">불친절해요</div>
          </div>
          <div
            class="flex bg-everly-light_grey rounded-b-lg rounded-tr-lg text-sm md:text-base py-2"
          >
            <div class="w-12 md:w-14 font-bold text-center">
              {{ differInfo }}
            </div>
            <div class="flex-grow">기재한 정보와 거래 내용이 달라요</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 받은 거래 후기 -->
    <div class="border-t flex justify-between px-5 py-3 md:py-5">
      <div class="flex">
        <img src="@/assets/icon/review_grey.svg" alt="" class="w-4 md:w-5" />
        <div class="px-3 flex text-sm md:text-xl space-x-3">
          <div class="font-bold">받은 거래 후기</div>
          <div>6개</div>
        </div>
      </div>
      <img src="@/assets/icon/arrow_right.svg" alt="" />
    </div>
    <!-- 받은 거래후기 리스트 -->
    <div class="px-5 sm:grid sm:grid-cols-2">
      <div v-for="key in 6" key="key" class="py-2">
        <feedback />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import feedback from "../components/feedback.vue";
import { useClipboard } from "@vueuse/core";
import { computed } from "vue";

import { ref } from "vue";

//클립보드 복사
const source = ref("Hello");
const { copy } = useClipboard({ source });

///인증 관련 UI control
var stroretotalVerified = false;
var storeverifiedAccount = false;
var storeverifiedEmail = false;
var storeverifiedPhone = true;

const verfiedActive = "border-everly-main text-everly-main";
const verfiedInactive = "border-everly-dark_grey text-everly-dark_grey";

const verifiedAccount = computed(() => {
  if (storeverifiedAccount) return verfiedActive;
  else return verfiedInactive;
});
const verifiedEmail = computed(() => {
  if (storeverifiedEmail) return verfiedActive;
  else return verfiedInactive;
});
const verifiedPhone = computed(() => {
  if (storeverifiedPhone) return verfiedActive;
  else return verfiedInactive;
});

//등급별 엠블럼
const level: string = "rookie";

const levelBadge = computed(() => {
  switch (level) {
    case "rookie":
      return "level_rookie";
    case "bronze":
      return "level_bronze";
    case "silver":
      return "level_silver";
    case "gold":
      return "level_gold";
    case "platinum":
      return "level_platinum";
    case "diamond":
      return "level_diamond";
    default:
      return "";
  }
});

//판매 overview
const sellRegister = ref("10");
const sellOngoing = ref("3");
const sellDone = ref("6");

//구매 overview
const buyRegister = ref("10");
const buyOngoing = ref("3");
const buyDone = ref("6");

//찜한 목록
const likeQty = ref("50");

//리뷰 내용 - 좋아요
const quickReply = ref("42");
const goodPrice = ref("10");
const quickdeal = ref("32");
const kindMan = ref("30");
//리뷰 내용 - 별로에요
const slowReply = ref("10");
const badMan = ref("1");
const differInfo = ref("0");
</script>

<style scoped></style>
