<template>
  <div>
    <div class="w-full bg-everly-light_grey flex py-8">
      <div class="flex-grow"></div>
      <div class="flex-none w-[1180px]">
        <div class="w-[380px]">
          <div class="text-everly-dark_grey flex font-bold">
            <div class="w-[80px] text-left">이용약관</div>
            <div
              class="w-[161px] border-l-2 border-r-2 text-center text-everly-dark_grey"
            >
              개인정보처리방침
            </div>
            <div class="w-[134px] text-right">고객센터(1:1문의)</div>
          </div>
        </div>
        <div class="flex space-x-3 mt-4 text-everly-dark_grey text-sm">
          <span>상호명 : (주)아이템1004</span>
          <span
            >사업장소재지 : 서울특별시 마포구 만리재로 14, 르네상스타워 21층
            2101호</span
          >
          <span>사업자등록번호 : 111-00-00000</span>
          <span>통신판매업신고 : 2022-서울마포-00000</span>
        </div>
        <div class="flex space-x-3 mt-1 text-everly-dark_grey text-sm">
          <span>전화번호 : 02-704-2694</span>
          <span>대표 : 정성수</span>
          <span
            >아이템1004는 통신판매중개자이며 통신판매의 당사자가 아닙니다.
            따라서 상품 거래정보 및 거래에 대하여 책임을 지지 않습니다.</span
          >
        </div>
      </div>
      <div class="flex-grow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
//라우터 생성
const router = useRouter();
const route = useRoute();
</script>

<style scoped></style>
