<template>
  <div class="w-full flex z-40 fixed md:absolute bg-everly-main">
    <div class="flex-1"></div>
    <div
      class="flex-none md:w-[1180px] bg-everly-main py-3 w-full text-everly-white font-bold text-base md:text-xl px-4"
    >
      <div class="flex">
        <div class="flex-none pt-1 pr-3 md:hidden" @click="backPress()">
          <img src="@/assets/icon/back_white_mobile.svg" alt="" />
        </div>
        <div>거래 등록</div>
      </div>
    </div>
    <div class="flex-1"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function backPress() {
  router.go(-1);
}
</script>

<style scoped></style>
