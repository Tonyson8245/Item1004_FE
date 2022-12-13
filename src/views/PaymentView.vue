<template>
  <div>
    <ModalSmall
      :propsShowModal="true"
      :propsButtonText="`메인으로 가기`"
      :propsContentText="`준비 중인 페이지입니다.`"
      :propsLink="`/`"
    />

    <div><img src="@/dummy/pages/paymentpage.png" alt="" /></div>
  </div>
</template>

<script setup lang="ts">
import ModalSmall from "@/components/modal/modalSmall.vue";
</script>

<style scoped></style>
