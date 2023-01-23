<template>
        
    <div class=" border-b border-everly-mid_grey flex items-center pl-5 py-3">

        <!-- <input :value="bottom" /> -->

        <div class="rounded-lg overflow-hidden mr-2">           
                
            <img
                src="@/assets/img/profile_green.jpeg"
                alt=""
                class="w-14 rounded-lg"
            />
        </div> 
        <div class="flex flex-col">
            <div class="flex">
                <p class=" text-xs text-bck">{{ postItem?.gameName }} > {{ postItem?.serverName }} </p>
            </div>
            <div class="flex text-sm">
                <p v-if="postItem?.isDeleted === true || postItem?.status ==='end'" class="font-bold mr-2">{{ postStatus(postItem?.status)  }}</p> <p>{{postItem?.title}}</p>
            </div>
            <div class="flex text-xs flex-grow text-everly-dark_grey">
                <p class="mr-2">{{numberToKorean(postItem?.saleUnit)}}</p>
                
                <p class="mr-1">게임머니당</p>
                <p>{{ numberToKorean(postItem?.pricePerUnit) }}  원</p>    
                         
            </div>
        </div>                    
    </div>
    


</template>

<script setup lang="ts">

import message from './message.vue';
import myMessage from './myMessage.vue';
import { useChatStore } from "@/store/modules/chat/chatStore";
import { storeToRefs } from "pinia";
import { ref,onUpdated,onMounted, toRefs, watch  } from 'vue';
import { numberToKorean } from "@/common";

const chatStore = useChatStore();
const { messages, client, user, selectedChannel, postItem } = storeToRefs(chatStore);


const postStatus = (status: string) =>{

    console.log(status);
    
}

</script>

<style scoped>

.chat-bg{
    background-color: rgba(233, 233, 253, 0.23);
}


</style>
        
        
        
        