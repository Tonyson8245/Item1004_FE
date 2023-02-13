<template>
<button @click="open = true" class=" text-sm ml-3">전문보기</button>

<Teleport to="body">
    <div v-if="open" class="modal overflow-x-hidden  overflow-y-auto fixed inset-0 z-[66] justify-center items-center flex">
        <!-- 여기가 내용이 바뀌는 부분 -->
        <div class=" bg-white border-2  rounded-md w-1/3">
            <span class="flex p-4">
                <h1>가상계좌 발급 고객동의</h1>
                
                <img @click="open = false" src="@/assets/icon/close_grey.svg" alt="" class="hidden md:block cursor-pointer ml-auto"/>
            </span>
            <hr>
            <div class="p-4">
                <p class=" mb-4">아이템천사에서 고객에게 제공하는 본 가상계좌는 고객의 계좌가 아닌 자금의 입금만을 위해 사용되는 인식계좌입니다.</p>
                <p>본 가상계좌에 대한 전기통신 금융사가 패해금 환급을 위한 피해 구제신청은 서면으로만 접수받음에 동의합니다.</p>
            </div>
            
        </div>
        
    </div>
    <!-- <div class="opacity-25 fixed inset-0 z-50 bg-black"></div> -->
</Teleport>
</template>
<script lang="ts" setup>
import { ref } from 'vue';


const open = ref(false);

</script>
<style scoped>
/* .modal {
  z-index: 60;

} */
</style>