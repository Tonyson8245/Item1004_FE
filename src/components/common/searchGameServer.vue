<template>
  <div class="w-full">
    <div class="flex relative">
      <input
        :placeholder="placeholder"
        @click="toggleSearch()"
        v-model="inputKeyword"
        @input="(event: Event) => {
  setTempKeyword((event.target as HTMLInputElement).value); offServerFilter();
}"
        class="bg-white text-[#6B7280] px-3 outline-none text-sm py-2 border-everly-mid_grey border-b w-full md:w-[220px]"
      />
      <div class="absolute right-3 top-2 md:right-10 md:top-2">
        <img src="@/assets/icon/circle_search_grey.svg" alt="" class="w-6" />
      </div>
    </div>
    <div
      class="absolute w-full left-0 md:left-auto md:w-[220px] z-30 px-5 md:px-0"
    >
      <div
        class="text-everly-dark_grey rounded-b-xl border border-everly-mid_grey bg-white overflow-hidden"
        v-if="props.status"
      >
        <ul class="list-none rounded">
          <li
            v-for="value in props.smiliarlist"
            class="flex items-center px-3 hover:bg-[#e9e9fd] cursor-pointer"
            @click="clickKeyword(value)"
          >
            <div>
              <img
                src="@/assets/icon/arrow_rightup_grey.svg"
                class="pr-4"
                alt=""
              />
            </div>
            <div href="" class="flex py-2 duration-300 text-sm">
              {{ value.name }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onUnmounted } from "vue";
import { useCommonStore } from "@/store/modules/common/commonStore";
import { debounce } from "vue-debounce";
import { storeToRefs } from "pinia";
import type { PropType } from "vue";
import type { GameDto } from "@/domain/home/gameDto";
import { useRoute } from "vue-router";
const route = useRoute();

const commonStore = useCommonStore();

const {
  commonStoreGameKeyword,
  commonStoreServerKeyword,
  storeTempGameKeyword,
  storeTempServerKeyword,
} = storeToRefs(commonStore);

const props = defineProps({
  smiliarlist: Object as PropType<GameDto[]>,
  status: Boolean,
  type: String,
});

let inputKeyword = ref("");

if (props.type == "game") inputKeyword = storeTempGameKeyword;
else inputKeyword = storeTempServerKeyword;

// 현재 type에 따라 들어갈 placeholder 를 결정
const placeholder = computed(() => {
  if (props.type == "game") return "게임명을 입력해주세요";
  else {
    if (route.meta.name == "write") return "서버명을 입력해주세요 ";
    else return "전체 서버";
  }
});

//현재 type에 따라 검색창 실행
function toggleSearch() {
  if (props.type == "game") {
    commonStore.setstoreShowGameSimilar(true);
    commonStore.setstoreShowServerSimilar(false);
  } else {
    commonStore.setstoreShowServerSimilar(true);
    commonStore.setstoreShowGameSimilar(false);
  }
}

//debounce는 0.6초 뒤에 값 적용되게 해주는 함수

const setTempKeyword = debounce((keyword: string | null) => {
  //값이 없을 경우는 초기화
  if (keyword == "") {
    if (props.type == "game") {
      commonStore.setstoreGameKeyword("", 0);
      commonStore.resetstoreGameSmilar();
    } else {
      commonStore.setstoreTempServerKeyword("");
      commonStore.setstoreServerKeyword("", 0);
      commonStore.resetstoreServerSmilar();
    }
  }
  //값이 있는 경우
  else if (keyword != "" && keyword != null) {
    //게임 검색일경우
    if (props.type == "game") {
      //기존값과 신규값이 다를 때만 갱신하도록 한다.
      if (
        commonStoreGameKeyword.value != storeTempGameKeyword.value ||
        commonStoreGameKeyword.value == ""
      ) {
        //값이 다르면 해당 키워드를 대입
        inputKeyword.value = keyword;
        commonStore.setstoreTempGameKeyword(keyword);
        commonStore.getstoreGamSmimilar(keyword);
      }
    }
    //서버 검색일 경우
    else {
      //기존값과 신규값이 다를 때만 갱신하도록 한다.
      if (
        commonStoreServerKeyword.value != storeTempServerKeyword.value ||
        commonStoreServerKeyword.value == ""
      ) {
        //값이 다르면 해당 키워드를 대입
        inputKeyword.value = keyword;
        commonStore.setstoreTempServerKeyword(keyword);
        commonStore.getstoreServerKeyword(keyword);
      }
    }
  }
}, 200);

//검색어가 바뀌면 서버 검색 꺼버리기
function offServerFilter() {
  if (props.type == "game") commonStore.setstoreShowServerFilter(false);
}

// 검색 리스트를 클릭했을 경우
function clickKeyword(value: GameDto) {
  let name = value.name;
  let idx = value.idx;

  //type에 따라서 해당 값을 store에 저장
  if (props.type == "game") {
    commonStore.setstoreGameKeyword(name, idx); // 해당값을 저장
    commonStore.setstoreTempGameKeyword(name); // 임시값도 통일
    commonStore.resetstoreGameSmilar(); // 리스트 초기화
    //서버 검색 키기
    commonStore.setstoreShowServerFilter(true);
  } else {
    commonStore.setstoreServerKeyword(name, idx);
    commonStore.setstoreTempServerKeyword(name);
    commonStore.resetstoreServerSmilar();
  }
  // 리스트 닫기
  commonStore.setstoreShowServerSimilar(false);
  commonStore.setstoreShowGameSimilar(false);
}

// 서버가 검색되어 있는 상태에서, 값을 변경하려고하면 모두 지워짐
watch(storeTempServerKeyword, () => {
  if (
    commonStoreServerKeyword.value != "" &&
    commonStoreServerKeyword.value != storeTempServerKeyword.value
  ) {
    commonStore.setstoreTempServerKeyword("");
    commonStore.setstoreServerKeyword("", 0);
  }
});

// 게임이 검색되어 있는 상태에서, 값을 변경하려고하면 모두 지워짐
watch(storeTempGameKeyword, () => {
  if (
    commonStoreGameKeyword.value != "" &&
    commonStoreGameKeyword.value != storeTempGameKeyword.value
  ) {
    commonStore.setstoreTempGameKeyword("");
    commonStore.setstoreGameKeyword("", 0);
  }
});
</script>

<style scoped></style>
