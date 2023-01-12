<template>
<div class="pt-[3rem]">
    <div class="flex py-16">
        <div class="flex-grow">
        </div>
        <div class=" flex-grow-0 w-full md:w-[73.750rem] md:h-[55.688rem] flex gap-5">
            <!-- 채팅 목록 div -->
            <div class=" md:w-[23.750rem] border p-5">
                <!-- 아래 div를 컴포넌트로 만들 것 -->
                <div>
                    <p>채팅 목록</p>
                    <div>
                        <input class="mt-5" type="text" placeholder="상대방의 닉네임을 입력해주세요">
                    </div>                    
                    <!-- 채팅 목록 표시 -->
                </div>                
            </div>
            <!-- 채팅 내용 div -->
            <div class=" md:w-[48.750rem]">

            </div>
        </div>
        <div class="flex-grow"></div>
    </div>
</div>
</template>

<script setup lang="ts">

// import { useChatStore } from "@/store/modules/chat/chatStore";



</script>

<style scoped></style>
