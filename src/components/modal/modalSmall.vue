<template>
  <div class="cursor-pointer">
    <div
      v-if="showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-sm">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <div class="relative p-5 flex-auto">
            <p
              class="text-everly-main font-bold text-base md:text-lg text-center m-3 md:m-5"
            >
              {{ setting.detail_content }}
            </p>
          </div>
          <!--footer-->
          <div class="flex items-center justify-center p-5 pt-0">
            <button
              class="text-everly-main font-bold bg-everly-light_blue w-full py-2 rounded-lg text-sm md:text-lg"
              type="button"
              v-on:click="
                toggleModal();
                moveLink();
              "
            >
              {{ setting.button_content }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { useModal } from "@/store/modules/ui/modal";
import { computed } from "vue";
import { useVModel } from "@vueuse/core";

const store = useModal(); // 모달 store 가져오기

const showModal = computed(() => store.showModalSmall); // 모달 상태 가져오기
const setting = computed(() => store.ModalSmallSetting); // 모달 세팅 가져오기

var link: string;

const toggleModal = () => {
  store.controlModalSmall(!showModal); // 모달 켜고 끼는 것
};

function moveLink() {
  var text = setting.value.button_content;
  console.log(text);
  if (text == "확인") {
    return;
  }
  switch (text) {
    case "로그인하기":
      link = "/account/login";
      break;
  }
  router.push(link);
}
</script>
<style scoped></style>
