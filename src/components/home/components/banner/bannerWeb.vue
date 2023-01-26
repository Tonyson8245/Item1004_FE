<template>
  <div class="w-full min-w-[1180px]" @click="moveExternalLink('홍보')">
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
</script>

<style scoped></style>
