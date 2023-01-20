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
                <h1 class="font-bold">에블리</h1>
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
import { ref,onUpdated,onMounted, watch  } from 'vue';

const chatStore = useChatStore();
const { messages, client, user } = storeToRefs(chatStore);

const scrollView:any = ref();


// 스크롤이 하단에 고정되어 있으면 true로 주고, 내가 스크롤을 올리면 false
// 스크롤 올리는 와중에는 메세지가 왔을 때 스크롤이 하단으로 이동 X
const isScrollBottom = ref(true);


const text = ref("");



//  import type channel from '@/domain/chat/channel.interface';
//  const props = defineProps<{ selectedChannel: channel}>();

const sendMessage = async (e:any) => {
    // console.log(text);
    if (text.value !='') {
        const result =  await chatStore.sendMessage(text.value)
        text.value = ""    
        scrollToBottom();
    }
    
    // console.log(result);
    // result.then()
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
     
     
     
     