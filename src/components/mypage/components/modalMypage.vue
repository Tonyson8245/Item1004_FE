<template>
  <div class="cursor-pointer">
    <div
      v-if="propsShowModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-sm">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none sm:w-[22.5rem] md:[27.5rem]"
        >
          123132
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

const router = useRouter();

const props = defineProps<{
  propsShowModal: boolean;
  propsType: string;
}>();
const emit = defineEmits(["update:propsShowModal"]);
const propsShowModal = useVModel(props, "propsShowModal", emit);
</script>
<style scoped></style>
