
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
        <!-- v-scroll="onScroll" -->
        <div 
        class="flex-grow overflow-scroll overflow-x-hidden"            
        ref="scroll">  
            <channel v-for="(channel, i) in channels"  :key="i" :channel="channel"/>
        </div> 

</template>

<script setup lang="ts">

import channel from './channel.vue';
import { storeToRefs } from "pinia";
import { useChatStore } from "@/store/modules/chat/chatStore";
import { ref, toRefs ,watch  } from "vue";
import type { UseScrollReturn } from '@vueuse/core'
import { useScroll  } from '@vueuse/core';
import { vScroll } from '@vueuse/components'
// import { useRoute } from "vue-router";
import { useRoute } from "vue-router";

const chatStore = useChatStore();
const { client, channels, unreadCount, selectedChannel } = storeToRefs(chatStore);

const route = useRoute();
const channelId  = route.params.channelId;


const scroll = ref<HTMLElement | null>(null);

const {arrivedState, directions} = useScroll(scroll);
const { left, right, top, bottom } = toRefs(arrivedState)
// const { left: toLeft, right: toRight, top: toTop, bottom: toBottom } = toRefs(directions)


// function onScroll(state: UseScrollReturn) {
//   console.log(state) // {x, y, isScrolling, arrivedState, directions}
// }

watch(bottom, ()=> {  
    if (bottom.value) {               
         chatStore.pagingChannels()
    }
})



</script>

<style scoped>

</style>




