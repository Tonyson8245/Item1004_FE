<template>
  <div class="cursor-pointer">
    <div
      v-if="propsShowModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex"
    >
      <div class="relativeo my-6 mx-auto max-w-sm w-full flex justify-center">
        <!--content-->
        <div
          class="border-0 shadow-lg relative flex rounded-xl flex-col outline-none focus:outline-none justify-center overflow-hidden w-10/12"
        >
          <div class="relative flex-auto">
            <img
              src="@/assets/img/noti.png"
              alt=""
              @click="moveExternalLink('공지사항')"
            />
            <div
              class="w-6 h-6 md:w-8 md:h-8 absolute top-0 right-0"
              @click="close()"
            ></div>
            <div
              class="w-6 h-6 md:w-8 md:h-8 absolute bottom-0 left-0"
              @click="closewithCookie()"
            ></div>
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
import { moveExternalLink } from "@/common";

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
function close() {
  emit("update:propsShowModal", false);
}
</script>
<style scoped></style>
