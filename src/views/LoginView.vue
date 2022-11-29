<template>
  <div class="sm:bg-[#fafafa]">
    <div
      class="border-b text-center text-everly-dark_grey flex p-3 sm:invisible cursor-default w-full bg-white fixed top-0 z-50"
    >
      <div class="flex-none pt-1">
        <img src="@/assets/icon/arrow_left.png" alt="" />
      </div>
      <div class="flex-grow">{{ headerTitle }}</div>
    </div>

    <router-view class="w-full m-auto max-w-lg items-center justify-center">
    </router-view>
    <div class="p-4 text-center w-full fixed bottom-0">
      <div
        class="invisible sm:visible text-center text-sm text-everly-dark_grey cursor-pointer"
      >
        <div class="flex divide-xs w-full justify-center">
          <div class="text-center px-2 text-everly-dark_grey">
            <button class="text-sm">이용약관</button>
          </div>
          <div class="text-center px-2 text-everly-dark_grey">
            <button class="text-sm">개인정보 처리방침</button>
          </div>
          <div class="text-center px-2 text-everly-dark_grey">
            <button class="text-sm">고객센터</button>
          </div>
        </div>
      </div>
      <div
        class="sm:invisible text-center text-sm text-everly-dark_grey cursor-pointr py-1 w-full"
        v-if="csLinkShow"
      >
        고객센터 문의하기
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useCommon } from "@/store/modules/ui/common";

const store = useCommon();
const headerTitle = ref(store.headerTitle);
const csLinkShow = ref(store.csShowLink);

// fetch the user information when params change
</script>
<style lang="scss"></style>
