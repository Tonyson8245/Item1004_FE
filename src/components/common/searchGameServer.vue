<template>
  <div class="">
    <div class="flex relative">
      <input
        :placeholder="placeholder"
        @click="toggleSearch()"
        v-model="storeKeyword"
        @input="(event: Event) => { setKeyword((event.target as HTMLInputElement).value); offServerFilter(); }"
        class="bg-white text-[#6B7280] px-3 outline-none text-sm py-2 border-everly-mid_grey border-b w-[300px] md:w-[220px] bg-white"
      />
      <div class="absolute right-3 top-2 md:right-10 md:top-2">
        <img src="@/assets/icon/circle_search_grey.svg" alt="" class="w-6" />
      </div>
    </div>
    <div
      class="text-everly-dark_grey rounded-b-xl absolute border border-everly-mid_grey w-[300px] md:w-[220px] bg-white z-50"
      v-if="props.status"
    >
      <ul class="list-none overflow-hidden rounded">
        <li
          v-for="name in props.smiliarlist"
          class="flex items-center px-3 hover:bg-[#e9e9fd] cursor-default"
        >
          <div>
            <img
              src="@/assets/icon/arrow_rightup_grey.svg"
              class="pr-4"
              alt=""
            />
          </div>
          <div
            href=""
            class="flex py-2 duration-300 text-sm"
            @click="clickKeyword(name as string)"
          >
            {{ name }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useCommonStore } from "@/store/modules/common/commonStore";
import { debounce } from "vue-debounce";
import { storeToRefs } from "pinia";

const store = useCommonStore();

const { storeGameKeyword, storeServerKeyword } = storeToRefs(store);

const props = defineProps({
  smiliarlist: Array,
  status: Boolean,
  type: String,
});

let storeKeyword = ref("");

if (props.type == "game") storeKeyword = storeGameKeyword;
else storeKeyword = storeServerKeyword;

// 현재 type에 따라 들어갈 placeholder 를 결정
const placeholder = computed(() => {
  if (props.type == "game") return "게임명을 입력해주세요";
  else {
    return "서버명을 입력해주세요";
  }
});

//현재 type에 따라 검색창 실행
function toggleSearch() {
  if (props.type == "game") {
    store.setstoreShowGameSimilar(true);
    store.setstoreShowServerSimilar(false);
  } else {
    store.setstoreShowServerSimilar(true);
    store.setstoreShowGameSimilar(false);
  }
}

//debounce는 0.6초 뒤에 값 적용되게 해주는 함수
const setKeyword = debounce((keyword: string | null) => {
  if (props.type == "game") {
    if (keyword == null) store.setstoreGameKeyword("");
    else store.setstoreGameKeyword(keyword);
  } else {
    if (keyword == null) store.setstoreServerKeyword("");
    else store.setstoreServerKeyword(keyword);
  }
}, 600);
//검색어가 바뀌면 서버 검색 꺼버리기
function offServerFilter() {
  if (props.type == "game") store.setstoreShowServerFilter(false);
}

// 검색 리스트를 클릭했을 경우
function clickKeyword(name: string) {
  //type에 따라서 해당 값을 store에 저장
  if (props.type == "game") {
    store.setstoreGameKeyword(name);

    //게임 서버 검색 키기
    store.setstoreShowServerFilter(true);
  } else {
    store.setstoreServerKeyword(name);
  }
  // 리스트 닫기
  store.setstoreShowServerSimilar(false);
  store.setstoreShowGameSimilar(false);
}
</script>

<style scoped></style>
