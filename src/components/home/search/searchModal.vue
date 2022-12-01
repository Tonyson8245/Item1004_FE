<template>
  <div class="cursor-pointer bg-white h-screen w-screen fixed z-50">
    {{ storeShowSearchModal_mobile }}
    <div
      v-if="storeShowSearchModal_mobile"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 justify-center items-center flex bg-blue-300"
    >
      <div>모바일 검색</div>
      <button @click="toggleSearchModal_Mobile()">닫기</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSearchStore } from "@/store/modules/home/searchStore";
import { storeToRefs } from "pinia";

//모바일 검색창 활성화/비활성화 버튼
const searchStore = useSearchStore();
const { storeShowSearchModal_mobile } = storeToRefs(searchStore);

function toggleSearchModal_Mobile() {
  searchStore.setstoreShowSearchModal_mobile(
    !storeShowSearchModal_mobile.value
  );
}
</script>
<style scoped></style>
