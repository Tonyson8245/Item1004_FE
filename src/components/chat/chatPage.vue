<template>
<div class="pt-[3rem]">
    <div class="flex md:py-16">
        <div class="flex-grow">
        </div>
        <div class="h-[calc(100vh-48px)] flex-grow-0 w-full md:w-[73.750rem] md:h-[55.688rem] flex gap-5">
            <!-- 채팅방 목록 div -->
            <div v-if="channelsView" class=" flex flex-col w-full  md:h-[55.688rem] md:w-[25rem] md:border border-solid border-everly-mid_grey ">
                <!-- 아래 div를 컴포넌트로 만들 것 -->
                    <div class="p-5 pb-0" >
                        <div class="flex items-center">
                            <p class="font-bold text-xl mr-2">채팅목록</p>   
                            <!-- 채팅 숫자-->
                            <div class="min-w-[1.25rem] w-auto  h-5 rounded-full text-center bg-everly-red text-everly-white flex items-center justify-center">
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
                                     
                    <!-- 채널 목록 카드   @scroll="handleNotificationListScroll"-->
                    <div 
                    class="flex-grow overflow-scroll overflow-x-hidden"
                    @scroll="handleNotificationListScroll"
                    ref="trigger">  
                        <channel v-for="(channel, i) in channels"  :key="i" :channel="channel"/>
                    </div> 
           
            </div>
            <!-- 채팅 내용 div -->
            <div v-if="chatView" class=" w-full  md:w-[47.5rem] md:border border-everly-mid_grey  rounded-b-lg overflow-hidden">
               <inChatView/>
            </div>
        </div>
        <div class="flex-grow "></div>
    </div>
</div>
</template>

<script setup lang="ts">

import channel from './components/channels.vue';
import inChatView from './components/inChat.vue';
import { storeToRefs } from "pinia";
import { useChatStore } from "@/store/modules/chat/chatStore";
import { ref, computed, onMounted  } from "vue";
import { useRoute } from "vue-router";


const chatStore = useChatStore();
const { client, channels, unreadCount, selectedChannel } = storeToRefs(chatStore);

const route = useRoute();
const channelId  = route.params.channelId;

const chatView = ref(false);
const channelsView = ref(false);

const isMobile = ref(false);



client.value.on('event', (data) => {
    if (data.type === 'message') {
        console.log("받은 데이터", data);
        chatStore.setChannels(data.channel);
        chatStore.getUnreadCount()
    }
})



onResize();


// const props = defineProps<{ isMobile: boolean}>();


// 모바일인가?
// yes
    // url에서 id 값이 있는가?? 
    // yes 채팅화면 
    // no 리스트 화면
// no 풀 화면



console.log(route.params);


switch (isMobile.value) {
    case true:       
            if (channelId) {
                chatView.value = true;
            } else {
                channelsView.value = true;
            }    
        break;

    case false: 
        chatView.value = true;
        channelsView.value = true;
        break;

    default:
        break;
}


console.log("리스트 페이지 : ",channelsView.value);
console.log("챗 페이지 : ",chatView.value);

     


// 무한 스크롤
const handleNotificationListScroll = (e: any) => {
    // console.log("페이징 노 실행");    
    const { scrollHeight, scrollTop, clientHeight } = e.target;    
    const isAtTheBottom = scrollHeight <= scrollTop + clientHeight;  
    const bottom = scrollHeight - (scrollTop + clientHeight) 
    if (isAtTheBottom) {
        chatStore.pagingChannels()
    }
}






function onResize(){
  isMobile.value = window.innerWidth < 600

  console.log("모바일 측정 : ", isMobile.value);    
}

onMounted(()=>{
  onResize()
//   window.addEventListener('resize', onResize, {passive:true});
})

</script>

<style scoped>

.bg-op-30-right-blue{
    background-color: rgba(233, 233, 253, 0.23)
}

</style>
