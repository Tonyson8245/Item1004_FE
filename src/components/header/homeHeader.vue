<template>
  <div class="relative">
    <!-- 모바일 검색 페이지 -->
    <transition name="slide-fade">
      <searchModal v-if="storeShowSearchModal_mobile" />
    </transition>
    <div class="border-b-2">
      <!-- 웹 팔래요/살래요/검색/등록 -->

      <!-- 검색 : 메인 페이지 & 검색 결과 페이지 -->
      <div class="flex cursor-default bg-[#fafafa] inline-block">
        <div class="flex-1 hidden md:block"></div>
        <div class="flex-none hidden md:block">
          <div
            class="flex-none flex justify-between items-center bg-[#fafafa] w-[1180px] px-4 py-10 relative"
          >
            <div class="flex space-x-4 text-xl">
              <!-- 팔래요 활성화 -->
              <div class="flex space-x-2" v-if="storeSellBuy == 'sell'">
                <img
                  src="@/assets/icon/check_web_blue.svg"
                  alt=""
                  class="w-6"
                />
                <span
                  class="text-everly-main font-bold w-13"
                  @click="toggleSellBuy('sell')"
                  >팔래요</span
                >
              </div>
              <div class="flex space-x-2" v-if="storeSellBuy == 'sell'">
                <img
                  src="@/assets/icon/check_web_grey.svg"
                  alt=""
                  class="w-6"
                />
                <span
                  class="text-everly-dark-grey w-13"
                  @click="toggleSellBuy('buy')"
                  >살래요</span
                >
              </div>

              <!-- 살래요 활성화 -->
              <div class="flex space-x-2" v-if="storeSellBuy == 'buy'">
                <img
                  src="@/assets/icon/check_web_grey.svg"
                  alt=""
                  class="w-6"
                />
                <span
                  class="text-everly-dark-grey w-13"
                  @click="toggleSellBuy('sell')"
                  >팔래요</span
                >
              </div>
              <div class="flex space-x-2" v-if="storeSellBuy == 'buy'">
                <img src="@/assets/icon/check_web_red.svg" alt="" class="w-6" />
                <span
                  class="text-everly-red font-bold w-13"
                  @click="toggleSellBuy('buy')"
                  >살래요</span
                >
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
        <div class="flex space-x-5 w-40">
          <!--팔래요 활성화 -->
          <div class="flex space-x-1" v-if="storeSellBuy == 'sell'">
            <img src="@/assets/icon/check_mobile_blue.svg" alt="" />
            <span
              class="text-everly-main font-bold"
              @click="toggleSellBuy('sell')"
              >팔래요</span
            >
          </div>
          <div class="flex space-x-1" v-if="storeSellBuy == 'sell'">
            <img src="@/assets/icon/check_mobile_grey.svg" alt="" />
            <span class="text-everly-dark_grey" @click="toggleSellBuy('buy')"
              >살래요</span
            >
          </div>

          <!--살래요 활성화 -->
          <div class="flex space-x-1" v-if="storeSellBuy == 'buy'">
            <img src="@/assets/icon/check_mobile_grey.svg" alt="" />
            <span class="text-everly-dark_grey" @click="toggleSellBuy('sell')"
              >팔래요</span
            >
          </div>
          <div class="flex space-x-1" v-if="storeSellBuy == 'buy'">
            <img src="@/assets/icon/check_mobile_red.svg" alt="" />
            <span
              class="text-everly-red font-bold"
              @click="toggleSellBuy('buy')"
              >살래요</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import searchModal from "../header/search/searchModal.vue";
import search from "../header/search/searchComponent.vue";
import { useSearchStore } from "../../store/modules/home/searchStore";
import { storeToRefs } from "pinia";

//store 가져오기
const searchStore = useSearchStore();

//모바일 검색 모달 활성화/비활성화 버튼
const { storeShowSearchModal_mobile } = storeToRefs(searchStore); // store 값 반응형으로 사용

//살래요/팔래요 값 가져오기
const { storeSellBuy } = storeToRefs(searchStore);

function toggleSellBuy(type: string) {
  if (type == `sell`) searchStore.setstoreSellBuy("sell");
  else searchStore.setstoreSellBuy("buy");
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-1000px);
}
</style>
