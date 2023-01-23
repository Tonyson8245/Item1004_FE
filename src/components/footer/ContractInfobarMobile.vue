<template>
  <div class="text-center w-full fixed bottom-0 z-40 py-2 px-4 bg-everly-white">
    <div class="w-full flex space-x-4">
      <div
        class="flex-1 flex py-3 rounded-lg justify-center items-center bg-everly-light_blue text-everly-dark_grey border text-sm sm:text-base cursor-pointer"
      >
        <div class="text-everly-main">거래취소</div>
      </div>
      <div
        class="flex-1 flex py-3 rounded-lg justify-center items-center bg-everly-main text-sm sm:text-base cursor-pointer"
        @click="putContractStatus(getterButtonContent)"
      >
        <div class="font-bold text-everly-white">{{ getterButtonContent }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { storeToRefs } from "pinia";

const mypageStore = usemypageStore();
const { getterButtonContent } = storeToRefs(mypageStore);

//인수 인계 버튼
function putContractStatus(status: string) {
  if (status == "물품인계") mypageStore.setContractTakeover();
  else mypageStore.setContractTake();
}
</script>

<style scoped></style>
