<template>
<div class="h-full flex flex-col">
    <div  class=" h-[6.5rem] border-b border-everly-mid_grey flex items-center pl-5">
        <!-- 프로필 이미지 -->
        <div class="rounded-lg overflow-hidden mr-2">                           
            <img
                src="@/assets/img/profile_green.jpeg"
                alt=""
                class=" w-14 rounded-lg"
            />
        </div> 
        <!-- 닉네임, 유저코드 -->
        <div class="flex flex-col">
            <div class="flex">
                <h1 class=" font-bold ">에블리</h1>
                <!-- <img src="/src/assets/icon/check_circle_blue.svg" alt="" class="w-4 m ml-1"/> -->
            </div>
            <div class="flex text-xs flex-grow text-everly-dark_grey">
                <p class="mr-2">유저코드</p>
                <p class="mr-1">#A2379F56GH</p>
                <img class="" src="@/assets/icon/copy_grey.svg" alt="" />
            </div>
        </div>                    
    </div>
    <!-- bg-[url('@/assets/img/chat-background.svg')] -->
    <!-- bg-op-30-right-blue  -->
    <div class=" h-full flex flex-col chat-bg bg-[url('@/assets/img/chat-background.svg')] bg-no-repeat bg-center bg-70% overflow-x-hidden overflow-scroll" >
        <!-- 채팅 내용 화면 영역 -->
        <message v-for=" message in messages" :message="message"/>
        
    </div>

    <!-- 채팅 입력 영역 -->
    <div class="mt-auto bg-white border-t rounded-t-lg flex items-center">   
        <div class="w-full flex justify-center">
            <textarea id="messageInputArea"  v-model="text"
            @keydown.enter.shift.exact.prevent="text += '\n'"
            @keydown.enter.exact.prevent="sendMessage"            
            maxlength="8000" class="w-full py-1 px-3  text-sm text-everly-dark_grey outline-none  resize-none" placeholder="내용 입력하셈 시벌탱" rows="1" ></textarea>                        
        </div>         
        
        <button @click="sendMessage" class="text-white bg-everly-main rounded-r-lg w-20 py-3">전송</button>
    </div>
</div>

</template>

<script setup lang="ts">

import message from './message.vue';
import myMessage from './myMessage.vue';
import { useChatStore } from "@/store/modules/chat/chatStore";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { ref } from 'vue';

const chatStore = useChatStore();

// console.log(selectedChannel);

const text = ref("");

const { messages } = storeToRefs(chatStore);


//  import type channel from '@/domain/chat/channel.interface';
//  const props = defineProps<{ selectedChannel: channel}>();

const sendMessage = (e:any) => {
    console.log(text);        
    chatStore.sendMessage(text.value);
    text.value=""
}



</script>

<style scoped>

.chat-bg{
    background-color: rgba(233, 233, 253, 0.23);
}


</style>
     
     
     
     