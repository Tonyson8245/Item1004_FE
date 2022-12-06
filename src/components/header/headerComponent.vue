<template>
  <div>
    <!-- 웹 메인 헤더  -->
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
    <!-- 모바일 메인 헤더 -->
    <div
      class="w-full bg-everly-main px-4 py-3 cursor-default top-0 md:hidden z-50 fixed"
      v-if="route.meta.name == `home`"
    >
      <div class="flex justify-between items-center">
        <div class="text-white font-bold">로그인하기</div>
        <div class="md:hidden">
          <div class="flex space-x-4">
            <img
              src="@/assets/icon/filter_white.svg"
              alt=""
              @click="toggleFilter_mobile()"
            />
            <img
              src="@/assets/icon/search_white.svg"
              alt=""
              @click="moveLink('/search')"
            />

            <img src="@/assets/icon/notify_white.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- 헤더끝 -->
    <div v-if="route.meta.name == `home`">
      <HomeHeader />
    </div>
    <div v-else>
      <CommonHeader />
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeHeader from "./homeHeader.vue";
import CommonHeader from "./commonHeader.vue";
import { useSearchStore } from "../../store/modules/home/searchStore";
import { useRouter, useRoute } from "vue-router";
import { computed, watch } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { useFilterStore } from "@/store/modules/home/filterStore";
import { useCommonStore } from "@/store/modules/common/commonStore";
import { storeToRefs } from "pinia";

//store 가져오기
const searchStore = useSearchStore();
const filterStore = useFilterStore();
const commonStore = useCommonStore();
//라우터 만들기
const router = useRouter();
const route = useRoute();

//화면 커질 때, 모바일 검색 화면 끄는 것
let isLargeScreen = computed(() => useMediaQuery("(min-width: 800px)"));
watch(isLargeScreen.value, () => {
  if (isLargeScreen.value.value) {
    searchStore.setstoreShowSearch_web(false);
    filterStore.setstoreShowFilter_web(false);
    filterStore.setstoreShowFilter_mobile(false);
  }
});

//모바일 필터 키키
const { storeShowFilter_mobile } = storeToRefs(filterStore);
function toggleFilter_mobile() {
  if (!storeShowFilter_mobile.value) {
    filterStore.setstoreTempfilter();
    commonStore.setstoreTempfilter();
  } else filterStore.cancelstoreFilter();

  filterStore.setstoreShowFilter_mobile(!storeShowFilter_mobile.value);
}

// 페이지 이동
function moveLink(link: string) {
  if (link == "/search") {
    filterStore.setstoreShowFilter_mobile(false);
    router.push("/search");
  }
}
</script>
<style scoped></style>
