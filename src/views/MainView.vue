<template>
  <div @click="toggleSearchWeb()">
    <!-- 모바일 검색 페이지 -->
    <transition name="slide-fade">
      <searchModal v-if="storeSearchShowMobile" />
    </transition>
    <!-- 웹 헤더  -->
    <div class="flex cursor-default bg-[#fafafa] inline-block top-0 z-50">
      <div class="flex-1 hidden md:block"></div>
      <div class="flex-none hidden md:block">
        <div
          class="flex-none flex justify-between items-center bg-[#fafafa] w-[1180px] px-4 py-4"
        >
          <div class="hidden md:block">
            <img src="@/assets/icon/logo_vertical.svg" alt="" />
          </div>
          <div class="hidden md:block">
            <div class="flex space-x-4 items-center">
              <img src="@/assets/icon/chat_mid-grey.svg" alt="" />
              <img src="@/assets/icon/notify_mid-grey.svg" alt="" />
              <img src="@/assets/icon/profile_mid-grey.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 hidden md:block"></div>
    </div>
    <!-- 모바일 헤더 -->
    <div
      class="w-full bg-everly-main px-4 py-3 cursor-default fixed top-0 z-10 md:hidden"
    >
      <div class="flex justify-between items-center">
        <div class="text-white font-bold">로그인하기</div>
        <div class="md:hidden">
          <div class="flex space-x-4">
            <img src="@/assets/icon/filter_white.svg" alt="" />
            <img
              src="@/assets/icon/search_white.svg"
              alt=""
              @click="toggleSearchMobile()"
            />
            <img src="@/assets/icon/notify_white.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- 헤더끝 -->
    <router-view> </router-view>
    <div class="p-4 text-center w-full fixed bottom-0">
      <div
        class="invisible md:visible text-center text-sm text-everly-dark_grey cursor-pointer"
      >
        <div class="flex divide-xs w-full justify-center">
          <div class="text-center px-2 text-everly-dark_grey">
            <button class="text-sm">이용약관</button>
          </div>
          <div class="text-center px-2 text-everly-dark_grey">
            <button class="text-sm">개인정보 처리방침</button>
          </div>
          <div class="text-center px-2 text-everly-dark_grey">
            <button class="text-sm">고객센터</button>
          </div>
        </div>
      </div>
      <div
        class="md:invisible text-center text-sm text-everly-dark_grey cursor-pointr py-1 w-full"
      >
        고객센터 문의하기
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import searchModal from "@/components/home/search/searchModal.vue";
import { useCommon } from "@/store/modules/ui/common";
import { useSearchStore } from "@/store/modules/home/searchStore";
import { computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useMediaQuery } from "@vueuse/core";

//검색창 활성화 값 가져오기
const store = useCommon(); // 모달 store 가져오기
const showSearchWeb = computed(() => store.showSearch); // 모달 상태 가져오기
// 모바일 검색창 활성화 값 가져오기

//웹 검색창 비활성화
function toggleSearchWeb() {
  if (showSearchWeb) {
    store.setshowSearch(false);
  }
}

//모바일 검색창 활성화/비활성화 버튼
const searchStore = useSearchStore();
const { storeSearchShowMobile } = storeToRefs(searchStore);

function toggleSearchMobile() {
  searchStore.setstoreSearchShowMobile(!storeSearchShowMobile.value);
}

let isLargeScreen = computed(() => useMediaQuery("(min-width: 800px)"));

watch(isLargeScreen.value, () => {
  if (isLargeScreen.value.value) toggleSearchMobile();
});
</script>
<style lang="scss">
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
