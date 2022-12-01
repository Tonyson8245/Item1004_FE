<template>
  <div class="cursor-pointer bg-white h-screen w-screen fixed z-50">
    {{ storeSearchShowMobile }}
    <div
      v-if="storeSearchShowMobile"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 justify-center items-center flex bg-blue-300"
    >
      <div>모바일 검색</div>
      <button @click="toggleSearchMobile()">닫기</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSearchStore } from "@/store/modules/home/searchStore";
import { storeToRefs } from "pinia";

//모바일 검색창 활성화/비활성화 버튼
const searchStore = useSearchStore();
const { storeSearchShowMobile } = storeToRefs(searchStore);

function toggleSearchMobile() {
  searchStore.setstoreSearchShowMobile(!storeSearchShowMobile.value);
}
</script>
<style scoped></style>
