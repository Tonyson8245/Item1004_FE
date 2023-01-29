<template>
  <div class="w-full min-w-[1180px] cursor-pointer" @click="moveLink('signUp')">
    <div class="flex-grow bg-[#01acc6]"></div>
    <div class="flex-grow-0">
      <img
        src="@/assets/img/banners/top_1_desktop.jpeg"
        class="w-[1180px] h-[440px]"
        alt=""
      />
    </div>
    <div class="flex-grow bg-[#01acc6]"></div>
    <!-- class="h-[440px] w-[1920px] overflow" -->
  </div>
</template>

<script setup lang="ts">
import { moveExternalLink } from "@/common";
import router from "@/router";
import { isNotEmpty } from "class-validator";
// 페이지 이동
function moveLink(type: string) {
  let link = type;
  if (type == "signUp"){
    // 로그인 되어있는 상태면 마이페이지의 마일리지 현황 페이지로 이동
    const localData = localStorage.getItem("user");
    if (isNotEmpty(localData)) link = "/mypage/mileage/overview";
    else link = "/account/signUp/confirm"
  }
  router.push(link);
}
</script>

<style scoped></style>
