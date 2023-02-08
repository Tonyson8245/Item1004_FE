<template>
  <div class="flex relative w-full">
    <input
      type="text"
      :value="commonFunction.comma(content)"
      @input="(event: Event) => {  changeValue(event); }"
      @keypress="isNumber"
      :placeholder="props.propsPlaceholder"
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
import { ref } from "vue";
import commonFunction from "@/common";
import { isEmpty } from "class-validator";

const emit = defineEmits(["getModel", "clearContent"]);
const props = defineProps({
  propsPlaceholder: String,
  propsClass: String,
  modelValue: String,
});

const content = ref("");

function changeValue(event: Event) {
  var value = event.target as HTMLInputElement;
  commonFunction.inputNumberFormat(event.target as HTMLInputElement);

  content.value = value.value;
  emit("getModel", commonFunction.uncomma(value.value));
}

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

if (props.modelValue != null && !isEmpty(props.modelValue)) {
  content.value = props.modelValue;

  if (props.modelValue == "0") content.value = "";
}
</script>

<style scoped></style>
