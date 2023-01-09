<template>
  <div class="cursor-pointer">
    <div
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex"
    >
      <div class="relative">
        <!--content-->
        <div
          class="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none md:w-[65rem] md:h-[40rem] md:pr-8 py-3 overflow-y-auto"
        >
          <MileageCharge />
        </div>
      </div>
    </div>
    <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script lang="ts" setup>
import MileageCharge from "../mypage/detail/mileageCharge.vue";
</script>
<style scoped></style>
