<template>
  <div class="relative">
    <div
      :class="props.propsClass"
      class="relative"
      @click.stop="componentStore.toogleCloseDropdown(false)"
      v-on:click="toggleDropdown()"
    >
      <button
        class="text-everly-dark_grey py-3 rounded-lg border border-everly-mid_grey text-xs md:text-sm bg-white text-left pl-3 pr-8 flex justify-between"
        :class="props.propsClass"
      >
        {{ title }}
      </button>
      <i
        class="fas fa-chevron-down absolute right-3 top-3.5 text-everly-dark_grey"
      ></i>
    </div>
    <div
      class="text-everly-dark_grey mt-1 rounded absolute z-10 shadow-lg border border-everly-mid_grey text-xs md:text-sm bg-white cursor-pointer"
      :class="props.propsClass"
      v-if="show"
    >
      <ul
        class="list-none overflow-hidden rounded"
        :class="props.propsDropdown"
      >
        <li v-for="key in props.propsList">
          <div
            href=""
            class="flex py-2 px-4 hover:bg-[#f0f0f0]"
            @click="
              title = key;
              show = !show;
              emit(`getValue`, key);
            "
          >
            {{ key }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, type PropType } from "vue";
import { useComponentStore } from "@/store/modules/common/componentStore";
import { storeToRefs } from "pinia";

const componentStore = useComponentStore();
const { closeDropdown } = storeToRefs(componentStore);

const emit = defineEmits(["getValue"]);
const props = defineProps({
  propsClass: String,
  propsDropdown: String,
  propsList: Object as PropType<string[]>,
  propsPlaceholder: String,
});

let show = ref(false);
let title = ref(props.propsPlaceholder);

watch(closeDropdown, (a, b) => {
  if (a == false && b == true) {
    show.value = false;
  }
});

async function toggleDropdown() {
  if (!show.value) {
    await componentStore.toogleCloseDropdown(true);
    await componentStore.toogleCloseDropdown(false);
  }
  show.value = !show.value;
}
</script>

<style scoped></style>
