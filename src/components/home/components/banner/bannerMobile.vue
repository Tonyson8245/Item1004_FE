<template>
  <div class="w-full mt-[106px] flex" @click="moveExternalLink('홍보')">
    <div class="flex-grow bg-[#01acc6]"></div>
    <div class="flex-grow-none">
      <img
        src="@/assets/img/banners/top_1_mobile.jpeg"
        class="w-[320px]"
        alt=""
      />
    </div>
    <div class="flex-grow bg-[#01acc6]"></div>
  </div>
</template>

<script setup lang="ts">
import { moveExternalLink } from "@/common";
</script>

<style scoped></style>
