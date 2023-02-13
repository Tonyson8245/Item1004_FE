<template>
  <div class="flex flex-col mt-16 md:mt-36 px-5 items-center">
    <div class="flex flex-col items-center md:flex-row md:w-1/2">
      <img class="w-36 h-36" src="@/assets/icon/19.svg" alt="" />
      <div class="mt-5 flex-col md:ml-5">
        <b class="text-sm"
          >이 정보내용은 청소년 유해매체물로서 [정보통신망이용촉진 및 정보 보호
          등에 관한 법률] 및 [청소년 보호법]의 규정에 의하여 19세 미만의
          청소년이 이용할 수 없습니다.</b
        >
        <a
          href="https://www.naver.com"
          class="mt-6 border rounded-lg p-3 w-full text-white cursor-pointer bg-black flex justify-center"
        >
          <p class="mr-1 text-everly-yellow">19세미만</p>
          나가기</a
        >
      </div>
    </div>

    <div class="flex flex-col mt-16 md:w-1/2">
      <div class="flex w-full">
        <img
          class="w-14 mx-2 md:mx-0 md:w-36"
          src="@/assets/icon/phone_setification.svg"
          alt=""
        />
        <div class="ml-5">
          <b class="text-sm"
            >본인인증 시 제공되는 정보는 해당 인증기관에서 직접 수집하며, 인증
            이외의 용도로 이용 또는 저장하지 않습니다.</b
          >
          <button
            @click="getNiceEncData()"
            class="mt-6 border rounded-lg p-3 w-full text-white bg-everly-main justify-center hidden md:block"
          >
            휴대폰 인증하기
          </button>
        </div>
      </div>
      <button
        @click="getNiceEncData()"
        class="mt-6 border rounded-lg p-3 w-full text-white bg-everly-main flex justify-center md:hidden"
      >
        휴대폰 인증하기
      </button>
    </div>
    <b class="mt-6 md:mt-32 text-everly-main text-lg">www.item1004.co.kr</b>
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
</template>

<script lang="ts" setup>
import { useauthStore } from "@/store/modules/auth/authStore";
import { computed, watch, ref, onMounted, watchEffect } from "vue";
import { useMediaQuery, useToggle } from "@vueuse/core";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMeta, useActiveMeta } from "vue-meta";

// 라우터
const router = useRouter();
//나이스 본인인증
const authStore = useauthStore();
const { storeredirect } = storeToRefs(authStore);
const encData = ref("");
function getNiceEncData() {
  var agent = navigator.userAgent.toLowerCase();

  if (agent.indexOf("version") > -1) {
    alert(
      "아이폰 또는 사파리 브라우저에서의 인증은 지원 예정입니다.\n안드로이드 폰이나 PC를 이용해주세요.\n위 경우 외에 오류가 발생할 시, 고객센터에 문의해주세요."
    );
    // router.push("/account/login");
  } else {
    authStore.getNiceEncData("adult").then((res) => {
      if (res?.encData) {
        encData.value = res?.encData;
        console.log("res는 : ", res);

        setTimeout(() => {
          fnPopup();
        }, 100);
      } else console.log("올바르지 않은 암호화 값 입력");
    });
  }
}

// watch(storeredirect, () => {
//   if (storeredirect.value) router.push("/account/signUp/setinfo");
// });

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

// const { meta } = useMeta({
//   name: 'description',
// })

useMeta({
  meta: [
    {
      "http-equiv": "PICS-label",
      content:
        "(PICS-1.1 'http://service.kocsc.or.kr/rating.html' l gen true for 'http://item1004.co.kr/' r (y 1))",
    },
  ],
});
</script>
<style lang=""></style>
