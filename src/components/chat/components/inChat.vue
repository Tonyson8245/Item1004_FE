<template>
<div class="h-full flex flex-col">


    <postHead/>
    <!-- bg-[url('@/assets/img/chat-background.svg')] -->
    <!-- bg-op-30-right-blue  -->
    <div id="scroll-view" ref="scrollView" class=" py-1 h-full flex flex-col chat-bg bg-[url('@/assets/img/chat-background.svg')] bg-no-repeat bg-center bg-70% overflow-x-hidden overflow-scroll" 
        @scroll="handleListScroll">
        <!-- 채팅 내용 화면 영역 -->        
        <div  v-for="message in messages">            
            <message v-if="message.userId !== client.channel.userId"  :message="message"/>
            <myMessage v-else                                         :message="message"/>
        </div>
    </div>

    <!-- 채팅 입력 영역 -->
    <div class="mt-auto bg-white border-t rounded-t-lg flex items-center">   
        <div class="w-full flex justify-center">
            <textarea id="messageInputArea"  v-model="text"
            @keydown.enter.shift.exact.prevent="text += '\n'"
            @keydown.enter.exact.prevent="sendMessageProcess"            
            maxlength="8000" class="w-full py-1 px-3  text-sm text-everly-dark_grey outline-none  resize-none" placeholder="내용을 입력하세요" rows="1" ></textarea>                        
        </div>         
        
        <button @click="sendMessageProcess" class="text-white bg-everly-main rounded-r-lg w-20 py-3">전송</button>
    </div>
</div>


</template>

<script setup lang="ts">

import postHead from './postHead.vue';
import message from './message.vue';
import myMessage from './myMessage.vue';
import { useChatStore } from "@/store/modules/chat/chatStore";
import { storeToRefs } from "pinia";
import { ref,onUpdated,onMounted, toRefs, watch  } from 'vue';
import { useScroll } from '@vueuse/core';
import { useRouter, useRoute } from "vue-router";

const chatStore = useChatStore();
const { messages, client, isNewChat,channels, selectedChannel, } = storeToRefs(chatStore);
const scrollView = ref<HTMLElement | null>(null);
const {arrivedState,directions} = useScroll(scrollView);
const { left, right, top, bottom } = toRefs(arrivedState)


const route = useRoute();
const router = useRouter();

// 스크롤이 하단에 고정되어 있으면 true로 주고, 내가 스크롤을 올리면 false
// 스크롤 올리는 와중에는 메세지가 왔을 때 스크롤이 하단으로 이동 X
const isScrollBottom = ref(true);

const text = ref("");


//  import type channel from '@/domain/chat/channel.interface';
//  const props = defineProps<{ selectedChannel: channel}>();

async function sendMessageProcess(e:any) {
    if (text.value !='') {
        console.log("isNewChat ? ",isNewChat.value);
        
        if (isNewChat.value) {
            // 새로운 챗이면 새로 방 만드는 API 쏘고 완료된 결과를 받아서 방 생성이 완성되면은 텍스트를 쏴주도록 합니다.
            const result = await chatStore.createNewRoom(String(route.query.postId))
            if (result) {
                console.log("리절트 확인 : " ,result);  
                await sendMessage(result)  
                // 여기서 replace 해주면 chatview에서 라우터에 반응해서 방추가 자동으로 해준다
                router.replace('/chat/'+result)
            }  
            // 방이 생성 되면은 방에 대한 정보를 api 요청해서 가지고 오고, 
            //방을 channels에 꽂아주고, 
            //selectedChannel에 현재 방 꽂아주고, 
            //메세지 보내고 메세지 보낸걸 messages에 꽂아주고, 
            //lastMessage를 channels의 해당 channel에 꽂아주고,
            
        }
        else await sendMessage(selectedChannel.value?.id)        
    }
    
}

async function sendMessage (channelId:string | undefined) {
    await chatStore.sendMessage(text.value , channelId as string) 
        text.value = ""    
        scrollToBottom();
}


onMounted(()=>{
// 메세지 송, 수신 시 작동 하기 위해 사용함
// dom node에 변화가 감지되면 스크롤 하단 이동이 실행된다.
    // 감시자 인스턴스 만들기
    const observer = new MutationObserver(mutations => {
        mutations.forEach(m => {
            if (isScrollBottom.value) scrollToBottom()
        });
    });
    // 감시자 설정
    const config = { 
        childList: true, 
    }
    // 감시 시작
    observer.observe(scrollView.value, config);

    // chatStore.isRoomExit();
    // chatStore.getPost();
})


const scrollToBottom = () => {
    scrollView.value.scrollTop = scrollView.value.scrollHeight
}






// 스크롤 시 작동
const handleListScroll = (e: any) => {
    // console.log("페이징 노 실행");    
    const { scrollHeight, scrollTop, clientHeight } = e.target;    
    const cal =  (scrollTop + clientHeight) / scrollHeight * 100
    isScrollBottom.value = 95 < cal
    // const bottom = scrollHeight - (scrollTop + clientHeight)
    // console.log("스크린 총 길이 : ",scrollHeight);
    // console.log("화면에 보이는 길이 : ",clientHeight);
    // console.log("화면에 보이는 길이 : ",clientHeight);


  
}

</script>

<style scoped>

.chat-bg{
    background-color: rgba(233, 233, 253, 0.23);
}


</style>
     
     
     
     