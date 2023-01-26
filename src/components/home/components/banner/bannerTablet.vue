<template>
  <div class="w-full mt-[106px]" @click="moveExternalLink('블로그')">
    <div class="flex-grow bg-[#01acc6]"></div>
    <div class="flex-grow-none">
      <img src="@/assets/img/banners/top_1_tablet.jpeg" alt="" />
    </div>
    <div class="flex-grow bg-[#01acc6]"></div>
    <!-- class="h-[440px] w-[1920px] overflow" -->
  </div>
</template>

<script setup lang="ts">
import { moveExternalLink } from "@/common";
</script>

<style scoped></style>
