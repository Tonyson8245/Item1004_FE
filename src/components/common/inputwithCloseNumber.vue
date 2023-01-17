<template>
  <div class="flex relative w-full">
    <input
      type="text"
      v-model="content"
      @keypress="isNumber"
      :placeholder="props.propsPlaceholder"
      @input="(event: Event) => {  emit('getModel', (event.target as HTMLInputElement).value); }"
      class="border rounded-lg focus:border-[#3f52fc] border-everly-mid_grey placeholder:text-sm"
      :class="props.propsClass"
    />
    <img
      src="@/assets/icon/close_grey.svg"
      class="absolute right-0 p-4 hidden md:block"
      alt=""
      v-show="content != ''"
      @click="refresh()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits(["getModel", "clearContent"]);
const props = defineProps({
  propsPlaceholder: String,
  propsClass: String,
  modelValue: String,
});

let content = ref("");

function refresh() {
  content.value = "";
  emit("clearContent");
}

function isNumber(evt: any) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
}
// TODO 천의자리 끊기
// watch(content, () => {
//   content.value = parseInt(content.value).toLocaleString();
// });
</script>

<style scoped></style>
