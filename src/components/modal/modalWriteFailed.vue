<template>
  <div
    v-if="props.showModal"
    class="opacity-25 fixed inset-0 z-50 bg-black h-screen"
  ></div>
  <div class="cursor-pointer">
    <div
      v-if="props.showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex"
    >
      <div class="w-8/12 md:w-[20rem] bg-white rounded-xl overflow-hidden">
        <div class="text-everly-dark_grey lg:text-base">
          <div class="p-5 space-y-7 md:space-y-[4.5rem]">
            <div class="flex flex-col items-center">
              <img
                src="@/assets/icon/warning_red.svg"
                class="w-5 sm:w-6 py-4 sm:pt-10 sm:pb-8 md:py-8"
                alt=""
              />
              <div
                class="text-center text-base md:text-lg pb-2 whitespace-pre-wrap"
              >
                {{ content }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex gap-3 text-center text-everly-white pt-0 p-3 text-xs lg:text-base"
        >
          <div
            class="flex-1 rounded-lg py-2 bg-everly-main cursor-pointer"
            @click="emit('select', false)"
          >
            닫기
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

const emit = defineEmits(["select"]);
const props = defineProps({
  showModal: Boolean,
  failedType: String,
});

const content = computed(() => {
  if (props.failedType == "title") return "올바르지 않은 제목 형식입니다.";
  else if (props.failedType == "minTotalPrice")
    return "최소 등록가격은 2,000원입니다.\n 가격 정보를 수정해주세요.";
  else if (props.failedType == "mandatory")
    return "필수 기재 항목을\n작성해주세요.";
  else if (props.failedType == "minMax")
    return "최대값과 최소값이\n올바르지 않습니다.";
  else if (props.failedType == "wrongPrice")
    return "가격 책정이 올바르지 않습니다.";
  else if (props.failedType == "noGameIdx")
    return "게임명이 존재하지않거나\n 올바르지 않습니다.";
  else if (props.failedType == "noServerIdx")
    return "서버명이 존재하지않거나\n 올바르지 않습니다.";
});
</script>
<style scoped></style>
