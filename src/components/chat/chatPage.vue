<template>
<div class="pt-[3rem]">
    <div class="flex md:py-16">
        <div class="flex-grow">
        </div>
        <div class="h-[calc(100vh-48px)] flex-grow-0 w-full md:w-[73.750rem] md:h-[55.688rem] flex gap-5">
            <!-- 채팅방 목록 div -->
            <div class=" hidden md:flex flex-col w-full  md:h-[55.688rem] md:w-[25rem] md:border border-solid border-everly-mid_grey ">
                <channelList/>
            </div>
            <!-- 채팅 내용 div -->
            <div class=" w-full  md:w-[47.5rem] md:border border-everly-mid_grey  rounded-b-lg overflow-hidden">
               <inChatView/>
            </div>
        </div>
        <div class="flex-grow "></div>
    </div>
</div>
</template>

<script setup lang="ts">

import channelList from './components/channelList.vue';

import inChatView from './components/inChat.vue';
import { storeToRefs } from "pinia";
import { useChatStore } from "@/store/modules/chat/chatStore";
import { ref, computed, onMounted  } from "vue";
import { useRoute } from "vue-router";

const chatStore = useChatStore();

// onResize();


// const props = defineProps<{ isMobile: boolean}>();


// 모바일인가?
// yes
    // url에서 id 값이 있는가?? 
    // yes 채팅화면 
    // no 리스트 화면
// no 풀 화면





// switch (isMobile.value) {
//     case true:       
//             if (channelId) {
//                 chatView.value = true;
//             } else {
//                 channelsView.value = true;
//                 chatView.value = false;
//             }    
//         break;

//     case false: 
//         chatView.value = true;
//         channelsView.value = true;
//         break;

//     default:
//         break;
// }

// console.log("리스트 페이지 : ", channelsView.value);
// console.log("챗 페이지 : ", chatView.value);

     


// // 무한 스크롤
// const handleNotificationListScroll = (e: any) => {
//     // console.log("페이징 노 실행");    
//     const { scrollHeight, scrollTop, clientHeight } = e.target;    
//     const isAtTheBottom = scrollHeight <= scrollTop + clientHeight;  
//     const bottom = scrollHeight - (scrollTop + clientHeight) 
//     if (isAtTheBottom) {
//         chatStore.pagingChannels()
//     }
// }



// function onResize(){
//   isMobile.value = window.innerWidth < 600

//   console.log("모바일 측정 : ", isMobile.value);    
// }

// onMounted(()=>{
//   onResize()
// //   window.addEventListener('resize', onResize, {passive:true});
// })

</script>

<style scoped>

.bg-op-30-right-blue{
    background-color: rgba(233, 233, 253, 0.23)
}

</style>
