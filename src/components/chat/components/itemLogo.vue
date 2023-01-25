<template>
  
<div class="rounded-lg overflow-hidden mr-2 border py-2 px-3 flex flex-col items-center">
    <img v-if="postItem?.productType ==='character'"
        src="@/assets/icon/character_active.svg"
        alt=""
        class="w-10 h-10 rounded-lg"
    />

    <img v-if="postItem?.productType ==='gameMoney'"
        src="@/assets/icon/gameMoney_active.svg"
        alt=""
        class="w-10 h-10 rounded-lg"
    />
    <img v-if="postItem?.productType ==='etc'"
        src="@/assets/icon/etc_active.svg"
        alt=""
        class="w-10 h-10 rounded-lg"
    />
    <img v-if="postItem?.productType ==='item'"
        src="@/assets/icon/item_active.svg"
        alt=""
        class="w-10 h-10 rounded-lg"
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
</script>

<style>

</style>