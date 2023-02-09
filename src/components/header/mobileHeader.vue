<template>
  <div class="bg-[#fafafa] relative">
    <!-- 모바일 메인 헤더 -->
    <div
      class="w-full bg-everly-main px-4 py-3 cursor-default top-0 md:hidden z-20 fixed"
      v-if="route.meta.name == `home` || route.meta.name == `list`"
    >
      <div class="flex justify-between items-center">
        <div
          class="flex items-center text-white font-bold truncate"
          @click="
            if (userNickname != '로그인하기') moveLink('/mypage');
            else moveLink('/account/login');
          "
        >
          <img
            class="w-5 h-5 mr-1"
            v-if="userNickname === '로그인하기'"
            src="@/assets/icon/19.svg"
            alt=""
          />
          <p>{{ userNickname }}</p>
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
    <!-- 모바일 팔래요/살래요 -->
    <div
      class="bg-everly-white cursor-default md:hidden z-50 border-b w-full fixed top-[49px]"
    >
      <div class="flex w-full space-x-4 border-b p-4">
        <!--팔래요 활성화 -->
        <div
          class="flex space-x-1 w-[66px]"
          v-if="storeSellBuy == 'sell'"
          @click="toggleSellBuy('sell')"
        >
          <img src="@/assets/icon/check_mobile_blue.svg" alt="" />
          <span class="text-everly-main font-bold">팔래요</span>
        </div>
      </div>
    </div>

    <!-- 모바일 뱃지 -->
    <div
      class="bg-[#fafafa] overflow-x-auto fixed md:hidden top-[106px] w-full bg-opacity-50 z-10"
      v-if="conditionBadge_mobile"
    >
      <div class="flex p-3 space-x-3 h-12 px-6">
        <!-- 게임머니 베찌 -->
        <div
          class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default whitespace-nowrap pr-4"
          v-if="storeCategoryGamemoney"
          @click="closeFilterBadge(`gameMoney`)"
        >
          <span>게임머니</span
          ><img src="@/assets/icon/close_white.svg" class="w-2" alt="" />
        </div>
        <!-- 아이템 베찌-->
        <div
          class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default whitespace-nowrap pr-4"
          v-if="storeCategoryItem"
          @click="closeFilterBadge(`item`)"
        >
          <span>아이템</span
          ><img src="@/assets/icon/close_white.svg" class="w-2" alt="" />
        </div>
        <!-- 캐릭터 베찌-->
        <div
          class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default whitespace-nowrap pr-4"
          v-if="storeCategoryCharacter"
          @click="closeFilterBadge(`character`)"
        >
          <span>캐릭터</span
          ><img src="@/assets/icon/close_white.svg" class="w-2" alt="" />
        </div>
        <!-- 기타 베찌-->
        <div
          class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default whitespace-nowrap pr-4"
          v-if="storeCategoryEtc"
          @click="closeFilterBadge(`etc`)"
        >
          <span>기타</span
          ><img src="@/assets/icon/close_white.svg" class="w-2" alt="" />
        </div>
        <!-- 게임/게임서버 베찌-->
        <div
          class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default whitespace-nowrap pr-4"
          v-if="storeGameServerBadge != ''"
          @click="closeFilterBadge(`gameServer`)"
        >
          <span>{{ storeGameServerBadge }}</span
          ><img src="@/assets/icon/close_white.svg" class="w-2" alt="" />
        </div>
      </div>
    </div>

    <!-- 모바일 필터 -->
    <transition name="slide-down" move="out-in">
      <div
        class="md:hidden fixed w-full bg-everly-white min-h-[700px] h-screen flex flex-col z-10"
        v-if="storeShowFilter_mobile"
      >
        <!-- 카테고리 -->
        <div class="flex-none">
          <div
            class="text-xs text-everly-dark_grey bg-everly-light_grey w-full text-center py-3"
          >
            필터를 미리 설정하면 검색 정확도가 높아집니다.
          </div>
          <div class="px-4 text-xs sm:text-sm">
            <div class="text-center text-evelry_dark-grey py-3 sm:py-5">
              카테고리
            </div>
            <div class="grid grid-cols-4 gap-4">
              <!-- 게임머니 -->
              <div
                class="flex justify-center text-everly-dark cursor-default"
                v-if="storeCategoryGamemoney"
                @click="toggleCategory(`gameMoney`)"
              >
                <div
                  class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl border-everly-main"
                >
                  <div
                    class="flex flex-col items-center justify-center h-full w-full"
                  >
                    <img
                      src="@/assets/icon/gamemoney_active_mobile.svg"
                      class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                    />
                    <div>게임머니</div>
                  </div>
                </div>
              </div>
              <div
                class="flex justify-center text-everly-dark_grey cursor-default"
                @click="toggleCategory(`gameMoney`)"
                v-else
              >
                <div class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl">
                  <div
                    class="flex flex-col items-center justify-center h-full w-full"
                  >
                    <img
                      src="@/assets/icon/gamemoney_mobile.svg"
                      class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                    />
                    <div>게임머니</div>
                  </div>
                </div>
              </div>
              <!-- 아이템 -->
              <div
                class="flex justify-center text-everly-dark cursor-default"
                @click="toggleCategory(`item`)"
                v-if="storeCategoryItem"
              >
                <div
                  class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl border-everly-main"
                >
                  <div
                    class="flex flex-col items-center justify-center h-full w-full"
                  >
                    <img
                      src="@/assets/icon/item_active_mobile.svg"
                      class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                    />
                    <div>아이템</div>
                  </div>
                </div>
              </div>
              <div
                class="flex justify-center text-everly-dark_grey cursor-default"
                @click="toggleCategory(`item`)"
                v-else
              >
                <div class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl">
                  <div
                    class="flex flex-col items-center justify-center h-full w-full"
                  >
                    <img
                      src="@/assets/icon/item_mobile.svg"
                      class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                    />
                    <div>아이템</div>
                  </div>
                </div>
              </div>
              <!-- 캐릭터 -->
              <div
                class="flex justify-center text-everly-dark cursor-default"
                @click="toggleCategory(`character`)"
                v-if="storeCategoryCharacter"
              >
                <div
                  class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl border-everly-main"
                >
                  <div
                    class="flex flex-col items-center justify-center h-full w-full"
                  >
                    <img
                      src="@/assets/icon/character_active_mobile.svg"
                      class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                    />
                    <div>캐릭터</div>
                  </div>
                </div>
              </div>
              <div
                class="flex justify-center text-everly-dark_grey cursor-default"
                @click="toggleCategory(`character`)"
                v-else
              >
                <div class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl">
                  <div
                    class="flex flex-col items-center justify-center h-full w-full"
                  >
                    <img
                      src="@/assets/icon/character.svg"
                      class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                    />
                    <div>캐릭터</div>
                  </div>
                </div>
              </div>
              <!-- 기타 -->
              <div
                class="flex justify-center text-everly-dark cursor-default"
                @click="toggleCategory(`etc`)"
                v-if="storeCategoryEtc"
              >
                <div
                  class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl border-everly-main"
                >
                  <div
                    class="flex flex-col items-center justify-center h-full w-full"
                  >
                    <img
                      src="@/assets/icon/etc_active_mobile.svg"
                      class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                    />
                    <div>기타</div>
                  </div>
                </div>
              </div>
              <div
                class="flex justify-center text-everly-dark_grey cursor-default"
                @click="toggleCategory(`etc`)"
                v-else
              >
                <div class="w-16 h-16 sm:w-32 sm:h-32 border rounded-xl">
                  <div
                    class="flex flex-col items-center justify-center h-full w-full"
                  >
                    <img
                      src="@/assets/icon/etc_mobile.svg"
                      class="w-6 h-6 sm:w-20 sm:h-20 m-1 sm:m-2"
                    />
                    <div>기타</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 게임/게임서버 검색 -->
        <div class="flex-none">
          <div class="flex flex-col px-5">
            <div
              class="text-center text-xs text-evelry_dark-grey py-3 sm:py-5 mt-10 sm:text-sm"
            >
              게임검색
            </div>
            <filterSearch
              @click.stop=""
              :smiliarlist="storeGameSimilar"
              :status="storeShowGameSimilar"
              :type="`game`"
            />
          </div>
          <div
            class="flex-none flex flex-col px-5"
            v-show="storeShowServerFilter"
          >
            <div
              class="text-center text-xs text-evelry_dark-grey py-3 sm:py-5 mt-10 sm:text-sm"
            >
              서버검색
            </div>
            <filterSearch
              @click.stop=""
              :smiliarlist="storeServerSimilar"
              :status="storeShowServerSimilar"
              :type="`server`"
            />
          </div>
        </div>
        <div
          class="flex-none flex w-full justify-end px-5 space-x-3 absolute bottom-0 pb-[10rem]"
        >
          <div
            class="bg-everly-mid_grey text-everly-white px-4 py-2 rounded-lg flex hover:bg-[#3f52fc] cursor-default"
            @click="refresh"
          >
            <img src="@/assets/icon/refresh_white.svg" alt="" class="pr-2" />
            초기화
          </div>
          <div
            class="bg-everly-main text-everly-white px-4 py-2 rounded-lg flex cursor-default"
            @click="setFilter"
          >
            <img
              src="@/assets/icon/check_web_white.svg"
              alt=""
              class="pr-2"
            />필터적용
          </div>
        </div>
      </div>
    </transition>

    <!-- 웹 필터 있던곳 -->

    <!-- 필터가 없을때 생기는 공백 -->

    <!-- 뱃지가 있을때 -->
    <div v-if="storeShowFilter_web && conditionBadge" class="p-4"></div>
    <!-- 뱃지가 없을때 -->
    <div v-if="storeShowFilter_web && !conditionBadge" class="p-4"></div>
  </div>
  <div class="absolute bottom-0"></div>
</template>

<script setup lang="ts">
import filterSearch from "../common/searchGameServer.vue";
import { useSearchStore } from "../../store/modules/home/searchStore";
import { useCommonStore } from "../../store/modules/common/commonStore";
import { useFilterStore } from "../../store/modules/home/filterStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMainStore } from "@/store/modules/home/mainStore";
import { alertMSG } from "@/common";
import type { user } from "@/domain/user/user.interface";

const router = useRouter();
const route = useRoute();
//검색 store 가져오기
const searchStore = useSearchStore();

//살래요/팔래요 값 가져오기
const { storeSellBuy } = storeToRefs(searchStore);

function toggleSellBuy(type: string) {
  if (type == `sell`) searchStore.setstoreSellBuy("sell");
  else searchStore.setstoreSellBuy("buy");

  mainStore.resetsetstoreProductCard();
  mainStore.setstoreLoad(true);
}

//필터 store 가져오기
const commonStore = useCommonStore();
const {
  storeGameSimilar,
  storeServerSimilar,
  storeShowGameSimilar,
  storeShowServerSimilar,
  storeShowServerFilter,
  commonStoreGameKeyword,
  commonStoreServerKeyword,
  commonStoreGameKeywordIdx,
  commonStoreServerKeywordIdx,
} = storeToRefs(commonStore);

const filterStore = useFilterStore();
const {
  storeShowFilter_web,
  storeCategoryGamemoney,
  storeCategoryItem,
  storeCategoryCharacter,
  storeCategoryEtc,
  storeShowFilter_mobile,
  storeTempCategory,
  storeGameServerBadge,
  filterStoreGameKeyword,
  filterStoreServerKeyword,
} = storeToRefs(filterStore);

//필터 초기화(주의!! 닫기 아님)
function refresh() {
  filterStore.refresh();
  commonStore.reset();
  filterStore.refreshSearchGameServer();
}

function toggleCategory(category: string) {
  console.log(category);

  switch (category) {
    case "gameMoney":
      filterStore.setCategory([
        !storeCategoryGamemoney.value,
        storeCategoryItem.value,
        storeCategoryCharacter.value,
        storeCategoryEtc.value,
      ]);
      break;
    case "item":
      filterStore.setCategory([
        storeCategoryGamemoney.value,
        !storeCategoryItem.value,
        storeCategoryCharacter.value,
        storeCategoryEtc.value,
      ]);
      break;
    case "character":
      filterStore.setCategory([
        storeCategoryGamemoney.value,
        storeCategoryItem.value,
        !storeCategoryCharacter.value,
        storeCategoryEtc.value,
      ]);
      break;
    case "etc":
      filterStore.setCategory([
        storeCategoryGamemoney.value,
        storeCategoryItem.value,
        storeCategoryCharacter.value,
        !storeCategoryEtc.value,
      ]);
      break;
  }
}

// 필터 닫기(설정)
function setFilter() {
  filterStore.setstoreShowFilter_web(false);
  filterStore.setstoreShowFilter_mobile(false);
  //바뀌었을 경우만 실행
  if (!isSamefilter()) {
    mainStore.setstoreinfiniteStatus(true);
    mainStore.resetsetstoreProductCard();
    console.log("filtter 설정");
    filterStore.setstoreGameServerFilter(
      commonStoreGameKeyword.value,
      commonStoreServerKeyword.value,
      commonStoreGameKeywordIdx.value,
      commonStoreServerKeywordIdx.value
    );

    //값을 저장한 이후에는 공통 스토어를 초기화시킨다.
    loadList();
  }
  commonStore.reset();
}
//이전 필터와 동일한지 판단하는 로직
const isSamefilter = () => {
  var tempCategory = storeTempCategory.value;
  var nowCategory = [
    storeCategoryGamemoney.value,
    storeCategoryItem.value,
    storeCategoryCharacter.value,
    storeCategoryEtc.value,
  ];

  //common 에 저장된 값과 filter에 저장된 값을 비교하는 로직
  if (
    tempCategory.toString() == nowCategory.toString() &&
    commonStoreGameKeyword.value == filterStoreGameKeyword.value &&
    commonStoreServerKeyword.value == filterStoreServerKeyword.value
  )
    return true;
  else return false;
};
//필터 뱃지 설정
function closeFilterBadge(type: string) {
  if (type == "gameServer") {
    filterStore.refreshSearchGameServer();
  } else filterStore.changeCategory(type);
  mainStore.resetsetstoreProductCard();
  mainStore.setstoreLoad(true);
}

//필터가 있을때만 뱃지가 보이는 값
const conditionBadge_mobile = computed(() => {
  if (filterStore.storeShowFilter_mobile || filterStore.storeShowFilter_web)
    return false;
  else if (
    !filterStore.storeCategoryGamemoney &&
    !filterStore.storeCategoryEtc &&
    !filterStore.storeCategoryItem &&
    !filterStore.storeCategoryCharacter &&
    filterStore.storeGameServerBadge == ""
  )
    return false;
  else return true;
});

const conditionBadge = computed(() => {
  if (
    !filterStore.storeTempCategory[0] &&
    !filterStore.storeTempCategory[1] &&
    !filterStore.storeTempCategory[2] &&
    !filterStore.storeTempCategory[3] &&
    filterStore.storeGameServerBadge == ""
  )
    return false;
  else return true;
});

///필터로 불러오는 로직
const mainStore = useMainStore();
function loadList() {
  mainStore.setstoreLoad(true);
}

//localstorage 가져오기
const localData = localStorage.getItem("user");
const refreshTokenData = localStorage.getItem("refreshToken");

const userNickname =
  refreshTokenData == null || localData == null
    ? `로그인하기`
    : (JSON.parse(localData) as user).nickname;

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

//모바일 필터 키키
function toggleFilter_mobile() {
  if (!storeShowFilter_mobile.value) {
    filterStore.setstoreTempfilter();
    // commonStore.setstoreTempfilter();
  } else filterStore.cancelstoreFilter();

  filterStore.setstoreShowFilter_mobile(!storeShowFilter_mobile.value);
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
/*  */
.slide-down-enter-active {
  transition: all 0.2s ease-out;
}

.slide-down-leave-active {
  transition: all 0.2s ease-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-1000px);
}
</style>
