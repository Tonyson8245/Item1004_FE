<template>
  <div class="flex space-x-3 items-center cursor-default">
    <div>
      <img src="@/assets/icon/circle_search_grey.svg" alt="" />
    </div>
    <div class="hover:bg-[#e9e9fd] w-full p-1 px-2 text-base cursor-default">
      {{ props.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  value: String,
});
</script>

<style scoped></style>
