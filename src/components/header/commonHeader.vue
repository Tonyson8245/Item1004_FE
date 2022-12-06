<template>
  <div class="w-full bg-everly-main flex py-3">
    <div class="flex-grow"></div>
    <div
      class="flex-none md:w-[1180px] w-full text-everly-white font-bold text-base md:text-xl px-4"
    >
      <div class="flex">
        <div class="flex-none pt-1 pr-3 md:hidden" @click="backPress()">
          <img src="@/assets/icon/back_white_mobile.svg" alt="" />
        </div>
        <div>거래 등록</div>
      </div>
    </div>
    <div class="flex-grow"></div>
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
