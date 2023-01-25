<template>
  <div
    class="border border bg-everly-white flex justify-center items-center text-xs md:text-base text-center relative"
    :class="borderClass"
    @click="emit('getValue', emitValue)"
  >
    <div class="p-2 md:p-4 flex flex-col items-center">
      <div v-if="props.title == `네이버페이`" class="pt-2"></div>
      <img :src="props.imgUrl" alt="" class="pb-1 md:w-28 mt-1" />
      <span> {{ props.title }}</span>
    </div>
    <div
      class="bg-[#fafafa]/70 md:bg-[#f0f0f0]/70 md:bg absolute w-full h-full flex items-center justify-center cursor-not-allowed"
      style="z-index: 1"
      v-if="!props.active"
    ></div>
    <div
      class="border rounded-lg font-bold text-xs border-everly-mid_grey px-4 py-1 absolute bg-white/50 text-everly-dark_grey md:text-sm md:rounded-xl md:px-3"
      :class="borderClass"
      style="z-index: 1"
      v-if="!props.active"
    >
      준비중
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  title: String,
  imgUrl: String,
  active: Boolean,
  paymentMethod: String,
});

const borderClass = computed(() => {
  if (props.paymentMethod == props.title) return "border border-everly-main";
});

const emit = defineEmits(["getValue"]);

//활성화 됬을 떄만 해당 값을 보낸다.
const emitValue = computed(() => {
  if (props.active) return props.title;
  else return "";
});
</script>

<style scoped></style>
