<template>
<div class="pt-[3rem]">
    <div class="flex py-16">
        <div class="flex-grow">
        </div>
        <div class=" flex-grow-0 w-full md:w-[73.750rem] md:h-[55.688rem] flex gap-5">
            <!-- 채팅 목록 div -->
            <div class="md:h-[55.688rem] md:w-[25rem] border border-solid border-everly-mid_grey flex flex-col">
                <!-- 아래 div를 컴포넌트로 만들 것 -->
                    <div class="p-5 pb-0 flex-grow">
                        <div class="flex items-center">
                            <p class=" font-bold text-xl mr-3">채팅목록</p>   
                            <!-- 채팅 숫자-->
                            <div class="w-5 h-5 rounded-full text-center bg-everly-red text-everly-white flex items-center justify-center">
                                <p class=" text-sm">{{ unreadCount }}</p>
                            </div>                      
                            
                        </div>
                        <div class="rounded-lg mt-3 px-5 py-3 w-full bg-everly-light_grey flex">
                            <input v-model="searchTargetUser" class="focus:outline-none bg-everly-light_grey" type="text" placeholder="상대방의 닉네임을 입력해주세요">
                            <img class="ml-auto" src="@/assets/icon/search_gray.svg" @click="searchChannel" />
                        </div>   
                    </div>
                                     
                    <!-- 채널 목록 카드 -->
                    <div class="flex-grow overflow-scroll overflow-x-hidden" @scroll="handleNotificationListScroll">
                        <channel v-for="(channel, i) in channels" :key="i" :channel="channel"/>
                    </div>
                    
           
            </div>
            <!-- 채팅 내용 div -->
            <div class=" md:w-[47.5rem]">

            </div>
        </div>
        <div class="flex-grow"></div>
    </div>
</div>
</template>

<script setup lang="ts">

import channel from './components/channels.vue';
// import { useChatStore } from "@/store/modules/chat/chatStore";
import { storeToRefs } from "pinia";
import { useChatStore } from "@/store/modules/chat/chatStore";
import { ref, computed } from "vue";

// import type { user } from "@/domain/user/user.interface";
// const localData = localStorage.getItem("user");
// const userData = JSON.parse(localData) as user;

const chatStore = useChatStore();
const { client, channels, unreadCount } = storeToRefs(chatStore);
const searchTargetUser = ref("");

client.value.on('event', (data) => {
    if (data.type === 'message') {
        chatStore.setChannels(data.channel);
        console.log("받은 데이터", data);
        chatStore.getUnreadCount()
    }    
})


const handleNotificationListScroll = (e: any) => {          
    const { scrollHeight, scrollTop, clientHeight } = e.target;       
    // console.log(scrollHeight, scrollTop, clientHeight);    
    const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
    // console.log("scrollHeight : ",scrollHeight);
    // console.log("scrollTop + clientHeight : ",scrollTop + clientHeight);
    // 일정 한도 밑으로 내려오면 함수 실행
    if (isAtTheBottom) chatStore.pagingChannels()    
}


const searchChannel = () => {
    console.log(searchTargetUser.value);
    
    chatStore.searchChannel(searchTargetUser.value);
    
}
</script>

<style scoped></style>
