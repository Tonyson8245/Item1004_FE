<template>
  <div class="cursor-pointer">
    <div
      v-if="propsShowModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-sm">
        <!--content-->
        <div
          class="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <div class="relative p-5 flex-auto">
            <p
              class="text-everly-main font-bold text-base md:text-lg text-center m-3 md:m-5 whitespace-pre-wrap"
            >
              12312
            </p>
          </div>
          <!--footer-->
          <div class="flex items-center justify-center p-5 pt-0">
            <button
              class="text-everly-main font-bold bg-everly-light_blue w-full py-2 text-sm md:text-base"
              type="button"
              v-on:click="closewithCookie()"
            >
              123123
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="propsShowModal"
      class="opacity-25 fixed inset-0 z-40 bg-black"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useCookie } from "vue-cookie-next";

const { setCookie } = useCookie();

const router = useRouter();

const props = defineProps<{
  propsShowModal: boolean;
}>();
const emit = defineEmits(["update:propsShowModal"]);

const propsShowModal = useVModel(props, "propsShowModal", emit);

//쿠키
function closewithCookie() {
  setCookie("noti", "stop");
  emit("update:propsShowModal", false);
}
</script>
<style scoped></style>
