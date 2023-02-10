<template>
  <div>
    <div class="cursor-pointer min-w-[120rem] h-[5rem] w-full">
      <div class="flex w-full cursor-pointer">
        <div class="flex-grow"></div>
        <div class="flex-grow-none">
          <img
            src="@/assets/img/banners/main_top_banner.webp"
            style="object-fit: none; width: 120rem; height: auto"
          />
        </div>
        <div class="flex-grow"></div>
      </div>
    </div>
    <!-- 웹 메인 헤더  -->
    <div class="flex cursor-default bg-[#fafafa] top-0 z-50 md:flex">
      <div class="flex-1 hidden md:block border-b"></div>
      <div class="flex-none hidden md:block border-b">
        <div
          class="flex-none flex justify-between items-start bg-[#fafafa] w-[1180px] px-4 pt-4 md:px-4"
        >
          <div class="hidden md:flex space-x-6">
            <img
              src="@/assets/icon/logo.gif"
              alt=""
              @click="moveLink('/home')"
              class="w-[11rem] h-[3.3rem] cursor-pointer"
            />
            <div class="flex justify-between items-center pt-3">
              <search
                v-if="route.meta.name == 'home' || route.meta.name == 'list'"
                :props-class="`w-[35.375rem]`"
                @click.stop=""
                style="z-index: 5"
              />
              <div v-else class="h-[4rem]"></div>
            </div>
          </div>
          <div class="hidden md:block text-sm md:pt-6">
            <div
              class="flex space-x-4 items-center"
              v-if="userNickname != '로그인하기'"
            >
              <div
                class="cursor-pointer flex"
                @click="moveExternalLink('공지사항')"
              >
                <div
                  class="bg-everly-light_blue rounded-full mr-2 w-5 flex justify-center items-center"
                >
                  <img
                    class="cursor-pointer"
                    src="@/assets/icon/noti_blue.svg"
                    alt=""
                  />
                </div>
                <button class="text-everly-dark_grey">공지사항</button>
              </div>
              <div
                class="cursor-pointer flex"
                @click="moveExternalLink('문의하기')"
              >
                <div
                  class="bg-everly-light_blue rounded-full mr-2 w-5 flex justify-center items-center"
                >
                  <img
                    class="cursor-pointer w-3"
                    src="@/assets/icon/customercenter_black.svg"
                    alt=""
                  />
                </div>
                <button class="text-everly-dark_grey">고객센터</button>
              </div>
              <div class="cursor-pointer flex" @click="moveLink('/chat')">
                <div
                  class="bg-everly-light_blue rounded-full mr-2 w-5 flex justify-center items-center"
                >
                  <img
                    class="cursor-pointer"
                    src="@/assets/icon/chat_blue.svg"
                    alt=""
                  />
                </div>
                <button class="text-everly-dark_grey">채팅</button>
              </div>
              <div class="cursor-pointer flex" @click="moveLink('/mypage')">
                <div
                  class="bg-everly-light_blue rounded-full mr-2 w-5 flex justify-center items-center"
                >
                  <img
                    class="cursor-pointer"
                    src="@/assets/icon/profile_blue.svg"
                    alt=""
                  />
                </div>
                <button class="text-everly-dark_grey">마이페이지</button>
              </div>
            </div>
            <div class="flex space-x-4 items-center" v-else>
              <div
                class="cursor-pointer flex"
                @click="moveLink('/account/login')"
              >
                <div
                  class="bg-everly-light_blue rounded-full mr-2 w-5 flex justify-center items-center"
                >
                  <img
                    class="cursor-pointer"
                    src="@/assets/icon/19.svg"
                    alt=""
                  />
                </div>
                <button class="text-everly-dark_grey">로그인하기</button>
              </div>

              <div
                class="cursor-pointer flex"
                @click="moveLink('/account/signup/confirm')"
              >
                <div
                  class="bg-everly-light_blue rounded-full mr-2 w-5 flex justify-center items-center"
                >
                  <img
                    class="cursor-pointer"
                    src="@/assets/icon/signup_blue.svg"
                    alt=""
                  />
                </div>
                <button class="text-everly-dark_grey">회원가입</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 hidden md:block border-b"></div>
    </div>
    <div v-if="route.meta.name == 'home' || route.meta.name == 'list'">
      <div class="flex cursor-default bg-[#fafafa]">
        <div class="flex-1 hidden md:block bg-[#fafafa]"></div>
        <div class="flex-none hidden md:block bg-[#fafafa]">
          <div class="flex-none w-[1180px] px-4">
            <div class="flex justify-between items-end py-3">
              <div class="flex space-x-6">
                <div class="flex space-x-1">
                  <img src="@/assets/icon/19.svg" alt="" class="w-4" />
                  <span> 아이템거래</span>
                </div>
                <div>OTT</div>
                <div>이벤트</div>
                <div>이용안내</div>
              </div>
              <div class="flex gap-x-4">
                <div
                  class="flex items-center cursor-pointer"
                  @click="router.push('/write')"
                >
                  <div
                    class="bg-everly-main rounded-full mr-2 w-5 h-5 flex justify-center items-center"
                  >
                    <img
                      class="cursor-pointer w-5"
                      src="@/assets/icon/button_write_mobile.svg"
                      alt=""
                    />
                  </div>
                  <a class="text-everly-main text-lg font-bold">거래등록</a>
                </div>
                <div
                  class="flex items-center cursor-pointer"
                  @click="router.push('/mypage/mileage/charge')"
                >
                  <div
                    class="bg-everly-main rounded-full mr-2 w-5 h-5 flex justify-center"
                  >
                    <img
                      class="cursor-pointer w-3"
                      src="@/assets/icon/charge_white.svg"
                      alt=""
                    />
                  </div>
                  <a class="text-everly-main text-lg font-bold"
                    >마일리지 충전</a
                  >
                </div>
                <div
                  class="flex items-center cursor-pointer"
                  @click="router.push('/mypage/mileage/withdraw')"
                >
                  <div
                    class="bg-everly-main rounded-full mr-2 w-5 h-5 flex justify-center items-center"
                  >
                    <img
                      class="cursor-pointer w-3"
                      src="@/assets/icon/withdraw_white.svg"
                      alt=""
                    />
                  </div>
                  <a class="text-everly-main text-lg font-bold"
                    >마일리지 출금</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 hidden md:block bg-[#fafafa]"></div>
      </div>
    </div>

    <!-- 헤더끝 -->
    <div class="z-10">
      <div v-if="route.meta.name != `home` && route.meta.name != `list`">
        <CommonHeader />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonHeader from "./commonHeader.vue";
import { useSearchStore } from "../../store/modules/home/searchStore";
import { useRouter, useRoute } from "vue-router";
import { computed, watch, ref } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { useFilterStore } from "@/store/modules/home/filterStore";
import type { user } from "@/domain/user/user.interface";
import { alertMSG, moveExternalLink } from "@/common";
import search from "./search/searchComponent.vue";

//localstorage 가져오기
const localData = localStorage.getItem("user");
const refreshTokenData = localStorage.getItem("refreshToken");

const userNickname =
  refreshTokenData == null || localData == null
    ? `로그인하기`
    : (JSON.parse(localData) as user).nickname;

//store 가져오기
const filterStore = useFilterStore();
const searchStore = useSearchStore();
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
  } else if (link == "/account/signUp/confirm") {
    if (userNickname == `로그인하기`) router.push(link);
  } else router.push(link);
}
</script>
<style scoped></style>
