<template>
  <div
    class="h-screen fixed z-50 bg-white w-screen"
    v-if="storeShowSearchModal_mobile"
  >
    <div class="border-b w-full bg-white">
      <div
        class="text-center text-everly-dark_grey flex md:invisible cursor-default w-full px-3 py-3 flex items-center"
      >
        <div class="flex-none mr-3" @click="toggleSearchModal_Mobile()">
          <img src="@/assets/icon/arrow_left.png" alt="" />
        </div>
        <div class="flex-grow">
          <div
            class="bg-everly-light_blue w-full h-full flex rounded-xl flex items-center"
          >
            <div class="m-2 mr-3">
              <div
                v-if="storeSellBuy == `sell`"
                class="bg-everly-main text-everly-white rounded-xl text-sm sm:text-base p-1"
              >
                팜
              </div>
              <div
                v-if="storeSellBuy == `buy`"
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
      <div>필터 목록</div>
    </div>

    <div>
      <!-- 최근 검색어 목록 -->
      <div v-if="storeKeyword == ''">
        <div class="flex justify-between text-sm py-3 px-4 sm:text-lg">
          <span>최근 검색하신 내역이에요</span>
          <span>전체삭제</span>
        </div>
        <ul class="list-none overflow-hidden pb-2">
          <li v-for="value in storeRecentKeywodList">
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import recentKeyword from "./recentKeywordComponent.vue";
import { useSearchStore } from "@/store/modules/home/searchStore";
import { storeToRefs } from "pinia";
import { ref, onMounted, onUnmounted } from "vue";
import { debounce } from "vue-debounce";

//모바일 검색창 활성화/비활성화 버튼
const searchStore = useSearchStore();
const { storeShowSearchModal_mobile } = storeToRefs(searchStore);

//팔래요/살래요 , 검색창 값, 최근 검색어 가져오기
const { storeKeyword, storeSellBuy, storeRecentKeywodList } =
  storeToRefs(searchStore);

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

//모바일 검색 모달 설정 코드
function toggleSearchModal_Mobile() {
  searchStore.setstoreShowSearchModal_mobile(
    !storeShowSearchModal_mobile.value
  );
}
</script>
<style scoped>
input:focus {
  outline: none;
}
</style>
