<template>
<div :class="{' bg-op-40-right-blue ': route.params.channelId === props.channel.id }">

  
    <div @click="selectChannel" class="border-b-2 hover:opacity-40 cursor-pointer border-everly-mid_grey mx-2  py-5">
        
        <div :class="{'items-center': lastMessage() }" class="flex mx-3 ">
            <div class="rounded-lg overflow-hidden mr-2">                           
                <img
                    src="@/assets/img/profile_green.jpeg"
                    alt=""
                    class="w-12 rounded-lg"
                />
            </div>   

            <div class="flex flex-col w-full">
                
            <div class="flex w-full items-baseline">
                <p class="text-lg font-medium">{{ props.channel.name }}</p>
                <img src="/src/assets/icon/check_circle_blue.svg" alt="" class="w-3 ml-1"/>
                <p class="text-xs ml-auto text-everly-dark_grey">오후 10:27 </p>
            </div>
                
            <div class="flex">
                <p class="text-sm text-everly-dark_grey">{{ lastMessage()  }}</p>

                <div v-if="props.channel.unreadCount !==0"  class="ml-auto min-w-[1.25rem] w-auto  h-5 rounded-full text-center bg-everly-red text-everly-white flex items-center justify-center">
                    <p class=" text-sm px-1">
                        {{ props.channel.unreadCount }}                    
                    </p>
                </div>    
            </div>               
                                            
            </div>
            
        </div>
                            
    </div>
</div>
</template>

<script setup lang="ts">
import type channel from '@/domain/chat/channel.interface';
import { useChatStore } from "@/store/modules/chat/chatStore";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

const chatStore = useChatStore();
const props = defineProps<{ channel: channel}>();
// const { selectedChannel } = storeToRefs(chatStore);
const router = useRouter();

const route = useRoute();

console.log(route.params);


// 채팅방의 가장 최근 메세지 리턴
const lastMessage = () =>{
  if (props.channel.lastMessage !== null) return props.channel.lastMessage.text  
  return null
}

const selectChannel = (e: MouseEvent) =>{
    // console.log(e);
    // console.log(props.channel);        
    router.push(`/chat/${props.channel.id}`);
    chatStore.setSelectedChannel(props.channel);

}



// console.log(props.channel);
</script>

<style scoped>

.bg-op-40-right-blue{
    background-color: rgba(233, 233, 253, 0.4)
}

</style>



