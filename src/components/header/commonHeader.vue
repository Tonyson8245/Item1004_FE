<template>
  <div
    class="w-full flex z-10 absolute border-everly-light_blue md:border-none"
    :class="classBgcolor"
    v-if="!(whiteHeader && minSize.value)"
  >
    <div class="flex-1"></div>
    <div
      class="flex-none md:w-[1180px] py-3 w-full font-bold text-base md:text-xl px-4 md:px-0"
      :class="classBgcolor"
    >
      <div class="flex justify-between">
        <div class="flex justify-between space-x-2 items-center">
          <div class="flex-none pr-2 md:hidden" @click="backPress()">
            <img src="@/assets/icon/arrow_left.png" alt="" v-if="whiteHeader" />
            <img src="@/assets/icon/back_white_mobile.svg" alt="" v-else />
          </div>
          <div>{{ title }}</div>
        </div>
        <img
          src="@/assets/icon/contruction_white.svg"
          alt=""
          v-if="route.meta.title == `마일리지`"
          class="w-6"
          @click="router.push('./guide')"
        />
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
const bgColoType = (type: string) => {
  return type == "blue"
    ? `bg-everly-main text-everly-white`
    : `bg-everly-white text-everly-black border-b`;
};

onMounted(() => {
  //초기 색상 잡아주기
  //모바일
  if (!minSize.value.value) {
    //마이페이지의 경우
    if (whiteHeader.value) classBgcolor.value = bgColoType("white");
    //그외의 페이지의 경우
    else classBgcolor.value = bgColoType("blue");
  }
  //웹
  else {
    //무조건 파랑색
    classBgcolor.value = bgColoType("blue");
  }

  // if (whiteHeader) {
  //   classBgcolor.value = bgColoType(minSize.value.value);
  // } else classBgcolor.value = bgColoType(false);
});

//반응형 배경
watch(minSize.value, (minSize) => {
  if (!minSize) {
    //마이페이지의 경우
    if (whiteHeader.value) classBgcolor.value = bgColoType("white");
    //그외의 페이지의 경우
    else classBgcolor.value = bgColoType("blue");
  }
  //웹
  else {
    //무조건 파랑색
    classBgcolor.value = bgColoType("blue");
  }
});

function backPress() {
  router.go(-1);
}

//마이페이지의 경우, 웹은 "마이페이지" 고정 / 모바일은 상태에 따라 바뀜
const title = computed(() => {
  let meta = route.meta.title;

  if (headermyPageTheme.value) {
    if (minSize.value.value) return "마이페이지";
    else return meta;
  } else return meta;
});

//마이페이지 전용 헤더 타입
const headermyPageTheme = computed(() => {
  let title = route.meta.title;
  if (
    title == "마일리지" ||
    title == "판매/구매내역" ||
    title == "회원정보" ||
    title == "마일리지 충전" ||
    title == "마일리지 출금" ||
    title == "마일리지 현황" ||
    title == "판매내역" ||
    title == "구매내역" ||
    title == "회원정보수정"
  )
    return true;
  else return false;
});

//하얀 헤더만들기
const whiteHeader = computed(() => {
  let title = route.meta.title;
  let name = route.meta.name;

  if (title == `결제 완료` || name == "chargeResult") return true;
  else return false;
});
</script>

<style scoped></style>
