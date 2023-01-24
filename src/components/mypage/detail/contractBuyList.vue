<template>
  <div class="md:pl-6">
    <div class="hidden md:block text-xl font-bold">구매내역</div>
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
            @click="changeTab('입금완료')"
          >
            <span>입금완료</span>
            <!-- TODO 출시 때 뺴둠 -->
            <!-- <div class="flex">
              <span>10</span><span class="hidden md:block">건</span>
              <img
                src="@/assets/icon/arrow_down.svg"
                alt=""
                class="pl-3 hidden md:block w-5"
              />
            </div> -->
          </div>
          <div
            class="flex justify-between p-3 md:px-5 flex-grow bg-white items-center cursor-pointer"
            :class="completeTabClass"
            @click="changeTab('인수대기')"
          >
            <span>인수대기</span>
            <!-- TODO 출시 때 뺴둠 -->
            <!-- <div class="flex">
              <span>10</span><span class="hidden md:block">건</span>
              <img
                src="@/assets/icon/arrow_down.svg"
                alt=""
                class="pl-3 hidden md:block w-5"
              />
            </div> -->
          </div>
          <div
            class="flex justify-between p-3 md:px-5 flex-grow bg-white items-center cursor-pointer"
            :class="contracCompleteClass"
            @click="changeTab('거래종료')"
          >
            <span>거래종료</span>
            <!-- TODO 출시 때 뺴둠 -->
            <!-- <div class="flex">
              <span>10</span><span class="hidden md:block">건</span>
              <img
                src="@/assets/icon/arrow_down.svg"
                alt=""
                class="pl-3 hidden md:block w-5"
              />
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="md:mt-10">
      <div class="md:w-[60rem]">
        <div class="border-y border-everly-black font-bold py-4 hidden md:flex">
          <div class="w-[35rem] text-center">상품정보</div>
          <div class="w-[11.625rem] text-right">금액(원)</div>
          <div class="w-[13.375rem] text-right">구매자</div>
        </div>
      </div>
      <div>
        <div v-for="key in storeContractList">
          <contractListComponent :card="key" />
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center my-5 md:mt-32">
      <v-pagination
        v-model="storepage"
        :pages="storeContractListTotalPage"
        :range-size="1"
        active-color="#DCEDFF"
        @update:modelValue="updateHandler"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUpdated, onUnmounted } from "vue";
import contractListComponent from "../components/contractListComponent.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { my } from "@/domain/payment/contractPostDetailDto.interaface";

const mypageStore = usemypageStore();
const {
  storeContractListTabType,
  storeContractListTotalPage,
  storeContractList,
  storepage,
} = storeToRefs(mypageStore);
const router = useRouter();
const route = useRoute();

//페이지 로드 될때 데이터 가져오기
onMounted(() => {
  // TODO 깜빡임 없애기 진행중, 나중엔 탭 종류도 쿼리 스트링으로 넣어서 페이지처럼 비교해서 처리 할것
  // //페이지 값이 있을때
  // if (route.query.page != undefined) {
  //   // 이미 가져온 데이터가 다를때만 가져온다.
  //   if (parseInt(route.query.page.toString()) != storepage.value)
  //     mypageStore.getContractList(storepage.value, 2, "buy");
  // }
  // //값이 없는 경우 1페이지 부터 다시 가져옴
  // else {
  //   mypageStore.getContractList(1, 2, "buy");
  // }
  mypageStore.getContractList(1, 2, "buy");
});

//페이징

function updateHandler(value: number) {
  mypageStore.setstorepage(value);
  mypageStore.getContractList(value, 2, "buy");
  router.replace({ path: route.path, query: { page: value } });
}

//탭 상태 변경
function changeTab(tab: string) {
  var value;
  switch (tab) {
    case "입금완료":
      value = 0;
      break;
    case "인수대기":
      value = 1;
      break;
    case "거래종료":
      value = 2;
      break;
    default:
      value = 0;
      break;
  }

  mypageStore.resetContractList(); //store 리스트 초기화
  router.replace({ path: route.path, query: { page: 1 } }); // 페이지 변경
  mypageStore.setstoreContractListTabType(value); //탭변경
  mypageStore.getContractList(1, 2, "buy"); //다시 가져오기
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
  "bg-everly-red rounded-lg md:bg-everly-red text-everly-white md:rounded-t-none md:h-[3.3rem]";

watch(storeContractListTabType, (a) => {
  checkTab(a);
});

checkTab(storeContractListTabType.value);

function checkTab(a: number) {
  needTabClass.value =
    "md:border-t md:border-l md:border-b md:rounded-l-lg text-everly-dark_grey md:h-[3.1rem]";
  completeTabClass.value =
    "md:border-t  md:border-b text-everly-dark_grey md:h-[3.1rem]";
  contracCompleteClass.value =
    "md:border-t md:border-r md:border-b md:rounded-r-lg text-everly-dark_grey md:h-[3.1rem]";

  switch (a) {
    case 0:
      needTabClass.value = activeTab;
      break;
    case 1:
      completeTabClass.value = activeTab;
      break;
    case 2:
      contracCompleteClass.value = activeTab;
      break;
  }
}
</script>

<style scoped></style>
