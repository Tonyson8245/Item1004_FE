<template>
  <div class="dropdown-wrapper relative bg-white">
    <button
      v-on:click="show = !show"
      class="text-everly-dark_grey py-3 w-14 md:w-20 md:w-28 whitespace-no-wrap rounded-lg transition duration-300 border border-everly-mid_grey text-xs md:text-sm"
    >
      {{ title }} <i class="fas fa-chevron-down md:ml-0.5"></i>
    </button>
    <div
      class="dropdown-menu bg-white text-everly-dark_grey mt-1 rounded absolute z-10 w-20 shadow-lg max-w-xs border border-everly-mid_grey text-xs md:text-sm"
      v-if="show"
    >
      <ul class="list-none overflow-hidden rounded">
        <li v-for="a in unit">
          <div
            href=""
            class="flex py-2 px-4 duration-300 hover:bg-[#f0f0f0]"
            @click="
              title = a;
              show = !show;
            "
          >
            {{ a }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    currency: String,
  },
  setup(props) {
    let show = ref(false);
    let title = ref(props.currency);
    let unit = [
      props.currency,
      "만 " + props.currency,
      "억 " + props.currency,
      "조 " + props.currency,
    ];
    return { show, unit, title };
  },
};
</script>

<style scoped></style>
