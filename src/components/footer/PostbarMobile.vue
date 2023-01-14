<template>
  <div class="text-center w-full fixed bottom-0 z-40 py-2 px-4 bg-everly-white">
    <div class="w-full flex space-x-2">
      <div class="w-1/6 flex justify-center items-center">
        <img src="@/assets/icon/like_mid-grey.svg" alt="" class="pr-1" />
        <div class="text-sm">{{ storeWishCount }}</div>
      </div>
      <div
        class="flex-1 flex py-3 rounded-lg justify-center items-center bg-everly-light_blue text-everly-dark_grey border text-sm sm:text-base cursor-pointer"
      >
        <div class="text-everly-main" @click="router.push('/chat')">
          채팅하기({{ storeChatCount }})
        </div>
      </div>
      <div
        class="flex-1 flex py-3 rounded-lg justify-center items-center bg-everly-main text-sm sm:text-base cursor-pointer"
      >
        <div
          class="font-bold text-everly-white"
          @click="togglestoreShowManagePost()"
          v-if="owner"
        >
          글 관리
        </div>
        <div
          class="font-bold text-everly-white"
          @click="toggle()"
          v-else-if="!storeShowBuy"
        >
          구매하기
        </div>
        <div
          class="font-bold text-everly-white"
          v-else
          @click="
            toggle();
            router.push('/payment');
          "
        >
          바로 구매
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from "@/store/modules/home/postStore";
import { useToggle } from "@vueuse/shared";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const postStore = usePostStore();
const { storeShowManagePost, storeShowBuy, storeChatCount, storeWishCount } =
  storeToRefs(postStore);

const toggle = useToggle(storeShowBuy);
const owner = ref(false);

const togglestoreShowManagePost = useToggle(storeShowManagePost);
const router = useRouter();
</script>

<style scoped></style>
