<template>
  <div
    class="w-full flex z-10 absolute border-b border-everly-light_blue md:border-none"
    :class="classBgcolor"
    v-if="!(route.meta.title == `결제 완료` && minSize.value)"
  >
    <div class="flex-1"></div>
    <div
      class="flex-none md:w-[1180px] py-3 w-full font-bold text-base md:text-xl px-4"
      :class="classBgcolor"
    >
      <div class="flex">
        <div class="flex-none pt-1 pr-3 md:hidden" @click="backPress()">
          <img
            src="@/assets/icon/arrow_left.png"
            alt=""
            v-if="route.meta.title == `결제 완료`"
          />
          <img src="@/assets/icon/back_white_mobile.svg" alt="" v-else />
        </div>
        <div>{{ route.meta.title }}</div>
      </div>
    </div>
    <div class="flex-1"></div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useMediaQuery } from "@vueuse/core";

const router = useRouter();
const route = useRoute();

//사이즈 확인
const minSize = computed(() => {
  return useMediaQuery("(min-width: 768px)");
});
// 들어가는 클래스
const classBgcolor = ref(``);
//색상 정보
const bgColoType = (type: boolean) => {
  return type
    ? `bg-everly-main text-everly-white`
    : `bg-everly-white text-everly-black`;
};

onMounted(() => {
  //초기 색상 잡아주기
  if (route.meta.title == "결제 완료") {
    classBgcolor.value = bgColoType(minSize.value.value);
  } else classBgcolor.value = bgColoType(true);
}),
  //반응형 배경
  watch(minSize.value, (minSize) => {
    console.log(123);

    if (route.meta.title == "결제 완료") {
      classBgcolor.value = bgColoType(minSize);
    } else classBgcolor.value = bgColoType(true);
  });

function backPress() {
  router.go(-1);
}
</script>

<style scoped></style>
