<template>
  <div>
    <!-- 웹 메인 헤더  -->
    <div class="flex cursor-default bg-[#fafafa] top-0 z-50 md:flex">
      <div class="flex-1 hidden md:block border-b"></div>
      <div class="flex-none hidden md:block border-b">
        <div
          class="flex-none flex justify-between items-center bg-[#fafafa] w-[1180px] px-4 py-4 md:px-0"
        >
          <div class="hidden md:flex space-x-6">
            <img
              src="@/assets/icon/logo.gif"
              alt=""
              @click="moveLink('/home')"
              class="w-[11rem] h-[3.3rem] cursor-pointer"
            />
          </div>
          <div class="hidden md:block">
            <div class="flex space-x-4 items-center">
              <!-- <img
                class="cursor-pointer"
                src="@/assets/icon/noti_grey.svg"
                alt=""
                @click="moveExternalLink('공지사항')"
              /> -->
              <button @click="moveExternalLink('공지사항')">공지사항</button> 
              <!-- <img
                class="cursor-pointer"
                src="@/assets/icon/chat_mid-grey.svg"
                alt=""
                @click="moveLink('/chat')"
              /> -->
              <button @click="moveLink('/chat')">채팅</button> 

              <!-- <img
                class="cursor-pointer"
                src="@/assets/icon/notify_mid-grey.svg"
                alt=""
                @click="alertMSG()"
              /> -->
              <button @click="alertMSG()">알림</button> 

              <!-- <img
                class="cursor-pointer"
                src="@/assets/icon/profile_mid-grey.svg"
                @click="moveLink('/mypage')"
                alt=""
              /> -->
              <button @click="moveLink('/mypage')">마이페이지</button> 

            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 hidden md:block border-b"></div>
    </div>
    <!-- 모바일 메인 헤더 -->
    <div
      class="w-full bg-everly-main px-4 py-3 cursor-default top-0 md:hidden z-20 fixed"
      v-if="route.meta.name == `home`"
    >
      <div class="flex justify-between items-center">
        <div
          class="text-white font-bold truncate"
          @click="
            if (userNickname != '로그인하기') moveLink('/mypage');
            else moveLink('/account/login');
          "
        >
          {{ userNickname }}
        </div>
        <div class="md:hidden">
          <div class="flex space-x-4">
            <img
              class="cursor-pointer"
              src="@/assets/icon/filter_white.svg"
              alt=""
              @click="toggleFilter_mobile()"
            />
            <!--  TODO 1차 출시 주석 2023-01-25 20:23:22 -->
            <!-- <img
              src="@/assets/icon/search_white.svg"
              alt=""
              @click="moveLink('/search')"
            /> -->
            <img
              class="cursor-pointer"
              src="@/assets/icon/search_white.svg"
              alt=""
              @click="alertMSG()"
            />

            <img
              class="cursor-pointer"
              src="@/assets/icon/notify_white.svg"
              alt=""
              @click="alertMSG()"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 헤더끝 -->
    <div class="z-10">
      <div v-if="route.meta.name == `home`">
        <HomeHeader />
      </div>
      <div v-else><CommonHeader /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeHeader from "./homeHeader.vue";
import CommonHeader from "./commonHeader.vue";
import { useSearchStore } from "../../store/modules/home/searchStore";
import { useRouter, useRoute } from "vue-router";
import { computed, watch, ref } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { useFilterStore } from "@/store/modules/home/filterStore";
import { useCommonStore } from "@/store/modules/common/commonStore";
import { storeToRefs } from "pinia";
import type { user } from "@/domain/user/user.interface";
import { alertMSG, moveExternalLink } from "@/common";

//localstorage 가져오기
const localData = localStorage.getItem("user");
const refreshTokenData = localStorage.getItem("refreshToken");

const userNickname =
  refreshTokenData == null || localData == null
    ? `로그인하기`
    : (JSON.parse(localData) as user).nickname;

//store 가져오기
const searchStore = useSearchStore();
const filterStore = useFilterStore();
const commonStore = useCommonStore();
//라우터 만들기
const router = useRouter();
const route = useRoute();

//닉네임 끄기

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
    // commonStore.setstoreTempfilter();
  } else filterStore.cancelstoreFilter();

  filterStore.setstoreShowFilter_mobile(!storeShowFilter_mobile.value);
}

// 페이지 이동
function moveLink(link: string) {
  if (link == "/search") {
    filterStore.setstoreShowFilter_mobile(false);
    router.push("/search");
  } else if (link == "/account/login") {
    if (userNickname == `로그인하기`) router.push(link);
  } else if (link == "/mypage") {
    var refreshTokenData = localStorage.getItem("refreshToken");
    if (refreshTokenData == null) {
      router.push("/account/login");
      return;
    }
    router.push("/mypage");
  } else router.push(link);
}
</script>
<style scoped></style>
