<template>
  <div class="md:pl-6">
    <div class="hidden md:block text-xl font-bold">판매내역</div>
    <div
      class="md:pl-0 p-3 bg-everly-light_grey font-bold text-everly-white md:text-everly-dark_grey text-sm md:text-lg md:bg-transparent"
    >
      <div
        class="bg-everly-white md:bg-transparent rounded-lg p-1 overflow-hidden"
      >
        <div class="w-full rounded-lg flex items-center">
          <div
            class="flex justify-between p-3 md:px-5 flex-grow bg-white items-center cursor-pointer"
            :class="needTabClass"
            @click="changeTab('인계필요')"
          >
            <span>인계필요</span>
            <div class="flex">
              <span>10</span><span class="hidden md:block">건</span>
              <img
                src="@/assets/icon/arrow_down.svg"
                alt=""
                class="pl-3 hidden md:block w-5"
              />
            </div>
          </div>
          <div
            class="flex justify-between p-3 md:px-5 flex-grow bg-white items-center cursor-pointer"
            :class="completeTabClass"
            @click="changeTab('인계완료')"
          >
            <span>인계완료</span>
            <div class="flex">
              <span>10</span><span class="hidden md:block">건</span>
              <img
                src="@/assets/icon/arrow_down.svg"
                alt=""
                class="pl-3 hidden md:block w-5"
              />
            </div>
          </div>
          <div
            class="flex justify-between p-3 md:px-5 flex-grow bg-white items-center cursor-pointer"
            :class="contracCompleteClass"
            @click="changeTab('거래완료')"
          >
            <span>거래완료</span>
            <div class="flex">
              <span>10</span><span class="hidden md:block">건</span>
              <img
                src="@/assets/icon/arrow_down.svg"
                alt=""
                class="pl-3 hidden md:block w-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md:mt-10">
      <div class="md:w-[60rem]">
        <div class="border-y border-everly-black font-bold py-4 hidden md:flex">
          <div class="w-[35rem] text-center">상품정보</div>
          <div class="w-[11.625rem] text-center">금액(원)</div>
          <div class="w-[13.375rem] text-center">구매자</div>
        </div>
      </div>
      <div>
        <div v-for="key in 1">
          <contractListComponent />
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center my-5 md:mt-32">
      <v-pagination
        v-model="page"
        :pages="pages"
        :range-size="1"
        active-color="#DCEDFF"
        @update:modelValue="updateHandler"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import contractListComponent from "../components/contractListComponent.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { storeToRefs } from "pinia";

const mypageStore = usemypageStore();
const { storeContractListSellTabType } = storeToRefs(mypageStore);
//페

//페이징
const page = ref(1);
const pages = ref(10);

function updateHandler(value: number) {
  page.value = value;
}

//탭 상태 변경
function changeTab(tab: string) {
  mypageStore.setstoreContractListSellTabType(tab);
}

// 탭 상태 class
const needTabClass = ref(
  "md:border-t md:border-l md:border-b md:rounded-l-lg text-everly-dark_grey md:h-[3.1rem] "
);
const completeTabClass = ref(
  "md:border-t  md:border-b text-everly-dark_grey md:h-[3.1rem]"
);
const contracCompleteClass = ref(
  "md:border-t md:border-r md:border-b md:rounded-r-lg text-everly-dark_grey md:h-[3.1rem]"
);
const activeTab =
  "bg-everly-main rounded-lg md:bg-everly-main text-everly-white md:rounded-t-none md:h-[3.3rem]";

checkTab(storeContractListSellTabType.value);
watch(storeContractListSellTabType, (a) => {
  checkTab(a);
});

function checkTab(a: string) {
  needTabClass.value =
    "md:border-t md:border-l md:border-b md:rounded-l-lg text-everly-dark_grey md:h-[3.1rem]";
  completeTabClass.value =
    "md:border-t  md:border-b text-everly-dark_grey md:h-[3.1rem]";
  contracCompleteClass.value =
    "md:border-t md:border-r md:border-b md:rounded-r-lg text-everly-dark_grey md:h-[3.1rem]";

  switch (a) {
    case "인계필요":
      needTabClass.value = activeTab;
      break;
    case "인계완료":
      completeTabClass.value = activeTab;
      break;
    case "거래완료":
      contracCompleteClass.value = activeTab;
      break;
  }
}
</script>

<style scoped></style>
