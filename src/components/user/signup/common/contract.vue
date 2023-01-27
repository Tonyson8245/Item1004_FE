<template>
  <div class="flex items-center w-full">
    <img
      :src="`/assets/icon/${checkImg}.svg`"
      alt=""
      class="pr-2 w-5 h-5 cursor-pointer"
      @click="emit('check', { type: term.mandatory, idx: term.idx })"
    />
    <div class="text-xs flex-1 cursor-pointer" @click="moveToLink()">
      ({{ mandatory }}) {{ text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { term } from "@/domain/user/serviceTermList.interface";
import { computed, ref, watch } from "vue";

const props = defineProps(["data", "noarr", "arr"]);
const emit = defineEmits(["check"]);
const checkImg = ref("check_circle");

const term = props.data as term;
const text = term.title;
const link = term.link;
const mandatory = computed(() => {
  if (term.mandatory) return "필수";
  else return "선택";
});

const moveToLink = () => {
  window.open(link);
};

/// 부모에서 보낸 어레이 중에 본인 약관이 있는 확인 하는 로직
watch(
  [props.arr, props.noarr],
  () => {
    if (
      props.arr.indexOf(term.idx) != -1 ||
      props.noarr.indexOf(term.idx) != -1
    ) {
      checkImg.value = `check_circle_blue_full`;
    } else {
      checkImg.value = `check_circle`;
    }
  },
  //배열 내부까지 관측하는 로직
  { deep: true, immediate: true }
);
</script>

<style scoped></style>
