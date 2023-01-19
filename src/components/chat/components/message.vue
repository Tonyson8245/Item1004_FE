<template>
   
   <div class="px-5 mt-3">
        <div class="w-full flex">
            <!-- 프로필 사진 -->
            <div class="rounded-lg overflow-hidden mr-3 min-w-[2.5rem]">                           
                <img
                    src="@/assets/img/profile_green.jpeg"
                    alt=""
                    class="w-14 rounded-lg"
                />
            </div>
            
            <div class="flex items-end">
                <p class="text-sm px-3 py-2 h-fit md:max-w-md rounded-lg shadow-md bg-everly-white text-everly-dark_grey">{{ props.message.text }}</p>
                <p class=" ml-2 text-xs text-everly-dark_grey">오후 06:00</p>
            </div>
            <!-- 채팅 내용 -->
            
        </div>
    </div>

</template>

<script setup lang="ts">

import type message from '@/domain/chat/message.interface';


const props = defineProps<{ message: message}>();

</script>

<style scoped></style>
    
    
    
    