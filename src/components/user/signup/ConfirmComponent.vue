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
      <div class="hidden md:block cursor-pointer" @click="moveLink('/')">
        <img class="w-36" src="@/assets/icon/logo_mobile.svg" alt="" />
      </div>
      <div
          class="text-center p-1 mt-20 md:mt-5 w-11/12 font-bold text-everly-black md:text-2xl"
      >
        회원가입
      </div>
      <div
        class="text-left p-1 mt-20 md:mt-5 w-11/12 font-bold text-everly-main md:text-lg"
      >
        본인인증
      </div>
      <div class="text-sm px-5 md:px-6">
        본인인증 시 제공되는 정보는 해당 인증기관에서 직접 수집하며, 인증 이외의
        용도로 이용 또는 저장하지 않습니다.
      </div>

      <div class="grid p-1 gap-2 place-items-center w-full mt-4 md:mt-8">
        <button
          class="h-11 lg:h-15 px-6 py-2 rounded-lg text-sm text-everly-white bg-everly-main w-11/12"
          @click="getNiceEncData()"
        >
          본인인증하기
        </button>
      </div>

      <!-- 본인인증 서비스 팝업을 호출하기 위해서는 다음과 같은 form이 필요합니다. -->
      <form name="form_chk" method="post" class="hidden" target="_blank">
        <input type="hidden" name="m" value="checkplusService" />
        <!-- 필수 데이타로, 누락하시면 안됩니다. -->
        <input type="hidden" name="EncodeData" :value="encData" />
        <!-- 위에서 업체정보를 암호화 한 데이타입니다. -->

        <a @click="fnPopup()" class="cursor-pointer">
          CheckPlus 안심본인인증 Click</a
        >
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import modalSmall from "@/components/modal/modalSmall.vue";
import { useauthStore } from "@/store/modules/auth/authStore";
import { computed, watch, ref, onMounted } from "vue";
import { useMediaQuery, useToggle } from "@vueuse/core";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const router = useRouter();
let buttonContent = ref("");
let link: string;
let isLargeScreen = computed(() => useMediaQuery("(min-width: 1024px)"));

watch(isLargeScreen.value, () => {
  if (isLargeScreen.value.value) buttonContent.value = "인증번호";
  else buttonContent.value = "";
});

function moveLink(type: string) {
  link = type;
  switch (type) {
    case "setinfo":
      link = "/account/signUp/setinfo";
      break;
  }
  router.push(link);
}

const showModal = ref(false);
const contentText = `인증 번호가 발송되었습니다.`;
const buttonText = `확인`;

const toggle = useToggle(showModal);

//나이스 본인인증
const authStore = useauthStore();
const { storeredirect } = storeToRefs(authStore);
const encData = ref("");
function getNiceEncData() {
  var agent = navigator.userAgent.toLowerCase();

  if (agent.indexOf("version") > -1) {
    alert(
      "아이폰 또는 사파리 브라우저에서의 회원가입은 지원 예정입니다.\n안드로이드 폰이나 PC를 이용해주세요.\n위 경우 외에 오류가 발생할 시, 고객센터에 문의해주세요."
    );
    router.push("/account/login");
  } else {
    authStore.getNiceEncData("register").then((res) => {
      if (res?.encryptionData) {
        encData.value = res?.encryptionData;
        setTimeout(() => {
          fnPopup();
        }, 100);
      } else console.log("올바르지 않은 암호화 값 입력");
    });
  }
}

watch(storeredirect, () => {
  if (storeredirect.value) router.push("/account/signUp/setinfo");
});

function fnPopup() {
  //@ts-ignore
  window.open(
    "",
    "popupChk",
    "width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no"
  );
  //@ts-ignore
  document.form_chk.action =
    "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
  //@ts-ignore
  document.form_chk.target = "popupChk";
  //@ts-ignore
  document.form_chk.submit();
}
</script>

<style scoped></style>
