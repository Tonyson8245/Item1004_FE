<template>
<div class="pt-[3rem]">
    <div class="flex py-16">
        <div class="flex-grow">
        </div>
        <div class=" flex-grow-0 w-full md:w-[73.750rem] md:h-[55.688rem] flex gap-5">
            <!-- 채팅 목록 div -->
            <div class="md:h-[55.688rem] md:w-[25rem] border border-solid border-everly-mid_grey flex flex-col">
                <!-- 아래 div를 컴포넌트로 만들 것 -->
                    <div class="p-5 pb-0">
                        <div class="flex items-center">
                            <p class=" font-bold text-xl mr-3">채팅목록</p>   
                            <!-- 채팅 숫자-->
                            <div class="w-5 h-5 rounded-full text-center bg-everly-red text-everly-white flex items-center justify-center">
                                <p class=" text-sm">{{ unreadCount }}</p>
                            </div>                      
                            
                        </div>
                        <div class=" rounded-lg mt-3 px-5 py-3 w-full bg-everly-light_grey flex">
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
            <div class=" md:w-[47.5rem] border border-everly-mid_grey flex flex-col rounded-b-lg overflow-hidden">
                <div class=" h-[6.5rem] border-b border-everly-mid_grey flex items-center pl-5">
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
                            <img src="/src/assets/icon/check_circle_blue.svg" alt="" class="w-4 ml-1"/>
                        </div>
                        <div class="flex text-xs flex-grow text-everly-dark_grey">
                            <p class="mr-2">유저코드</p>
                            <p class="mr-1">#A2379F56GH</p>
                            <img src="@/assets/icon/copy_grey.svg" alt="" />
                        </div>
                    </div>                    
                </div>
                <div class="h-full bg-op-30-right-blue flex flex-col">
                    <!-- 채팅 내용 화면 영역 -->
                    <div class="px-5 mt-5">
                        <div class="w-full flex items-end">
                            <!-- 프로필 사진 -->
                            <div class="rounded-lg overflow-hidden mr-3">                           
                                <img
                                    src="@/assets/img/profile_green.jpeg"
                                    alt=""
                                    class="w-14 rounded-lg"
                                />
                            </div>
                            <!-- 채팅 내용 -->
                            <p class="text-sm px-3 py-2 h-fit rounded-lg shadow-md bg-everly-white text-everly-dark_grey">안녕하세요 답장이 늦었습니다!!!!</p>
                            <p class=" ml-2 text-xs text-everly-dark_grey">오후 06:00</p>
                        </div>
                    </div>
                    <!-- 채팅 입력 영역 -->
                    <form class=" mt-auto bg-white border-t rounded-t-lg flex items-center">   
                        <div class="w-full flex justify-center">
                            <textarea class="w-full py-1 px-3  text-sm text-everly-dark_grey outline-none  resize-none" placeholder="내용 입력하셈 시벌탱" rows="1" ></textarea>                        
                        </div>                     
                        <button class="text-white bg-everly-main rounded-r-lg w-20 py-3">전송</button>
                    </form>
                </div>

            </div>
        </div>
        <div class="flex-grow "></div>
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
        console.log("받은 데이터", data);
        chatStore.setChannels(data.channel);
        chatStore.getUnreadCount()
    }    
})


const handleNotificationListScroll = (e: any) => {          
    const { scrollHeight, scrollTop, clientHeight } = e.target;       
    const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
    // 일정 한도 밑으로 내려오면 함수 실행
    if (isAtTheBottom) chatStore.pagingChannels()    
   
}


const searchChannel = () => {
    console.log(searchTargetUser.value);
    
    chatStore.searchChannel(searchTargetUser.value);
    
}
</script>

<style scoped>

.bg-op-30-right-blue{
    background-color: rgba(233, 233, 253, 0.23)
}

</style>
