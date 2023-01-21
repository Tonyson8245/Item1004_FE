
<template>
    <!-- 아래 div를 컴포넌트로 만들 것 -->
        <div class="p-5 pb-0" >
            <div class="flex items-center">
                <p class="font-bold text-xl mr-2">채팅목록</p>   
                <!-- 채팅 숫자-->
                <div v-if="unreadCount != 0" class="min-w-[1.25rem] w-auto  h-5 rounded-full text-center bg-everly-red text-everly-white flex items-center justify-center">
                    <p class="text-sm px-1">
                        {{ unreadCount }}                                    
                    </p>
                </div>
            </div>
            <!-- <div class=" rounded-lg mt-3 px-5 py-3 w-full bg-everly-light_grey flex">
                <input v-model="searchTargetUser" class="focus:outline-none bg-everly-light_grey" type="text" placeholder="상대방의 닉네임을 입력해주세요">
                <img class="ml-auto" src="@/assets/icon/search_gray.svg" @click="searchChannel" />
            </div>    -->
        </div>
                         
        <!-- 채널 목록 카드   @scroll="handleListScroll"-->
        <div 
        class="flex-grow overflow-scroll overflow-x-hidden"
        @scroll="handleListScroll"
        ref="trigger">  
            <channel v-for="(channel, i) in channels"  :key="i" :channel="channel"/>
        </div> 

</template>

<script setup lang="ts">

import channel from './channel.vue';
import { storeToRefs } from "pinia";
import { useChatStore } from "@/store/modules/chat/chatStore";
import { ref, computed, onMounted  } from "vue";
// import { useRoute } from "vue-router";
import { useRoute } from "vue-router";

const chatStore = useChatStore();
const { client, channels, unreadCount, selectedChannel } = storeToRefs(chatStore);

const route = useRoute();
const channelId  = route.params.channelId;


// client.value.on('event', (data) => {
//     if (data.type === 'message') {
//         console.log("받은 데이터", data);
//         chatStore.setChannels(data.channel);
//         chatStore.getUnreadCount()
//     }
// })


// console.log(route.params);


// 무한 스크롤
const handleListScroll = (e: any) => {
    // console.log("페이징 노 실행");    
    const { scrollHeight, scrollTop, clientHeight } = e.target;    
    const isAtTheBottom = scrollHeight <= scrollTop + clientHeight;  
    const bottom = scrollHeight - (scrollTop + clientHeight) 
    if (isAtTheBottom) {
        chatStore.pagingChannels()
    }
}


</script>

<style scoped>

</style>




