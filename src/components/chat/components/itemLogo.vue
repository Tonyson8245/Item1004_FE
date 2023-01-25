<template>
  
<div class="rounded-lg overflow-hidden mr-2 border py-2 px-3 flex flex-col items-center">
    <!-- 판매중, 판매완료 -->
    <img v-if="postItem?.productType && !postItem?.isDeleted  && !isMobile()"
        :src="`/assets/icon/${postItem?.productType}_active.svg`"
        alt=""
        class="w-10 h-10 rounded-lg"
   />
    
   <!-- 삭제된 게시글 아이콘 -->
    <img v-if="postItem?.productType && postItem?.isDeleted && !isMobile()"
        :src="`/assets/icon/${postItem?.productType}.svg`"
        alt=""
        class="w-10 h-10 rounded-lg"
    />


    <!-- 모바일 -->
        <!-- 판매중, 판매완료 -->
        <img v-if="postItem?.productType && !postItem?.isDeleted && isMobile()"
            :src="`/assets/icon/${postItem?.productType}_active_mobile.svg`"
            alt=""
            class="w-7 h-7 rounded-lg"
        />
        <!-- 삭제된 게시글 아이콘 -->
        <img v-if="postItem?.productType && postItem?.isDeleted && isMobile()"
            :src="`/assets/icon/${postItem?.productType}_mobile.svg`"
            alt=""
            class="w-8 h-8 rounded-lg"
        />

    <p v-if="postItem?.productType ==='item'" class="text-xs">아이템</p>
    <p v-if="postItem?.productType ==='gameMoney'" class="text-xs">게임머니</p>
    <p v-if="postItem?.productType ==='etc'" class="text-xs">기타</p>
    <p v-if="postItem?.productType ==='character'" class="text-xs">캐릭터</p>
</div> 
</template>

<script setup lang="ts">
import { useChatStore } from "@/store/modules/chat/chatStore";
import { storeToRefs } from "pinia";

// const props = defineProps<{ postItem: postResult}>();
const chatStore = useChatStore();
const { postItem } = storeToRefs(chatStore);

const isMobile = () => {
  return window.innerWidth < 768;
};
</script>

<style>

</style>