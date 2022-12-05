<template>
  <div>
    <div class="w-full bg-everly-light_grey text-everly-dark_grey p-5">
      <div class="pb-3">(주) 아이템 천사 사업자 정보</div>
      <div class="grid sm:grid-cols-2 grid-cols-1 text-xs gap-4">
        <div>
          <div><span>대표 : 정성수</span></div>
          <div><span>사업자등록번호 : 111-00-00000</span></div>
          <div>
            <span
              >사업장소재지 : 서울특별시 마포구 만리재로 14, 르네상스타워 21층
              2101호</span
            >
          </div>
          <div><span>전화번호 : 02-704-2694</span></div>
        </div>
        <div>
          <div>
            <div><span>이메일 aaaa@item1004.com</span></div>
            <div>
              <span>통신판매업신고 : 2022-서울마포-00000</span>
            </div>
            <div>
              <span
                >사업장소재지 : 서울특별시 마포구 만리재로 14, 르네상스타워 21층
                2101호</span
              >
            </div>
            <div><span>개인정보 보호책임자 000</span></div>
          </div>
        </div>
      </div>
      <div class="text-everly-dark_grey text-xs pt-3">
        <div>아이템1004는 통신판매중개자이며 통신판매의 당사자가 아닙니다.</div>
        <div>따라서 상품 거래정보 및 거래에 대하여 책임을 지지 않습니다.</div>
      </div>
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
