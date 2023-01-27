<template>
  <div class="p-5">
    <guideVue />
  </div>
</template>

<script setup lang="ts">
import guideVue from "@/components/mypage/components/guide.vue";
import { useMediaQuery } from "@vueuse/core";
import { watch, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const minSize = computed(() => {
  return useMediaQuery("(min-width: 768px)");
});
var isBig = minSize.value.value;
if (isBig) router.push(`./overview`);

watch(minSize.value, () => {
  var isBig = minSize.value.value;
  if (isBig) router.push(`./overview`);
});
</script>

<style scoped></style>
