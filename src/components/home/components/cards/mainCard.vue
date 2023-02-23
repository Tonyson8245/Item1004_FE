<template>
  <div
    class="border-everly-mid_grey border rounded-lg h-36 md:h-40 md:w-[22.5rem] p-3 md:p-2 space-y-1 md:space-y-2 shadow-lg md:shadow-none flex flex-col justify-between"
  >
    <div class="space-y-3 md:space-y-1">
      <div class="flex space-x-2 items-center">
        <div class="text-everly-white">
          <div class="bg-everly-main py-0.5 px-1.5 rounded-lg text-xs">
            팔래요
          </div>
        </div>
        <div class="flex text-sm">{{ props.propsCard?.game }}</div>
      </div>
      <div class="items-center space-x-1.5 hidden md:flex">
        <div class="rounded-lg overflow-hidden">
          <img
            :src="`/assets/img/profile_${props.propsCard?.profileimg}.png`"
            alt=""
            class="w-7"
          />
        </div>
        <span class="text-sm"> {{ props.propsCard?.nickname }} </span>
        <img src="@/assets/icon/check_circle_blue.svg" alt="" class="w-4" />
      </div>
      <div class="font-bold ellipsis text-left">
        {{ props.propsCard?.title }}
      </div>
    </div>
    <div class="flex justify-between items-center md:justify-end">
      <div class="flex items-center space-x-1.5 md:hidden">
        <div class="rounded-lg overflow-hidden">
          <img
            :src="`/assets/img/profile_${props.propsCard?.profileimg}.png`"
            alt=""
            class="w-5"
          />
        </div>
        <span class="text-xs"> {{ props.propsCard?.nickname }} </span>
        <img src="@/assets/icon/check_circle_blue.svg" alt="" class="w-2" />
      </div>
      <div class="flex justify-between text-xs md:text-sm">
        <div></div>
        <div class="font-bold">{{ props.propsCard?.price }}원</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { hotCard } from "@/assets/dummy/home/card/hotCard";

const props = defineProps({
  propsCard: Object as () => hotCard,
});
</script>

<style scoped>
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
