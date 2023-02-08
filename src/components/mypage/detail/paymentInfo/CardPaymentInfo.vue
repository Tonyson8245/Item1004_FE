<template lang="">
<ChargeLimitInfoModal v-if="isInfoModal" @update:props-show-modal="setIsInfoModal($event)" />

    <div class="px-5 md:px-0 md:pl-8 text-sm md:text-base">
        <div class="py-3">신용카드 충전</div>
        <div class="space-y-2">
          <div class="flex">
            <div class="text-everly-dark_grey w-[5.688rem] md:w-[8.313rem]">
              마일리지 종류
            </div>
            <div class="flex-1">구매전용 마일리지(출금불가)</div>
          </div>
          <div class="flex">
            <div class="text-everly-dark_grey w-[5.688rem] md:w-[8.313rem]">
              충전 수수료
            </div>
            <div class="flex-1">4.8%</div>
          </div>
          <div class="flex">
            <div class="text-everly-dark_grey w-[5.688rem] md:w-[8.313rem]">
              충전 한도
            </div>
            <div
              class="px-4 md:hidden text-xs border-everly-mid_grey border flex items-center"
              @click="setIsInfoModal(true)"
            >
              자세히보기
            </div>
            <div class="flex-1 hidden md:block">
              각 PG사에 따라 한도금액이 다르게 적용됩니다. 한도정책은 카드사
              사정에 따라 언제든지 변경될 수 있습니다
            </div>
          </div>
        </div>
      </div>
</template>
<script setup lang="ts">
import ChargeLimitInfoModal from '../../components/chargeLimitInfoModal.vue';
import { ref } from "vue";


// 모바일용 충전 한도 안내 모달
const isInfoModal = ref(false);

function setIsInfoModal(value: boolean) {
  isInfoModal.value = value;
}
</script>
<style lang="">
    
</style>