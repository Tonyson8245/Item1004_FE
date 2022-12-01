<template>
  <div>
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
              @click="toggleSearchModal_Mobile()"
            />
            <img src="@/assets/icon/notify_white.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- 헤더끝 -->

    <!-- 메인 페이지 일때 헤더 -->
    <homeHeader />
  </div>
</template>

<script setup lang="ts">
import homeHeader from "./homeHeader.vue";
import { useSearchStore } from "../../store/modules/home/searchStore";
import { computed, watch } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { storeToRefs } from "pinia";

//store 가져오기
const searchStore = useSearchStore();

//모바일 검색 모달 활성화/비활성화 버튼
const { storeShowSearchModal_mobile } = storeToRefs(searchStore); // store 값 반응형으로 사용
//모바일 검색 모달 설정 코드
function toggleSearchModal_Mobile() {
  searchStore.setstoreShowSearchModal_mobile(
    !storeShowSearchModal_mobile.value
  );
}

//화면 커질 때, 모바일 검색 화면 끄는 것
let isLargeScreen = computed(() => useMediaQuery("(min-width: 800px)"));
watch(isLargeScreen.value, () => {
  if (isLargeScreen.value.value)
    searchStore.setstoreShowSearchModal_mobile(false);
  searchStore.setstoreShowSearch_web(false);
});
</script>
<style scoped></style>
