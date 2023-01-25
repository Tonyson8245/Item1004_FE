<template>
  <div class="divide-[#f0f0f0] divide-y border-everly-light_grey border-b">
    <div
      class="flex justify-between px-5 py-4"
      @click="router.push('/mypage/user/info')"
    >
      <div class="flex">
        <img src="@/assets/icon/smile_black.svg" alt="" class="pr-3" /> 회원정보
      </div>
      <img src="@/assets/icon/arrow_right.svg" alt="" class="pr-3" />
    </div>
    <div
      class="flex justify-between px-5 py-4"
      @click="router.push('/mypage/contractList/buy')"
    >
      <div class="flex">
        <img src="@/assets/icon/tag_black.svg" alt="" class="pr-3" /> 구매내역
      </div>
      <img src="@/assets/icon/arrow_right.svg" alt="" class="pr-3" />
    </div>
    <div
      class="flex justify-between px-5 py-4"
      @click="router.push('/mypage/contractList/sell')"
    >
      <div class="flex">
        <img src="@/assets/icon/tag_white.svg" alt="" class="pr-3" /> 판매내역
      </div>
      <img src="@/assets/icon/arrow_right.svg" alt="" class="pr-3" />
    </div>
    <div
      class="flex justify-between px-5 py-4"
      @click="router.push('/mypage/mileage/charge')"
    >
      <div class="flex">
        <img src="@/assets/icon/pig_black.svg" alt="" class="pr-3" />
        마일리지 충전
      </div>
      <img src="@/assets/icon/arrow_right.svg" alt="" class="pr-3" />
    </div>
    <div
      class="flex justify-between px-5 py-4"
      @click="router.push('/mypage/mileage/withdraw')"
    >
      <div class="flex">
        <img src="@/assets/icon/pig_black.svg" alt="" class="pr-3" />
        마일리지 출금
      </div>
      <img src="@/assets/icon/arrow_right.svg" alt="" class="pr-3" />
    </div>
    <div
      class="flex justify-between px-5 py-4"
      @click="router.push('/mypage/mileage/overview')"
    >
      <div class="flex">
        <img src="@/assets/icon/pig_black.svg" alt="" class="pr-3" />
        마일리지 현황
      </div>
      <img src="@/assets/icon/arrow_right.svg" alt="" class="pr-3" />
    </div>
    <div
      class="flex justify-between px-5 py-4"
      @click="moveExternalLink('공지사항')"
    >
      <div class="flex">
        <img src="@/assets/icon/notice_black.svg" alt="" class="pr-3" />
        공지사항
      </div>
      <img src="@/assets/icon/arrow_right.svg" alt="" class="pr-3" />
    </div>
    <div
      class="flex justify-between px-5 py-4"
      @click="moveExternalLink('문의하기')"
    >
      <div class="flex">
        <img src="@/assets/icon/customercenter_black.svg" alt="" class="pr-3" />
        고객센터
      </div>
      <img src="@/assets/icon/arrow_right.svg" alt="" class="pr-3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { moveExternalLink } from "@/common";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped></style>
