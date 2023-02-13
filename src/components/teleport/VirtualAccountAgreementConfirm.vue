<template>
<button @click="open = true" class=" text-sm ml-3">전문보기</button>

<Teleport to="body">
    <div v-if="open" class="modal overflow-x-hidden overflow-y-auto fixed inset-0 z-[66] justify-center items-center flex">
        <!-- 여기가 내용이 바뀌는 부분 -->
        <div class=" bg-white border-2  rounded-md w-1/3">
            <span class="flex p-4">
                <h1>가상계좌 발급 안내확인</h1>
                
                <img @click="open = false" src="@/assets/icon/close_grey.svg" alt="" class="hidden md:block cursor-pointer ml-auto"/>
            </span>
            <hr>
            <div class="p-4">
                <p class=" mb-4">오류입금 등 자금 반환 관련 민원업무의 처리가 필요하긴 경우 아이템천사 고객센터(1833-2585)로 연락하셔서 절차를 안내받으시기 바랍니다.</p>
                <p>전기 통신 금융사가 피해 방지 및 피해금 환급에 관한 특별법 제 16조에 따라 사기 혹은 허위로 피해구제를 신청하는 경우 3년 이하의 징역 혹은 3천만원 이하의 벌금에 처해질 수 있습니다.</p>
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