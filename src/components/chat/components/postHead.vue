<template>
        
        <!-- 글이 삭제 됐거나 판매가 완료 됐을 때 흐림처리 -->
    <div :class="{'opacity-50 cursor-default': postItem?.isDeleted===true || postItem?.status==='end' }" @click="goPostPage(postItem?.idx)" class="cursor-pointer border-b border-everly-mid_grey flex items-center pl-5 py-3">

        <!-- <input :value="bottom" /> -->

        <itemLogo :postItem="postItem"/>
        <div class="flex flex-col ">
            <div class="hidden md:flex">
                <p class=" text-xs">{{ postItem?.gameName }} > {{ postItem?.serverName }} </p>
            </div>
            <div class="flex md:text-sm">
                <p v-if="postItem?.isDeleted === true " class="font-bold mr-2">삭제됨</p> 
                <p v-if="postItem?.status === 'end' " class="font-bold mr-2">거래완료</p> 
                <p>{{postItem?.title}}</p>
            </div>
            <div class="flex text-xs flex-grow md:text-everly-dark_grey">
                
                <p class="">{{numberToKorean( postItem?.saleUnit as number )}}</p>
                
                <p v-if="postItem?.productType ==='gameMoney'" class="mr-1 ml-2">게임머니당</p>
                <p v-if="postItem?.productType ==='item' || postItem?.productType ==='etc'" class="mr-1">개당</p>           
               
                <p>{{ numberToKorean(postItem?.pricePerUnit as number) }}  원</p>                             
            </div>
        </div>        
        <div class=" ml-auto mr-8 opacity-50" @click="moveExternalLink('유저신고하기')">
            유저신고
        </div>            
    </div>
    


</template>

<script setup lang="ts">


import { useChatStore } from "@/store/modules/chat/chatStore";
import { storeToRefs } from "pinia";
import { ref,onUpdated,onMounted, toRefs, watch  } from 'vue';
import { numberToKorean } from "@/common";
import itemLogo from "./itemLogo.vue"
import { useRouter } from "vue-router";
import { moveExternalLink } from "@/common";

const chatStore = useChatStore();
const { postItem } = storeToRefs(chatStore);
const router = useRouter();

function goPostPage(postIdx:number | undefined) {
    if(!postItem.value?.isDeleted) router.push('/post?postId='+postIdx);
}

</script>

<style scoped>

.chat-bg{
    background-color: rgba(233, 233, 253, 0.23);
}

</style>
        
        
        
        