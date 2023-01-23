<template>
  <div class="md:w-[60rem] md:border-everly-dark_grey md:border-b">
    <div
      class="flex w-full text-xs font-bold md:text-sm md:font-normal px-4 py-2 md:px-5 md:py-2 border-b border-everly-light_grey md:border-everly-mid_grey space-x-2 md:space-x-4"
    >
      <div>거래일자</div>
      <div>2022.12.14</div>
      <div>17:00:04</div>
    </div>
    <div class="flex items-center px-4 py-2 md:px-5 md:py-5">
      <div
        class="w-full md:w-[35rem] flex justify-between md:justify-start items-center md:items-start"
      >
        <div
          class="hidden md:flex flex-col items-center border border-everly-mid_grey rounded-lg p-2 w-16 h-16 mr-10"
        >
          <img
            :src="`/assets/icon/${imageSrcWeb}.svg`"
            alt=""
            class="w-[2.7rem]"
          />
          <div class="text-xs">게임머니</div>
        </div>
        <div class="space-y-1 md:space-y-1">
          <div class="text-xs md:text-sm">메이플스토리 > 엘리시움</div>
          <div class="text-sm md:text-sm">제목</div>
          <div class="flex text-xs items-center py-2 md:py-0 space-x-1">
            <div class="font-bold md:text-sm md:font-normal">수량[16]</div>
            <div class="flex md:hidden items-center space-x-1">
              <div>8억매소당</div>
              <div class="text-sm">320,000</div>
            </div>
          </div>
        </div>
        <div
          class="md:hidden flex flex-col items-center border border-everly-mid_grey rounded-lg p-2 w-[3.75rem] h-[3.75rem]"
        >
          <img
            :src="`/assets/icon/${imageSrcMobile}.svg`"
            alt=""
            class="w-[1.5rem]"
          />
          <div class="text-xs">게임머니</div>
        </div>
      </div>
      <div class="hidden md:flex text-sm">
        <div class="md:w-[11.625rem]">320,000</div>
        <div class="md:w-[13.375rem]">
          <div>이런걸닉네임이라고짓다니말도안돼</div>
          <div class="text-everly-dark_grey">#A2379F56GH</div>
        </div>
      </div>
    </div>
    <div
      class="md:hidden flex justify-between text-xs px-4 py-2 md:px-5 md:py-3 bg-everly-wbg_grey border-[#c7c7c7] border-b"
    >
      <div>이런걸닉네임이라고짓다니말도안돼</div>
      <div>#A2379F56GH</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const type = ref("gameMoney");
const status = ref(false);

const imageSrcWeb = computed(() => {
  switch (type.value) {
    case "gameMoney":
      return !status ? "gamemoney_active" : "gamemoney";
    case "item":
      return !status ? "item_active" : "item";

    case "character":
      return !status ? "character_active" : "character";

    case "etc":
      return !status ? "etc_active" : "etc";
  }
});

const imageSrcMobile = computed(() => {
  switch (type.value) {
    case "gameMoney":
      return !status ? "gamemoney_active_mobile" : "gamemoney_mobile";
    case "item":
      return !status ? "item_active_mobile" : "item_mobile";

    case "character":
      return !status ? "character_active_mobile" : "character_mobile";

    case "etc":
      return !status ? "etc_active_mobile" : "etc_mobile";
  }
});
</script>

<style scoped></style>
