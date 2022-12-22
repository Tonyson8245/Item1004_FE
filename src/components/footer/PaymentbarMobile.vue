<template>
  <div class="text-center w-full fixed bottom-0 z-40 py-2 px-4 bg-everly-white">
    <div class="w-full flex space-x-2">
      <div class="flex-1 text-left font-bold">
        <div class="text-sm">최종결제금액</div>
        <div class="text-lg text-everly-main">208,368 원</div>
      </div>
      <div class="flex-1 flex items-center">
        <div
          class="rounded-lg text-everly-white bg-everly-mid_grey font-bold py-2 text-center text-sm w-full cursor-pointer"
          @click="goPay()"
        >
          결제하기
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from "@/store/modules/home/postStore";
import { useToggle } from "@vueuse/shared";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const postStore = usePostStore();
const { storeShowManagePost, storeShowBuy } = storeToRefs(postStore);

const toggle = useToggle(storeShowBuy);
const owner = ref(false);

const togglestoreShowManagePost = useToggle(storeShowManagePost);

//결제 클릭
const emit = defineEmits([`goPay`]);
function goPay() {
  emit("goPay");
}
</script>

<style scoped></style>
