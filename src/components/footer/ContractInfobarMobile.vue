<template>
  <div class="text-center w-full fixed bottom-0 z-40 py-2 px-4 bg-everly-white">
    <div class="w-full flex space-x-4">
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
  </div>
</template>

<script setup lang="ts">
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const mypageStore = usemypageStore();
const { getterButtonContent } = storeToRefs(mypageStore);

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
