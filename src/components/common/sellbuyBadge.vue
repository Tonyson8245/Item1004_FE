<template>
  <div class="flex items-center place-items-end pr-3">
    <div class="text-everly-white text-xs">
      <div
        class="bg-everly-main px-2 py-1 m-1 rounded-lg w-12 text-center"
        v-if="props.type == `sell`"
      >
        팔래요
      </div>
      <div
        class="bg-everly-red px-2 py-1 m-1 rounded-lg w-12 text-center"
        v-else
      >
        살래요
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: String,
});
</script>

<style scoped></style>
