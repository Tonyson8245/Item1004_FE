<template>
  <div class="text-center w-full fixed bottom-0 z-40 py-2 px-4 bg-everly-white">
    <!-- 거래 취소 + 인계 -->
    <div
      class="w-full flex space-x-4"
      v-if="getterContractDetail.my.isSeller && getterContractStageStatus == 0"
    >
      <div
        class="flex-1 flex py-3 rounded-lg justify-center items-center bg-everly-light_blue text-everly-dark_grey border text-sm sm:text-base cursor-pointer"
        @click="cancelContract"
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
    <!-- 거래취소 + 인수 -->
    <div
      class="w-full flex space-x-4"
      v-else-if="
        !getterContractDetail.my.isSeller && getterContractStageStatus == 1
      "
    >
      <div
        class="flex-1 flex py-3 rounded-lg justify-center items-center bg-everly-main text-sm sm:text-base cursor-pointer"
        @click="putContractStatus(getterButtonContent)"
      >
        <div class="font-bold text-everly-white">{{ getterButtonContent }}</div>
      </div>
    </div>
    <!-- 거래 취소만 -->
    <div
      class="w-full flex space-x-4"
      v-else-if="
        (getterContractDetail.my.isSeller && getterContractStageStatus == 1) ||
        (!getterContractDetail.my.isSeller && getterContractStageStatus == 0)
      "
    >
      <div
        class="flex-1 flex py-3 rounded-lg justify-center items-center bg-everly-main text-sm sm:text-base cursor-pointer font-bold text-everly-white"
      >
        거래취소
      </div>
    </div>
    <!-- 거래 종료 -->
    <div
      class="w-full flex space-x-4"
      v-else-if="
        getterContractStageStatus == 2 || getterContractStageStatus == 2
      "
    >
      <div
        class="flex-1 flex py-3 rounded-lg justify-center items-center bg-everly-main text-sm sm:text-base cursor-pointer font-bold text-everly-white"
      >
        종료된 거래입니다
      </div>
    </div>
    <!-- 거래 취소 -->
    <div
      class="w-full flex space-x-4"
      v-else-if="getterContractStageStatus == 3"
    >
      <div
        class="flex-1 flex py-3 rounded-lg justify-center items-center bg-everly-main text-sm sm:text-base cursor-pointer font-bold text-everly-white"
      >
        취소된 거래입니다
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const mypageStore = usemypageStore();
const { getterContractDetail, getterContractStageStatus, getterButtonContent } =
  storeToRefs(mypageStore);

const router = useRouter();
const route = useRoute();
const ordNm = route.query.ordNm?.toString();

//인수 인계 버튼
function putContractStatus(status: string) {
  if (ordNm != undefined) {
    if (status == "물품인계")
      mypageStore.setContractTakeover(ordNm).then((res) => {
        if (res) alert(status + "가 완료됐습니다.");
        else alert(status + "가 실패했습니다.");
      });
    else
      mypageStore.setContractTake(ordNm).then((res) => {
        if (res) alert(status + "가 완료됐습니다.");
        else alert(status + "가 실패했습니다.");
      });
    mypageStore.resetContractList();
  }
  router.go(-1);
}

function cancelContract() {
  if (ordNm != undefined) {
    mypageStore.deleteContract(ordNm).then((res) => {
      if (res) alert("거래가 취소되었습니다.");
      else alert("거래 취소가 실패했습니다.");

      router.go(-1);
    });
  } else {
    alert("올바르지 않은 결제 번호입니다.");
  }
}
</script>

<style scoped></style>
