<template>
  <div class="md:bg-[#fafafa]">
    <div
      class="border-b text-center text-everly-dark_grey flex p-3 md:invisible cursor-default w-full bg-white fixed top-0 z-40"
    >
      <div class="flex-none pt-1" @click="backPress()">
        <img src="@/assets/icon/arrow_left.png" alt="" />
      </div>
      <div class="flex-grow">{{ headerTitle }}</div>
    </div>

    <router-view class="w-full m-auto max-w-lg items-center justify-center">
    </router-view>
    <FooterLoginVue class="p-4 text-center w-full bottom-0" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useCommon } from "@/store/modules/ui/common";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import FooterLoginVue from "@/components/footer/footerLogin.vue";

const router = useRouter();

const { headerTitle, csShowLink } = storeToRefs(useCommon());

function backPress() {
  router.go(-1);
}

// fetch the user information when params change
</script>
<style lang="scss"></style>
