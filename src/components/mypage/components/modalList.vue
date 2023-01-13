<template>
  <div class="cursor-pointer w-full">
    <div
      v-if="propsShowModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex"
    >
      <div class="relative my-6 w-11/12 h-5/6 overflow-y-scroll">
        <!--content-->
        <div
          class="border-0 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none"
        >
          <div
            v-for="key in props.propsList"
            class="w-full p-5 border-b"
            v-on:click="emit('update:propsShowModal', key)"
          >
            {{ key }}
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
import type { PropType } from "vue";

const props = defineProps({
  propsList: Object as PropType<string[]>,
  propsShowModal: Boolean,
  propsType: String,
});

const emit = defineEmits(["update:propsShowModal"]);
const propsShowModal = useVModel(props, "propsShowModal", emit);
</script>
<style scoped></style>
