<template>
  <div class="flex space-x-3 items-center">
    <div>
      <img src="@/assets/icon/circle_search_grey.svg" alt="" />
    </div>
    <div class="hover:bg-[#e9e9fd] w-full p-1 px-2 text-base">
      {{ props.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from "@/store/modules/home/searchStore";
import { storeToRefs } from "pinia";
import { ref, watch, computed } from "vue";
const props = defineProps({
  value: String,
});
</script>

<style scoped></style>
