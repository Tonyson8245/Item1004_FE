<template>
  <div>
    <!-- 웹 팔래요/살래요/검색/등록 -->
    <div class="flex cursor-default bg-[#fafafa] inline-block border-b-2">
      <div class="flex-1 hidden md:block"></div>
      <div class="flex-none hidden md:block">
        <div
          class="flex-none flex justify-between items-center bg-[#fafafa] w-[1180px] px-4 py-10"
        >
          <div class="flex space-x-5 text-xl">
            <div class="flex space-x-2">
              <img src="@/assets/icon/check_small_blue.svg" alt="" />
              <span class="text-everly-main font-bold">팔래요</span>
            </div>
            <div class="flex space-x-2">
              <img src="@/assets/icon/check_small_dark-grey.svg" alt="" />
              <span class="text-everly-dark_grey w-14">살래요</span>
            </div>
          </div>
          <div class="w-[760px] flex">
            <search />
            <!-- <input
              placeholder="게임명 또는 서버명을 입력해주세요."
              class="flex-1 rounded-l-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm"
            /> -->
            <!-- <div class="">
              <img src="@/assets/icon/filter_blue.svg" alt="" />
            </div> -->
          </div>
          <button
            class="hidden md:block w-[180px] rounded-lg border-everly-dark_grey border-[1px] py-3"
          >
            물품등록
          </button>
        </div>
      </div>
      <div class="flex-1 hidden md:block"></div>
    </div>
    <!-- 모바일 팔래요/살래요 -->
    <div class="bg-everly-white px-4 py-4 cursor-default md:hidden">
      <div class="flex space-x-5">
        <div class="flex space-x-1">
          <img src="@/assets/icon/check_small_blue.svg" alt="" />
          <span class="text-everly-main font-bold">팔래요</span>
        </div>
        <div class="flex space-x-1">
          <img src="@/assets/icon/check_small_dark-grey.svg" alt="" />
          <span class="text-everly-dark_grey w-11">살래요</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import search from "@/components/common/search.vue";
</script>

<style scoped></style>
