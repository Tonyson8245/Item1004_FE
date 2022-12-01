<template>
  <div>
    <div
      class="dropdown-wrapper w-full border border-everly-main rounded-lg overflow-hidden"
    >
      <div class="flex">
        <sellbuyBadge class="pl-4" :type="storeSellBuy" />
        <input
          @click="toggleSearch()"
          placeholder="게임명 또는 서버명을 입력해주세요."
          :class="bottomBorder"
          v-model="storeKeyword"
          @input="(event : Event) => setKeyword((event.target as HTMLInputElement).value)"
          class="w-full rounded-l-lg bg-white py-4 pr-4 text-[#6B7280] outline-none text-sm"
        />
        <div class="bg-everly-main rounded-r-lg">
          <img src="@/assets/icon/search_white_large.svg" alt="" />
        </div>
      </div>
      <div v-if="storeShowSearch_web" class="w-full">
        <hr class="mx-2 h-0.5 bg-gray-200 border" />
      </div>
      <div class="w-full overflow-hidden">
        <div
          class="dropdown-menu text-everly-dark_grey rounded-lg z-10 w-full shadow-lg text-xs md:text-sm"
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
import { debounce } from "vue-debounce";
import { storeToRefs } from "pinia";

//팔래요/살래요 , 검색창 값, 최근 검색어 가져오기
const searchStore = useSearchStore(); // 검색 store 가져오기
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
</script>

<style scoped></style>
