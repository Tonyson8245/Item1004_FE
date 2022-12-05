<template>
  <div
    @click="
      toggleSearchWeb();
      toggleSearch();
    "
  >
    <headerComponentVue class="w-full z-50 top-0 absolute" />

    <router-view> </router-view>

    <div class="text-center w-full fixed bottom-0 sticky">
      <div
        class="md:hidden text-center text-xs sm:text-sm text-everly-dark_grey cursor-pointr w-full h-14 sm:h-16 grid grid-cols-3 border-t bg-everly-white"
      >
        <div class="flex flex-col justify-center items-center">
          <img src="@/assets/icon/chat_mobile.svg" class="mt-1" alt="" />
          <div>채팅</div>
        </div>
        <div
          class="flex flex-col justify-center items-center bg-everly-light_blue"
          @click="router.push('/home')"
          v-if="route.meta.name == `home`"
        >
          <img src="@/assets/icon/home_blue_mobile.svg" class="mt-1" alt="" />
          <div class="text-everly-main">홈</div>
        </div>
        <div
          class="flex flex-col justify-center items-center"
          @click="router.push('/home')"
          v-else
        >
          <img src="@/assets/icon/home_grey_mobile.svg" class="mt-1" alt="" />
          <div class="text-everly-main">홈</div>
        </div>

        <div class="flex flex-col justify-center items-center">
          <img src="@/assets/icon/mypage_mobile.svg" class="mt-1" alt="" />
          <div>내 날개</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { useSearchStore } from "@/store/modules/home/searchStore";
import { useFilterStore } from "@/store/modules/home/filterStore";
import headerComponentVue from "../components/header/headerComponent.vue";
import { storeToRefs } from "pinia";

//라우터 생성
const router = useRouter();
const route = useRoute();

const filterStore = useFilterStore();

//검색창 활성화 값 가져오기
const searchStore = useSearchStore();
const { storeShowSearch_web } = storeToRefs(searchStore);

//웹 검색창 비활성화
function toggleSearchWeb() {
  if (storeShowSearch_web) {
    searchStore.setstoreShowSearch_web(false);
  }
}

//웹 필터 검색창 비활성화
function toggleSearch() {
  filterStore.setstoreShowGameSimilar(false);
  filterStore.setstoreShowServerSimilar(false);
}
</script>
<style lang="scss"></style>
