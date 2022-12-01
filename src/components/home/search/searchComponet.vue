<template>
  <div>
    <div class="dropdown-wrapper w-full border border-everly-main rounded-lg">
      <div class="flex">
        <sellbuyBadge class="pl-4" :type="internalSellBuy" />
        <input
          @click="toggleSearch()"
          placeholder="게임명 또는 서버명을 입력해주세요."
          :class="bottomBorder"
          v-model="internalKeyword"
          @input="(event : Event) => setKeyword((event.target as HTMLInputElement).value)"
          class="w-full rounded-l-lg bg-white py-4 pr-4 text-[#6B7280] outline-none text-sm"
        />
        <div class="bg-everly-main rounded-r-lg">
          <img src="@/assets/icon/search_white_large.svg" alt="" />
        </div>
      </div>
      <div v-if="show" class="w-full">
        <hr class="mx-2 h-0.5 bg-gray-200 border" />
      </div>
      <transition name="fade" class="w-full overflow-hidden">
        <div
          class="dropdown-menu text-everly-dark_grey rounded-lg z-10 w-full shadow-lg text-xs md:text-sm"
          v-if="show"
        >
          <div class="bg-white">
            <!-- 최근검색어 페이지 listmode가 recent 일때, 보이게됨-->
            <div
              class="flex justify-between p-3 pr-0 pb-1 w-11/12"
              v-if="listmode == 'recent'"
            >
              <span>최근검색어</span>
              <span>전체삭제</span>
            </div>
            <ul class="list-none overflow-hidden pb-2">
              <li v-for="value in dummy_searchRecent">
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
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import searchModal from "@/components/home/search/searchModal.vue";
import { ref, watch, computed } from "vue";
import { useCommon } from "@/store/modules/ui/common";
import { useSearchStore } from "@/store/modules/home/searchStore";
import { debounce } from "vue-debounce";

import dummy_searchRecent from "@/dummy/home/searchRecent";
import recentKeyword from "@/components/home/search/recentKeywordComponent.vue";
import sellbuyBadge from "@/components/common/sellbuyBadge.vue";

//팔래요/살래요 , 검색창 값 가져오기
const searchStore = useSearchStore(); // 검색 store 가져오기
const storeKeyword = computed(() => searchStore.storeKeyword); // 검색 값 가져오기
const storeSellBuy = computed(() => searchStore.storeSellBuy); // 살래요/팔래요 값 가져오기
let internalKeyword = storeKeyword.value; // 값만 가져와서 별도로 구분
let internalSellBuy = storeSellBuy.value; // 값만 가져와서 별도로 구분

//검색창 활성화 값 가져오기
const commonStore = useCommon(); // 모달 store 가져오기
const show = computed(() => commonStore.showSearch); // 모달 상태 가져오기
const listmode = ref("recent");

//검색창 활성화/비활성화
function toggleSearch() {
  commonStore.setshowSearch(!show.value);
}

//검색 시 검색 창 모양 바꿔주는 것
let bottomBorder = ref("");
watch(show, () => {
  if (show.value) {
    bottomBorder.value = "border-0";
  } else {
    bottomBorder.value = "";
  }
});

//검색창에 값을 입력해서 storeKeyword 값을 변경
function clickKeyword(keyword: string | null) {
  if (keyword == null) searchStore.setstoreKeyword("");
  else {
    internalKeyword = keyword;
    searchStore.setstoreKeyword(keyword);
  }
}

//debounce는 0.6초 뒤에 값 적용되게 해주는 함수
const setKeyword = debounce((keyword: string | null) => {
  if (keyword == null) searchStore.setstoreKeyword("");
  else searchStore.setstoreKeyword(keyword);
}, 600);

//살래요 팔래요 변경
function changeSellBuy(type: string) {
  internalSellBuy = type;
  if (type == "buy") searchStore.setstoreSellBuy("buy");
  else searchStore.setstoreSellBuy("sell");
}
</script>

<style scoped></style>
