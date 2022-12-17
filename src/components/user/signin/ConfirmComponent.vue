<template>
  <div class="h-screen flex-grow md:flex">
    <modalSmall
      :propsShowModal="showModal"
      :propsButtonText="buttonText"
      :propsContentText="contentText"
      :propsLink="``"
      @update:propsShowModal="toggle()"
    />
    <div class="grid place-items-center w-full md:m-auto">
      <div class="hidden md:block">
        <img class="w-36" src="@/assets/icon/logo_mobile.svg" alt="" />
      </div>
      <div
        class="text-left p-1 mt-20 md:mt-5 w-11/12 md:font-bold text-everly-main text-sm md:text-lg"
      >
        본인인증
      </div>

      <div class="grid gap-2 place-items-center mt-2 w-full p-1">
        <div class="pr-0 flex items-center w-11/12">
          <div class="flex w-4/5 mr-1">
            <dropdown
              :propsList="['a', 'b', 'c']"
              :propsPlaceholder="`통신사`"
              :propsClass="`flex-1`"
            ></dropdown>
            <input
              placeholder="휴대 전화번호 입력('-'제외)"
              class="ml-1 flex-1 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm w-full"
            />
          </div>
          <button
            class="bg-everly-main text-white rounded-lg shadow-md text-xs md:text-sm py-3 w-1/5"
            @click="
              contentText = '인증번호가 전송되었습니다.';
              toggle();
            "
          >
            {{ buttonContent }} 전송
          </button>
        </div>
        <div class="pr-0 flex items-center w-11/12">
          <input
            placeholder="인증 번호 6자리를 입력하세요"
            class="mr-1 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm w-4/5"
          />
          <button
            class="bg-everly-main text-white rounded-lg shadow-md text-xs md:text-sm py-3 w-1/5"
          >
            {{ buttonContent }} 확인
          </button>
        </div>
      </div>

      <div class="grid p-1 gap-2 place-items-center w-full mt-4 md:mt-8">
        <button
          class="h-11 lg:h-15 px-6 py-2 rounded-lg text-sm text-everly-white bg-everly-mid_grey w-11/12"
          @click="moveLink('setinfo')"
        >
          가입하기
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import modalSmall from "@/components/modal/modalSmall.vue";
import dropdown from "@/components/common/dropdown.vue";
import { useMediaQuery, useToggle } from "@vueuse/core";
import { computed, watch, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
let buttonContent = ref("");
let link: string;
let isLargeScreen = computed(() => useMediaQuery("(min-width: 1024px)"));

watch(isLargeScreen.value, () => {
  if (isLargeScreen.value.value) buttonContent.value = "인증번호";
  else buttonContent.value = "";
});

function moveLink(type: string) {
  switch (type) {
    case "setinfo":
      link = "/account/signin/setinfo";
      break;
  }
  router.push(link);
}

const showModal = ref(false);
const contentText = `인증 번호가 발송되었습니다.`;
const buttonText = `확인`;

const toggle = useToggle(showModal);
</script>

<style scoped></style>
