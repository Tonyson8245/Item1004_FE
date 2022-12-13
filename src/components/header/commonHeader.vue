<template>
  <div class="w-full flex z-10 bg-everly-main absolute">
    <div class="flex-1"></div>
    <div
      class="flex-none md:w-[1180px] bg-everly-main py-3 w-full text-everly-white font-bold text-base md:text-xl px-4"
    >
      <div class="flex">
        <div class="flex-none pt-1 pr-3 md:hidden" @click="backPress()">
          <img src="@/assets/icon/back_white_mobile.svg" alt="" />
        </div>
        <div>{{ route.meta.title }}</div>
      </div>
    </div>
    <div class="flex-1"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

function backPress() {
  router.go(-1);
}
</script>

<style scoped></style>
