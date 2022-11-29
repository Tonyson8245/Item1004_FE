<template>
  <div class="dropdown-wrapper relative w-full">
    <div class="flex">
      <input
        v-on:click="show = !show"
        placeholder="게임명 또는 서버명을 입력해주세요."
        class="w-full rounded-l-lg border border-everly-mid_grey bg-white py-4 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm"
      />
      <div class="bg-everly-main rounded-r-lg">
        <img src="@/assets/icon/search_white_large.svg" alt="" />
      </div>
    </div>
    <transition :name="animation" class="w-full">
      <div
        class="dropdown-menu text-everly-dark_grey rounded absolute z-10 w-full shadow-lg text-xs md:text-sm"
        v-if="show"
      >
        <ul class="list-none overflow-hidden rounded">
          <li v-for="a in category">
            <div
              href=""
              class="flex py-2 px-4 duration-300 hover:bg-[#f0f0f0] bg-white"
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
