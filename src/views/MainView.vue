<template>
  <div @click="toggleSearchWeb()">
    <headerComponent />
    <router-view> </router-view>
    <div class="p-4 text-center w-full fixed bottom-0">
      <div
        class="md:invisible text-center text-sm text-everly-dark_grey cursor-pointr py-1 w-full"
      >
        하단 버튼바
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSearchStore } from "@/store/modules/home/searchStore";
import { computed } from "vue";
import headerComponent from "@/components/header/headerComponent.vue";
import { storeToRefs } from "pinia";

//검색창 활성화 값 가져오기
const searchStore = useSearchStore();
const { storeShowSearch_web } = storeToRefs(searchStore);

//웹 검색창 비활성화
function toggleSearchWeb() {
  if (storeShowSearch_web) {
    searchStore.setstoreShowSearch_web(false);
  }
}
</script>
<style lang="scss"></style>
