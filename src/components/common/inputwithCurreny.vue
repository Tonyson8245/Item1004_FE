<template>
  <div class="relative" :class="props.propsClass">
    <div
      class="absolute right-4 md:right-3 top-0 mt-[0.3rem] text-xs md:text-lg"
      :class="props.propsTextClass"
    >
      원
    </div>
    <input
      type="text"
      placeholder="0"
      :value="commonFunction.comma(content)"
      @input="(event: Event) => {changeValue(event)}"
      @keypress="isNumber"
      class="border-everly-mid_grey rounded-lg border py-1 px-2 pr-8 md:pr-8 text-xs md:text-lg text-right md:grow w-full"
    />
  </div>
</template>

<script setup lang="ts">
import commonFunction, { numberToKorean } from "@/common";
import { watch, ref } from "vue";
const props = defineProps({
  propsPlaceholder: String,
  propsClass: String,
  propsTextClass: String,
  modelValue: null,
  maxLimit: Number,
  minLimit: Number,
});
const emit = defineEmits(["changeValue"]);

const content = ref("");
// watch(props.modelValue, () => {
//   content.value = commonFunction.comma(props.modelValue);
// });

function changeValue(event: Event) {
  var value = event.target as HTMLInputElement;
  var uncommavalue = parseInt(commonFunction.uncomma(value.value));

  if (props.minLimit != undefined) {
    if (uncommavalue <= props.minLimit) {
      // 해당 이벤트의 값을 변경
      if (uncommavalue == 0) value.value = "";
      else value.value = props.minLimit.toString();
    }
  }
  if (props.maxLimit != undefined) {
    //해당 이벤트의 값을 최대값으로 변경
    if (uncommavalue >= props.maxLimit) value.value = props.maxLimit.toString();
  }
  commonFunction.inputNumberFormat(event.target as HTMLInputElement);

  emit("changeValue", value.value);
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
</script>

<style scoped></style>
