<template>
  <div>
    <div
      class="dropdown-wrapper w-full border border-everly-main rounded-lg overflow-hidden bg-everly-white"
      @click="toggleFilter_web()"
    >
      <div class="flex items-center h-[2.5rem] pl-4" :class="props.propsClass">
        <div
          class="flex-grow rounded-l-lg bg-transparent py-4 px-0 outline-none text-sm"
        >
          <input
            disabled
            :class="bottomBorder"
            v-model="storeKeyword"
            placeholder="필터를 통해 게임 아이템 검색하기"
            @input="(event : Event) => setKeyword((event.target as HTMLInputElement).value)"
            class="w-full rounded-l-lg bg-transparent py-4 px-0 outline-none text-sm"
          />
        </div>
        <div
          class="bg-transparent px-2 py-4 cursor-pointer flex items-center"
          @click="toggleFilter_web()"
        >
          <button
            class="bg-everly-main px-2.5 py-1.5 rounded-lg text-center text-white text-xs"
          >
            필터
          </button>
        </div>
        <div
          @click="toggleFilter_web()"
          class="bg-everly-main rounded-r-lg w-10"
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
    <!-- 웹 배찌 -->
    <div>
      <div>
        <div class="w-full flex py-2" v-if="conditionBadge">
          <div class="flex-1"></div>
          <div class="flex-none flex space-x-3 h-6" :class="props.propsClass">
            <!-- 게임머니 베찌 -->
            <div
              class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default"
              v-if="storeCategoryGamemoney"
            >
              <span>게임머니</span
              ><img
                src="@/assets/icon/close_white.svg"
                class="w-2"
                alt=""
                @click="closeFilterBadge(`gameMoney`)"
              />
            </div>
            <!-- 아이템 베찌-->
            <div
              class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default"
              v-if="storeCategoryItem"
            >
              <span>아이템</span
              ><img
                src="@/assets/icon/close_white.svg"
                class="w-2"
                alt=""
                @click="closeFilterBadge(`item`)"
              />
            </div>
            <!-- 캐릭터 베찌-->
            <div
              class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default"
              v-if="storeCategoryCharacter"
            >
              <span>캐릭터</span
              ><img
                src="@/assets/icon/close_white.svg"
                class="w-2"
                alt=""
                @click="closeFilterBadge(`character`)"
              />
            </div>
            <!-- 기타 베찌-->
            <div
              class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default"
              v-if="storeCategoryEtc"
            >
              <span>기타</span
              ><img
                src="@/assets/icon/close_white.svg"
                class="w-2"
                alt=""
                @click="closeFilterBadge(`etc`)"
              />
            </div>
            <!-- 게임/게임서버 베찌-->
            <div
              class="flex items-center space-x-2 bg-everly-dark_grey text-everly-white p-2 rounded-xl text-xs font-light cursor-default"
              v-if="storeGameServerBadge != ''"
            >
              <span>{{ storeGameServerBadge }}</span
              ><img
                src="@/assets/icon/close_white.svg"
                class="w-2"
                alt=""
                @click="closeFilterBadge(`gameServer`)"
              />
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
        <div v-else class="h-6"></div>
      </div>
    </div>
    <!-- 웹 필터 -->
    <div>
      <div
        class="flex cursor-default absolute w-full bg-[#fafafa] min-w-[1180px] pt-2 left-0 top-[5.1rem] border-b-2 z-10"
        v-if="storeShowFilter_web"
      >
        <div class="flex-1"></div>
        <div class="flex-none flex w-[73.75rem]">
          <div class="flex-none w-[13rem] block"></div>
          <div
            class="flex-none ml-2 border-everly-main border rounded-lg overflow-hidden bg-everly-white mb-12"
            :class="props.propsClass"
          >
            <div
              class="flex justify-between items-center py-2 px-5 text-lg bg-everly-main text-everly-white"
            >
              <div>필터를 설정해주세요</div>
              <div>
                <img
                  class="cursor-pointer"
                  src="@/assets/icon/close_white.svg"
                  alt=""
                  @click="closeFilter()"
                />
              </div>
            </div>
            <div class="p-1 py-6">
              <div class="flex w-full">
                <div class="flex-none px-5 py-10">카테고리</div>
                <div
                  class="grid grid-cols-4 gap-4 flex-grow justify-items-center"
                >
                  <!-- 게임머니 -->
                  <div
                    class="border border-everly-mid_grey w-[100px] h-[100px] rounded-xl flex items-center justify-center cursor-default"
                    v-if="!storeCategoryGamemoney"
                    @click="toggleCategory(`gameMoney`)"
                  >
                    <div class="text-center">
                      <img
                        src="@/assets/icon/gamemoney.svg"
                        alt=""
                        class="inline-block w-12"
                      />
                      <div class="flex items-center">
                        <div
                          class="rounded-full bg-everly-mid_grey w-2.5 h-2.5 mx-1"
                        ></div>
                        <div>게임머니</div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="border border-everly-main w-[100px] h-[100px] rounded-xl flex items-center justify-center cursor-default"
                    @click="toggleCategory(`gameMoney`)"
                    v-else
                  >
                    <div class="text-center">
                      <img
                        src="@/assets/icon/gamemoney_active.svg"
                        alt=""
                        class="inline-block w-12"
                      />
                      <div class="flex items-center">
                        <img
                          class="w-2.5 mx-1"
                          src="@/assets/icon/check_circle_blue.svg"
                          alt=""
                        />
                        <div>게임머니</div>
                      </div>
                    </div>
                  </div>
                  <!-- 아이템 -->
                  <div
                    class="border border-everly-mid_grey w-[100px] h-[100px] rounded-xl flex items-center justify-center"
                    v-if="!storeCategoryItem"
                    @click="toggleCategory(`item`)"
                  >
                    <div class="text-center">
                      <img
                        src="@/assets/icon/item.svg"
                        alt=""
                        class="inline-block w-12"
                      />
                      <div class="flex items-center">
                        <div
                          class="rounded-full bg-everly-mid_grey w-2.5 h-2.5 mx-1"
                        ></div>
                        <div>아이템</div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="border border-everly-main w-[100px] h-[100px] rounded-xl flex items-center justify-center cursor-default"
                    @click="toggleCategory(`item`)"
                    v-else
                  >
                    <div class="text-center">
                      <img
                        src="@/assets/icon/item_active.svg"
                        alt=""
                        class="inline-block w-12"
                      />
                      <div class="flex items-center">
                        <img
                          class="w-2.5 mx-1"
                          src="@/assets/icon/check_circle_blue.svg"
                          alt=""
                        />
                        <div>아이템</div>
                      </div>
                    </div>
                  </div>
                  <!-- 캐릭터 -->
                  <div
                    class="border border-everly-mid_grey w-[100px] h-[100px] rounded-xl flex items-center justify-center"
                    v-if="!storeCategoryCharacter"
                    @click="toggleCategory(`character`)"
                  >
                    <div class="text-center">
                      <img
                        src="@/assets/icon/character.svg"
                        alt=""
                        class="inline-block w-12"
                      />
                      <div class="flex items-center">
                        <div
                          class="rounded-full bg-everly-mid_grey w-2.5 h-2.5 mx-1"
                        ></div>
                        <div>캐릭터</div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="border border-everly-main w-[100px] h-[100px] rounded-xl flex items-center justify-center cursor-default"
                    @click="toggleCategory(`character`)"
                    v-else
                  >
                    <div class="text-center">
                      <img
                        src="@/assets/icon/character_active.svg"
                        alt=""
                        class="inline-block w-12"
                      />
                      <div class="flex items-center">
                        <img
                          class="w-2.5 mx-1"
                          src="@/assets/icon/check_circle_blue.svg"
                          alt=""
                        />
                        <div>캐릭터</div>
                      </div>
                    </div>
                  </div>
                  <!-- 기타 -->
                  <div
                    class="border border-everly-mid_grey w-[100px] h-[100px] rounded-xl flex items-center justify-center"
                    v-if="!storeCategoryEtc"
                    @click="toggleCategory(`etc`)"
                  >
                    <div class="text-center">
                      <img
                        src="@/assets/icon/etc.svg"
                        alt=""
                        class="inline-block w-12 py-3"
                      />
                      <div class="flex items-center">
                        <div
                          class="rounded-full bg-everly-mid_grey w-2.5 h-2.5 mx-1"
                        ></div>
                        <div>기타</div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="border border-everly-main w-[100px] h-[100px] rounded-xl flex items-center justify-center cursor-default"
                    @click="toggleCategory(`etc`)"
                    v-else
                  >
                    <div class="text-center">
                      <img
                        src="@/assets/icon/etc_active.svg"
                        alt=""
                        class="inline-block w-12 py-3"
                      />
                      <div class="flex items-center">
                        <img
                          class="w-2.5 mx-1"
                          src="@/assets/icon/check_circle_blue.svg"
                          alt=""
                        />
                        <div>기타</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="flex p-5">
                  <div class="flex w-1/2">
                    <div class="flex-none py-2">게임검색</div>
                    <div class="flex-grow pl-5">
                      <filterSearch
                        @click.stop=""
                        :smiliarlist="storeGameSimilar"
                        :status="storeShowGameSimilar"
                        :type="`game`"
                      />
                    </div>
                  </div>

                  <!-- TODO 1차 수정 2023-01-30 12:09:48 서버 검색 주석 처리함-->
                  <!-- <div class="flex w-1/2" v-show="storeShowServerFilter">
                          <div class="flex-none py-2">서버검색</div>
                          <div class="flex-grow pl-10">
                            <filterSearch
                              @click.stop=""
                              :smiliarlist="storeServerSimilar"
                              :status="storeShowServerSimilar"
                              :type="`server`"
                            />
                          </div>
                        </div> -->
                </div>
              </div>
              <div class="flex w-full justify-end px-5 space-x-3">
                <div
                  class="bg-everly-mid_grey text-everly-white px-4 py-2 rounded-lg flex hover:bg-[#3f52fc] cursor-default"
                  @click="refresh"
                >
                  <img
                    src="@/assets/icon/refresh_white.svg"
                    alt=""
                    class="pr-2"
                  />
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
          </div>
          <div class="flex-1 block"></div>
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import recentKeyword from "./recentKeywordComponent.vue";

import filterSearch from "../../common/searchGameServer.vue";
import similarKeywordComponente from "./similarKeywordComponent.vue";

import { ref, watch, computed } from "vue";
import { useSearchStore } from "../../../store/modules/home/searchStore";
import { useFilterStore } from "../../../store/modules/home/filterStore";
import { useCommonStore } from "../../../store/modules/common/commonStore";
import { debounce } from "vue-debounce";
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store/modules/home/mainStore";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  propsClass: String,
});

//팔래요/살래요 , 검색창 값, 최근 검색어 가져오기
const searchStore = useSearchStore(); // 검색 store 가져오기
//필터 store 가져오기
const filterStore = useFilterStore();
const commonStore = useCommonStore();

const {
  storeKeyword,
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
  filterStoreGameKeyword,
  filterStoreGameKeywordIdx,
  filterStoreServerKeyword,
  filterStoreServerKeywordIdx,
} = storeToRefs(filterStore);

const route = useRoute();
const router = useRouter();
function toggleFilter_web() {
  if (route.meta.name != `list`) {
    router.push("/list");
  }

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

//웹 필터

//필터 store 가져오기
const {
  storeGameSimilar,
  storeShowGameSimilar,
  commonStoreGameKeyword,
  commonStoreServerKeyword,
  commonStoreGameKeywordIdx,
  commonStoreServerKeywordIdx,
} = storeToRefs(commonStore);

const {
  storeShowFilter_web,
  storeCategoryGamemoney,
  storeCategoryItem,
  storeCategoryCharacter,
  storeCategoryEtc,
  storeTempCategory,
  storeGameServerBadge,
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
// 필터 닫기(취소)
function closeFilter() {
  filterStore.cancelstoreFilter();
  filterStore.setstoreShowFilter_web(false);

  //닫히는 경우, 이후에는 공통 스토어를 초기화시킨다.
  commonStore.reset();
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
const conditionBadge = computed(() => {
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

///필터로 불러오는 로직
const mainStore = useMainStore();
function loadList() {
  mainStore.setstoreLoad(true);
}
</script>

<style scoped></style>
