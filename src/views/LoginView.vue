<template>
<<<<<<< HEAD
  <div
    class="min-h-screen flex flex-col justify-between bg-white sm:bg-[#fafafa]"
  >
    <div
      class="border-b text-center text-everly-dark_grey flex p-3 sm:invisible cursor-default"
    >
      <div class="flex-none pt-1">
=======
  <div class="md:bg-[#fafafa]">
    <div
      class="border-b text-center text-everly-dark_grey flex p-3 md:invisible cursor-default w-full bg-white fixed top-0 z-50"
    >
      <div class="flex-none pt-1" @click="backPress()">
>>>>>>> Main-search
        <img src="@/assets/icon/arrow_left.png" alt="" />
      </div>
      <div class="flex-grow">{{ headerTitle }}</div>
    </div>
<<<<<<< HEAD
    <div class="w-full max-w-xl m-auto items-center justify-center">
      <router-view> </router-view>
    </div>
    <div class="p-4 text-center">
      <div
        class="invisible sm:visible text-center text-sm text-everly-dark_grey cursor-pointer"
=======

    <router-view class="w-full m-auto max-w-lg items-center justify-center">
    </router-view>
    <div class="p-4 text-center w-full fixed bottom-0">
      <div
        class="invisible md:visible text-center text-sm text-everly-dark_grey cursor-pointer"
>>>>>>> Main-search
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
<<<<<<< HEAD
        class="sm:invisible text-center text-sm text-everly-dark_grey cursor-pointer py-1"
=======
        class="md:invisible text-center text-sm text-everly-dark_grey cursor-pointr py-1 w-full"
        v-if="csLinkShow"
>>>>>>> Main-search
      >
        고객센터 문의하기
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
<<<<<<< HEAD
import { useCommon } from "@/store/modules/common";

const store = useCommon();
const headerTitle = ref(store.headerTitle);
=======
import { useCommon } from "@/store/modules/ui/common";
import router from "@/router";

const store = useCommon();
const headerTitle = ref(store.headerTitle);
const csLinkShow = ref(store.csShowLink);

function backPress() {
  router.go(-1);
}

// fetch the user information when params change
>>>>>>> Main-search
</script>
<style lang="scss"></style>
