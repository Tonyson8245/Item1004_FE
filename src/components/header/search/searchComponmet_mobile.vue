<template>
  <div class="h-screen fixed z-50 bg-white w-screen fixed">
    <div class="border-b-2 w-full bg-white">
      <div
        class="text-center text-everly-dark_grey flex md:invisible cursor-default w-full flex items-center"
      >
        <div class="flex-none mr-3 pl-3 py-2" @click="router.push('/home')">
          <img src="@/assets/icon/arrow_left.png" alt="" />
        </div>
        <div class="flex-grow py-2 pr-3">
          <div
            class="bg-everly-light_blue w-full h-full flex rounded-xl flex items-center"
          >
            <div class="m-2 mr-3 w-1/12">
              <div
                v-if="storeSellBuy == `sell`"
                class="bg-everly-main text-everly-white rounded-xl text-sm sm:text-base p-1"
                @click="toggleSellBuy('buy')"
              >
                팜
              </div>
              <div
                v-if="storeSellBuy == `buy`"
                @click="toggleSellBuy('sell')"
                class="bg-everly-red text-everly-white rounded-xl text-sm sm:text-base p-1"
              >
                삼
              </div>
            </div>
            <input
              placeholder="검색어를 입력해주세요"
              v-model="storeKeyword"
              @input="(event : Event) => setKeyword((event.target as HTMLInputElement).value)"
              style="background-color: transparent"
              class="w-full rounded-l-lg py-3 pr-4 text-[#6B7280] text-sm bg-opacity-100 sm:text-lg"
            />
            <div class="rounded-r-lg m-2">
              <img src="@/assets/icon/search_blue_mobile.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 뱃지 -->
    <div class="bg-everly-white cursor-default md:hidden z-50 overflow-x-auto">
      <div class="bg-[#fafafa]" v-if="conditionBadge_mobile">
        <div class="flex-1 pr-2"></div>
        <div class="flex-none flex p-3 space-x-3 h-12 px-6">
          <!-- 게임머니 뱃지 -->
          <div
            class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default whitespace-nowrap"
            v-if="storeCategoryGamemoney"
          >
            <span>게임머니</span>
          </div>
          <!-- 아이템 뱃지-->
          <div
            class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default whitespace-nowrap"
            v-if="storeCategoryItem"
          >
            <span>아이템</span>
          </div>
          <!-- 캐릭터 뱃지-->
          <div
            class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default whitespace-nowrap"
            v-if="storeCategoryCharacter"
          >
            <span>캐릭터</span>
          </div>
          <!-- 기타 뱃지-->
          <div
            class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default whitespace-nowrap"
            v-if="storeCategoryEtc"
          >
            <span>기타</span>
          </div>
          <!-- 게임/게임서버 뱃지-->
          <div
            class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default whitespace-nowrap"
            v-if="storeServerKeyword != ''"
          >
            <span>{{ storeGameKeyword }} - {{ storeServerKeyword }}</span>
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
      <div class="text-sm px-6 py-2 text-everly-dark_grey" v-else>
        필터 설정이 없습니다. 홈화면에서 설정해주세요.
      </div>
    </div>
    <div>
      <!-- 최근 검색어 목록 -->
      <div v-if="storeKeyword == ''">
        <div
          class="flex justify-between text-sm py-3 px-6 sm:text-lg font-bold"
        >
          <span>최근 검색하신 내역이에요</span>
        </div>
        <ul class="list-none overflow-hidden pb-2 px-1">
          <li v-for="value in storeRecentKeywords">
            <div
              class="flex duration-300 hover:bg-[#e9e9fd] bg-white"
              @click="
                clickKeyword(value.text);
                changeSellBuy(value.type);
              "
            >
              <recentKeyword class="w-full" :value="value" />
            </div>
          </li>
        </ul>
      </div>
      <!-- 유사 검색어 -->
      <div class="bg-white py-5 px-7" v-if="storeKeyword != ''">
        <ul class="list-none overflow-hidden pb-2">
          <li v-for="value in storeSimilarKeywords">
            <div
              class="flex duration-300 bg-white py-1 md:p-0"
              @click="clickKeyword(value)"
            >
              <SimilarKeywordComponent class="w-full" :value="value" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import SimilarKeywordComponent from "./similarKeywordComponent.vue";
import recentKeyword from "./recentKeywordComponent.vue";
import { useSearchStore } from "@/store/modules/home/searchStore";
import { storeToRefs } from "pinia";
import { ref, computed, watch, onMounted } from "vue";
import { debounce } from "vue-debounce";
import { useMediaQuery } from "@vueuse/core";
import { useFilterStore } from "@/store/modules/home/filterStore";
import { useCommonStore } from "@/store/modules/common/commonStore";

const router = useRouter();
const commonStore = useCommonStore();
//모바일 검색창 활성화/비활성화 버튼
const searchStore = useSearchStore();

const filterStore = useFilterStore();

const { storeServerKeyword, storeGameKeyword } = storeToRefs(commonStore);

const {
  storeCategoryCharacter,
  storeCategoryEtc,
  storeCategoryGamemoney,
  storeCategoryItem,
} = storeToRefs(filterStore);

//팔래요/살래요 , 검색창 값, 최근 검색어 가져오기
const {
  storeKeyword,
  storeSellBuy,
  storeRecentKeywords,
  storeSimilarKeywords,
} = storeToRefs(searchStore);

//검색창 활성화 값 가져오기
const listmode = ref("recent");

//검색창에 값을 입력해서 storeKeyword 값을 변경
function clickKeyword(keyword: string | null) {
  if (keyword == null) {
    searchStore.setstoreKeyword("");
    listmode.value = "recent"; //값이 없을 경우 최근 검색
  } else {
    searchStore.setstoreKeyword(keyword);
    listmode.value = "similar"; //값이 있을 경우 유사 검색어
  }
}
//debounce는 0.6초 뒤에 값 적용되게 해주는 함수
const setKeyword = debounce((keyword: string | null) => {
  if (keyword == null) searchStore.setstoreKeyword("");
  else searchStore.setstoreKeyword(keyword);
}, 600);

//살래요 팔래요 변경
function changeSellBuy(type: string) {
  if (type == "buy") searchStore.setstoreSellBuy("buy");
  else searchStore.setstoreSellBuy("sell");
}

//화면 커질 때, 모바일 검색 화면 끄는 것
let isLargeScreen = computed(() => useMediaQuery("(min-width: 800px)"));
watch(isLargeScreen.value, () => {
  if (isLargeScreen.value.value) router.push("/home");
});

//화면 로드할때 웹화면이면 메인으로 보내버리기
onMounted(() => {
  if (isLargeScreen.value.value) router.push("/home");
});

function closeFilterBadge(type: string) {
  if (type == "gameServer") {
    commonStore.setstoreGameKeyword("", 0);
    commonStore.setstoreShowServerFilter(false);
    commonStore.setstoreServerKeyword("");
  } else filterStore.changeCategory(type);
}

//필터가 있을때만 뱃지가 보이는 값
const conditionBadge_mobile = computed(() => {
  if (filterStore.storeShowFilter_mobile) return false;
  else if (
    !filterStore.storeCategoryGamemoney &&
    !filterStore.storeCategoryEtc &&
    !filterStore.storeCategoryItem &&
    !filterStore.storeCategoryCharacter &&
    commonStore.storeGameKeyword == "" &&
    commonStore.storeServerKeyword == ""
  )
    return false;
  else return true;
});

// 팜삼 변경
function toggleSellBuy(type: string) {
  if (type == `sell`) searchStore.setstoreSellBuy("sell");
  else searchStore.setstoreSellBuy("buy");
}
</script>
<style scoped>
input:focus {
  outline: none;
}
</style>
