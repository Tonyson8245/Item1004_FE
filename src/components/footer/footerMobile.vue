<template>
  <div class="pb-10">
    <div class="w-full bg-everly-light_grey text-everly-dark_grey p-5">
      <div class="pb-3">(주) 지엠소프트</div>
      <div class="grid sm:grid-cols-2 grid-cols-1 text-xs gap-4">
        <div>
          <div><span>대표 : 신동우</span></div>
          <div><span>사업자등록번호 : 284-81—02740</span></div>
          <div><span>통신판매업신고 : 2023-경기구리-0037</span></div>
          <div>
            <span>사업장소재지 : 경기도 구리시 건원대로 3층386호(인창동)</span>
          </div>
          <div><span>고객센터 : 1833-2585</span></div>
        </div>
        <div>
          <div>
            <!-- <div><span>이메일 aaaa@item1004.com</span></div> -->
            <!-- <div>
              <span>통신판매업신고 : 2022-서울마포-00000</span>
            </div> -->
            <!-- <div>
              <span
                >사업장소재지 : 경기도 구리시 건원대로 3층386호(인창동)</span
              >
            </div> -->
            <!-- TODO: 2023-01-27 17:37:31 대표님이 없애달라고 하심 -->
            <!-- <div><span>개인정보 보호책임자 정상수</span></div> -->
          </div>
        </div>
      </div>
      <!-- <div class="text-everly-dark_grey text-xs pt-3">
        <div>아이템1004는 통신판매중개자이며 통신판매의 당사자가 아닙니다.</div>
        <div>따라서 상품 거래정보 및 거래에 대하여 책임을 지지 않습니다.</div>
      </div> -->
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
