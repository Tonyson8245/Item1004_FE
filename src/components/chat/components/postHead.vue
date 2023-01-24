<template>
        
        <!-- 글이 삭제 됐거나 판매가 완료 됐을 때 흐림처리 -->
    <div :class="{'opacity-50': postItem?.isDeleted===true || postItem?.status==='end' }" class="border-b border-everly-mid_grey flex items-center pl-5 py-3">

        <!-- <input :value="bottom" /> -->

        <itemLogo :postItem="postItem"/>
        <div class="flex flex-col gap-1">
            <div class="flex">
                <p class=" text-xs text-bck">{{ postItem?.gameName }} > {{ postItem?.serverName }} </p>
            </div>
            <div class="flex text-sm">
                <p v-if="postItem?.isDeleted === true " class="font-bold mr-2">삭제됨</p> 
                <p v-if="postItem?.status === 'end' " class="font-bold mr-2">거래완료</p> 
                <p>{{postItem?.title}}</p>
            </div>
            <div class="flex text-xs flex-grow text-everly-dark_grey">
                <p class="">{{numberToKorean(postItem?.saleUnit)}}</p>
                
                <p v-if="postItem?.productType ==='gameMoney'" class="mr-1 ml-2">게임머니당</p>
                <p v-if="postItem?.productType ==='item' || postItem?.productType ==='etc'" class="mr-1">개당</p>               
               
                <p>{{ numberToKorean(postItem?.pricePerUnit) }}  원</p>    
                         
            </div>
        </div>                    
    </div>
    


</template>

<script setup lang="ts">


import { useChatStore } from "@/store/modules/chat/chatStore";
import { storeToRefs } from "pinia";
import { ref,onUpdated,onMounted, toRefs, watch  } from 'vue';
import { numberToKorean } from "@/common";
import itemLogo from "./itemLogo.vue"


const chatStore = useChatStore();
const { postItem } = storeToRefs(chatStore);



</script>

<style scoped>

.chat-bg{
    background-color: rgba(233, 233, 253, 0.23);
}


</style>
        
        
        
        