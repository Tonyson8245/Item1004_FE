<template>
<div class="border-b-2 border-everly-mid_grey mx-3 my-1 px-2 py-4">
                        
    <div :class="{'items-center': lastMessage() }" class="flex ">
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

            <div v-if="props.channel.unreadCount !==0"  class="ml-auto w-5 h-5 rounded-full text-center bg-everly-red text-everly-white flex items-center justify-center">
                <p class=" text-sm">{{ props.channel.unreadCount }}</p>
            </div>    
        </div>
            
                                          
        </div>
        
    </div>
                        
</div>

</template>

<script setup lang="ts">
import type channel from '@/domain/chat/channel.interface';

const props = defineProps<{ channel: channel}>();

// 채팅방의 가장 최근 메세지 리턴
const lastMessage = () =>{
  if (props.channel.lastMessage !== null) return props.channel.lastMessage.text  
  return null
}
const channelTitle= () =>{

}

// console.log(props.channel);




</script>

<style scoped></style>



