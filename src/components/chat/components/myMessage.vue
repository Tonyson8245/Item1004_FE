<template>
   
    <div class="w-full px-5 mt-3 ">
         <div class="flex">
            <div class="ml-auto flex items-end">
                <!-- 채팅 시간 -->
                <p class=" mr-3 text-xs text-everly-dark_grey">{{lastMessageTime()}}</p>
                <!-- 채팅 내용 -->
                <p class="text-sm mr-3 px-3 py-2 h-fit  md:max-w-md  rounded-lg shadow-md bg-everly-main text-everly-white">{{ props.message.text }}</p>
           
            </div>
            
             <!-- 프로필 사진 -->
             <div class="rounded-lg overflow-hidden mr-3 min-w-[2.5rem]">                           
                 <img
                     src="@/assets/img/profile_green.jpeg"
                     alt=""
                     class="w-14 rounded-lg "
                 />
             </div>
         </div>
     </div> 
 </template>
 
 <script setup lang="ts">
 import type message from '@/domain/chat/message.interface';
 
 
 const props = defineProps<{ message: message}>();
 
 const lastMessageTime = () => {
    
    return  new Intl.DateTimeFormat("ko", { timeStyle: 'short' }).format(new Date(props.message.createdAt))
        
    
}
 
 </script>
 
 <style scoped></style>
     
     
     
     