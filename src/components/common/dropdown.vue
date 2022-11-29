<template>
  <div class="dropdown-wrapper relative">
    <button
      v-on:click="show = !show"
      :class="'bg-' + color"
      class="text-everly-dark_grey py-3 w-14 md:w-20 whitespace-no-wrap rounded-lg transition duration-300 border border-everly-mid_grey text-xs md:text-sm"
    >
      {{ title }} <i class="fas fa-chevron-down md:ml-0.5"></i>
    </button>
    <transition :name="animation">
      <div
        :class="'bg-' + color + '-500'"
        class="dropdown-menu text-everly-dark_grey mt-1 rounded absolute z-10 w-20 shadow-lg max-w-xs border border-everly-mid_grey text-xs md:text-sm"
        v-if="show"
      >
        <ul class="list-none overflow-hidden rounded">
          <li v-for="a in category">
            <div
              href=""
              class="flex py-2 px-4 duration-300 hover:bg-[#f0f0f0]"
              @click="
                title = a;
                show = !show;
              "
              :class="'theme-' + color + ' bg-' + color"
            >
              {{ a }}
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    color: String,
    animation: String,
  },
  setup(props) {
    let show = ref(false);
    let title = ref("통신사");
    let category = ["SKT", "LG", "KT", "알뜰폰"];
    return { show, category, title };
  },
};
</script>

<style scoped></style>
