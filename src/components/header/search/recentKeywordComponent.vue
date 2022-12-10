<template>
  <div
    class="flex justify-between items-center px-4 py-1.5 sm:pr-1 text-xs sm:text-base md:text-sm"
  >
    <div class="flex items-center">
      <sellbuyBadge :type="props.value?.type" />
      <div>{{ props.value?.text }}</div>
    </div>
    <div class="pr-2 md:pr-14">
      <img src="@/assets/icon/circle_close.svg" alt="" class="w-5" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import sellbuyBadge from "@/components/common/sellbuyBadge.vue";
import type recentKeywordType from "@/interface/home/search/recentKeyword.inteface";
import type { PropType } from "vue";

const props = defineProps({
  value: Object as PropType<recentKeywordType>,
});
</script>

<style scoped></style>
