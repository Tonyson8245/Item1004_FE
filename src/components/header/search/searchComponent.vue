<template>
  <div>
    <div
      class="dropdown-wrapper w-full border border-everly-main rounded-xl overflow-hidden bg-everly-white"
    >
      <div class="flex items-center h-[3.6rem]">
        <sellbuyBadge class="pl-4 py-3" :type="storeSellBuy" />
        <!-- TODO 1차 출시 주석 2023-01-25 20:34:19 -->
        <!-- <input
          @click="toggleSearch()"
          placeholder="게임명 또는 서버명을 입력해주세요."
          :class="bottomBorder"
          v-model="storeKeyword"
          @input="(event : Event) => setKeyword((event.target as HTMLInputElement).value)"
          class="w-full rounded-l-lg bg-white py-4 px-0 text-[#6B7280] outline-none text-sm"
        /> -->
        <div
          @click="alertMSG()"
          class="flex-grow rounded-l-lg bg-transparent py-4 px-0 outline-none text-sm cursor-not-allowed"
        >
          <input
            disabled
            placeholder="검색 기능은 준비 중입니다. 필터를 이용해주세요"
            :class="bottomBorder"
            v-model="storeKeyword"
            @input="(event : Event) => setKeyword((event.target as HTMLInputElement).value)"
            class="w-full rounded-l-lg bg-transparent py-4 px-0 outline-none text-sm cursor-not-allowed"
          />
        </div>
        <div
          class="bg-transparent px-4 py-4 cursor-pointer flex items-center"
          @click="toggleFilter_web()"
        >
        <!-- 2023-01-31 17:25:37 기능 완료 될 때까지 숨김 처리 -->
          <button class=" bg-everly-main px-2 py-1 m-1 rounded-lg w-12 text-center text-white" >
            필터
          </button>
          <!-- <img src="@/assets/icon/filter_blue.svg" alt="" /> -->
        </div>
        <div
          class="bg-everly-main rounded-r-lg py-[0.5rem] px-1 cursor-not-allowed"
        >
          <img src="@/assets/icon/search_white_large.svg" alt="" />
        </div>
      </div>
      <div v-if="storeShowSearch_web" class="w-full">
        <hr class="mx-2 h-0.5 bg-gray-200 border" />
      </div>
      <div class="w-full overflow-hidden">
        <div
          class="dropdown-menu text-everly-dark_grey rounded-lg z-40 w-full shadow-lg text-xs md:text-sm"
          v-if="storeShowSearch_web"
        >
          <!-- 최근 검색어 -->
          <div class="bg-white" v-if="storeKeyword == ''">
            <div class="flex justify-between p-3 pr-0 pb-1 w-11/12">
              <span>최근검색어</span>
              <span>전체삭제</span>
            </div>
            <ul class="list-none overflow-hidden pb-2">
              <li v-for="value in storeRecentKeywords">
                <div
                  class="flex duration-300 hover:bg-[#e9e9fd] bg-white"
                  @click="
                    toggleSearch();
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
          <div class="bg-white py-3 px-5" v-if="storeKeyword != ''">
            <ul class="list-none overflow-hidden pb-2">
              <li v-for="value in storeSimilarKeywords">
                <div
                  class="flex duration-300 bg-white"
                  @click="
                    toggleSearch();
                    clickKeyword(value);
                  "
                >
                  <similarKeywordComponente class="w-full" :value="value" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import recentKeyword from "./recentKeywordComponent.vue";
import sellbuyBadge from "../../common/sellbuyBadge.vue";
import similarKeywordComponente from "./similarKeywordComponent.vue";

import { ref, watch } from "vue";
import { useSearchStore } from "../../../store/modules/home/searchStore";
import { useFilterStore } from "../../../store/modules/home/filterStore";
import { useCommonStore } from "../../../store/modules/common/commonStore";
import { debounce } from "vue-debounce";
import { storeToRefs } from "pinia";
import { alertMSG } from "@/common";

//팔래요/살래요 , 검색창 값, 최근 검색어 가져오기
const searchStore = useSearchStore(); // 검색 store 가져오기
//필터 store 가져오기
const filterStore = useFilterStore();
const commonStore = useCommonStore();

const {
  storeKeyword,
  storeSellBuy,
  storeRecentKeywords,
  storeShowSearch_web,
  storeSimilarKeywords,
} = storeToRefs(searchStore); // 검색 store의 검색어와 살래요/팔래요, 웹 검색 창 설정 값 가져오기

//검색창 활성화 값 가져오기
const listmode = ref("recent");

//검색창 활성화/비활성화
function toggleSearch() {
  searchStore.setstoreShowSearch_web(!storeShowSearch_web.value);
  //웹 필터 끄기
  filterStore.setstoreShowFilter_web(false);
  commonStore.setstoreShowGameSimilar(false);
  commonStore.setstoreShowServerSimilar(false);
}

//검색 시 검색 창 모양 바꿔주는 것
let bottomBorder = ref("");
watch(storeShowSearch_web, () => {
  if (storeShowSearch_web.value) {
    bottomBorder.value = "border-0";
  } else {
    bottomBorder.value = "";
  }
});

//검색창에 값을 입력해서 storeKeyword 값을 변경
function clickKeyword(keyword: string | null) {
  if (keyword == null) {
    searchStore.setstoreKeyword("");
    listmode.value = "recent"; // 값이 없을 경우 최근 검색
  } else {
    searchStore.setstoreKeyword(keyword);
    listmode.value = "similar"; // 값이 있을 경우 유사 검생어
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

const {
  storeShowFilter_web,
  filterStoreGameKeyword,
  filterStoreGameKeywordIdx,
  filterStoreServerKeyword,
  filterStoreServerKeywordIdx,
} = storeToRefs(filterStore);

function toggleFilter_web() {
  //활성화 할때, 기존 필터와 변경될 필터 값과 비교하기 위해서 저장해둠
  if (!storeShowFilter_web.value) {
    var gameKeyword = filterStoreGameKeyword.value;
    var gameKeywordIdx = filterStoreGameKeywordIdx.value;
    var serverKeyword = filterStoreServerKeyword.value;
    var serverKeywordIdx = filterStoreServerKeywordIdx.value;

    filterStore.setstoreTempfilter(); //  필터 정보를 저장해둠
    filterStore.setstoreTempfilter(); // 필터 정보를 불러옴
    commonStore.setstoreGameServerFilter(
      gameKeyword,
      serverKeyword,
      gameKeywordIdx,
      serverKeywordIdx
    ); // 필터 정보를 불러옴

    //commonStore에 게임, 서버 필터 값 넣어두기
  } else filterStore.cancelstoreFilter();

  searchStore.setstoreShowSearch_web(false); //  검색 컴포넌트 끄기
  filterStore.setstoreShowFilter_web(!storeShowFilter_web.value); // 필터 컴포넌트 켜기
}
</script>

<style scoped></style>
