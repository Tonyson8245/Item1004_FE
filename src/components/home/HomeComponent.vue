<template>
  <div>
    <!-- 웹 팔래요/살래요/검색/등록 -->
    <div class="flex cursor-default bg-[#fafafa] inline-block border-b-2">
      <div class="flex-1 hidden md:block"></div>
      <div class="flex-none hidden md:block">
        <div
          class="flex-none flex justify-between items-center bg-[#fafafa] w-[1180px] px-4 py-10 relative"
        >
          <div class="flex space-x-4 text-xl">
            <!-- 팔래요 활성화 -->
            <div class="flex space-x-2" v-if="storeSellBuy == 'sell'">
              <img src="@/assets/icon/check_web_blue.svg" alt="" class="w-6" />
              <span class="text-everly-main font-bold w-13">팔래요</span>
            </div>
            <div class="flex space-x-2" v-if="storeSellBuy == 'sell'">
              <img src="@/assets/icon/check_web_grey.svg" alt="" class="w-6" />
              <span class="text-everly-dark-grey w-13">살래요</span>
            </div>

            <!-- 살래요 활성화 -->
            <div class="flex space-x-2" v-if="storeSellBuy == 'buy'">
              <img src="@/assets/icon/check_web_grey.svg" alt="" class="w-6" />
              <span class="text-everly-dark-grey w-13">팔래요</span>
            </div>
            <div class="flex space-x-2" v-if="storeSellBuy == 'buy'">
              <img src="@/assets/icon/check_web_red.svg" alt="" class="w-6" />
              <span class="text-everly-red font-bold w-13">살래요</span>
            </div>
          </div>
          <search
            class="w-[760px] absolute top-[37px] right-[205px]"
            @click.stop=""
          />
          <button
            class="hidden md:block w-[180px] rounded-lg border-everly-dark_grey border py-3"
          >
            물품등록
          </button>
        </div>
      </div>
      <div class="flex-1 hidden md:block"></div>
    </div>
    <!-- 모바일 팔래요/살래요 -->
    <div class="bg-everly-white px-4 py-4 cursor-default md:hidden mt-12">
      <div class="flex space-x-5">
        <!--팔래요 활성화 -->
        <div class="flex space-x-1" v-if="storeSellBuy == 'sell'">
          <img src="@/assets/icon/check_small_blue.svg" alt="" />
          <span class="text-everly-main font-bold">팔래요</span>
        </div>
        <div class="flex space-x-1" v-if="storeSellBuy == 'sell'">
          <img src="@/assets/icon/check_small_grey.svg" alt="" />
          <span class="text-everly-dark_grey w-11">살래요</span>
        </div>

        <!--살래요 활성화 -->
        <div class="flex space-x-1" v-if="storeSellBuy == 'buy'">
          <img src="@/assets/icon/check_small_grey.svg" alt="" />
          <span class="text-everly-dark_grey w-11">팔래요</span>
        </div>
        <div class="flex space-x-1" v-if="storeSellBuy == 'buy'">
          <img src="@/assets/icon/check_small_blue.svg" alt="" />
          <span class="text-everly-red w-11 font-bold">살래요</span>
        </div>
      </div>
    </div>
  </div>
  <div></div>
</template>

<script setup lang="ts">
import { useSearchStore } from "@/store/modules/home/searchStore";
import search from "@/components/home/search/searchComponet.vue";
import { computed } from "vue";
import { storeToRefs } from "pinia";

//살래요/팔래요 값 가져오기
const searchStore = useSearchStore();
const { storeSellBuy } = storeToRefs(searchStore);
</script>

<style scoped></style>
