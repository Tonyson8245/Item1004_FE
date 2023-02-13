<template>
  <div class="flex relative w-full">
    <input
      type="text"
      v-model="content"
      :placeholder="props.propsPlaceholder"
      @input="(event: Event) => {  emit('getModel', (event.target as HTMLInputElement).value); }"
      class="border rounded-lg focus:border-[#3f52fc] border-everly-mid_grey placeholder:text-sm "
      :class="props.propsClass"
    />
    <img
      src="@/assets/icon/close_grey.svg"
      class="absolute right-0 p-4 hidden md:block "
      alt=""
      v-show="content != ''"
      @click="refresh()"
    />
  </div>
</template>

<script setup lang="ts">
import { isEmpty } from "class-validator";
import { ref } from "vue";

const emit = defineEmits(["getModel", "clearContent"]);
const props = defineProps({
  propsPlaceholder: String,
  propsClass: String,
  modelValue: null,
});

let content = ref("");

function refresh() {
  content.value = "";
  emit("clearContent");
}
if (!isEmpty(props.modelValue)) {
  content.value = props.modelValue;
}
</script>

<style scoped></style>
