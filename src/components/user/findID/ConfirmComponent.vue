<template>
  <div class="h-screen flex-grow md:flex">
    <modalSmall
      :propsShowModal="storeCreateSMSshowModal"
      :propsButtonText="`확인`"
      :propsContentText="contentText"
      :propsLink="link"
      @update:propsShowModal="toggle()"
    />
    <div class="grid place-items-center w-full md:m-auto">
      <div class="hidden md:block">
        <img class="w-36" src="@/assets/icon/logo_mobile.svg" alt="" />
      </div>
      <div
        class="text-left mt-20 md:mt-5 w-full px-6 md:text-center font-bold sm"
      >
        <div class="text-2xl md:text-[30]">아이디를 잊으셨나요?</div>
        <div class="text-lg md:text-[28]">걱정 마세요. 금방 찾아드릴게요!</div>
      </div>

      <div class="grid gap-2 place-items-center w-11/12 mt-8 md:mt-16">
        <div class="w-full">
          <div class="p-1 pr-0 flex items-center">
            <input
              placeholder="휴대 전화번호 입력('-'제외)"
              v-model="phoneNumber"
              @input="replaceToNumber('phone', phoneNumber)"
              class="flex-1 mr-2 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm"
            />
            <button
              class="bg-everly-main text-white rounded-lg shadow-md p-3 text-xs md:text-sm"
              @click="
                contentText = `인증번호가 발송되었습니다.`;
                sendSMS();
              "
            >
              인증번호 발송
            </button>
          </div>
          <div class="p-1 pr-0 flex items-center relative">
            <input
              placeholder="인증 번호 6자리를 입력하세요"
              v-model="codeNumber"
              @input="replaceToNumber('code', codeNumber)"
              class="flex-1 mr-2 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm"
            />
            <div
              class="absolute text-everly-mid_grey text-xs md:text-sm right-28 md:right-32"
              v-if="timerShow"
            >
              <div>
                <span>{{ fillZero(2, timer.minutes.value.toString()) }}</span
                >:<span>{{ fillZero(2, timer.seconds.value.toString()) }}</span>
              </div>
            </div>
            <button
              class="bg-everly-mid_grey text-white rounded-lg shadow-md p-3 text-xs md:text-sm"
              :class="checkButtonClass"
              @click="checkCode()"
            >
              인증번호 확인
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import modalSmall from "@/components/modal/modalSmall.vue";

import { ref, watch } from "vue";
import { useToggle } from "@vueuse/shared";

import { useRouter } from "vue-router";
import { useauthStore } from "@/store/modules/auth/authStore";
import { CreateSmsCodeBodyDto, checkSMSBodyDto } from "@/domain/auth";
import { storeToRefs } from "pinia";
import { watchEffect, onMounted } from "vue";
import { useTimer } from "vue-timer-hook";

const link = ref("");
const router = useRouter();

const contentText = ref(``);

//전화번호 인증
const phoneNumber = ref("01082458698");
const codeNumber = ref("");
const authStore = useauthStore();
const lastTime = ref(3);
const timerShow = ref(false);
const checkButtonClass = ref("cursor-not-allowed bg-everly-mid_grey");

const { storeCreateSMSshowModal, storeCheckSMSisSuccess } =
  storeToRefs(authStore);
const toggle = useToggle(storeCreateSMSshowModal);

// TODO 데이터 저장하는 위치가 View단에 위치해있음, 고민해볼 것
function sendSMS() {
  var body = new CreateSmsCodeBodyDto();
  if (!isPhonenumber(phoneNumber.value)) {
    // 형식에 맞지 않으면 전송이 안됨
    return;
  }
  console.log(`success`);
  body.phone = phoneNumber.value;
  authStore.creatSMSCode(`findId`, body);
  lastTime.value = 3;
  timerShow.value = true;
  restart();
}

function checkCode() {
  var data = new checkSMSBodyDto();
  data.code = codeNumber.value;
  data.mode = `findId`;
  //인증번호가 발송 됬을 때만 동작

  console.log(isChecknumber(data.code));

  if (timerShow.value && isChecknumber(data.code)) {
    authStore.checkSMSCode(data).then((res) => {
      if (res) {
        contentText.value = "인증에 성공하였습니다.";
        link.value = "./result";
      } else {
        lastTime.value -= 1;
        if (lastTime.value <= 0) {
          contentText.value = "인증 횟수가 만료되었습니다.\n다시 발송해주세요";
          authStore.setstoreauthId(``); //auth id 초기화
          restart(); // 타이머 초기화
          timer.pause(); // 타이머 정지
          timerShow.value = false; // 타이머 안보이게하기
        } else
          contentText.value =
            "인증번호를 다시 입력해주세요.\n(남은 횟수 " +
            lastTime.value +
            "번)";
      }
      authStore.setstoreCreateSMSshowModal(true);
    });
  }
}

///타이머
const time = new Date();
time.setSeconds(time.getSeconds() + 180); // 10 minutes timer
//@ts-ignore
const timer = useTimer(time);
timer.pause();
const restart = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 180);
  //@ts-ignore
  timer.restart(time);
};

onMounted(() => {
  watchEffect(async () => {
    if (timer.isExpired.value) {
      contentText.value = "인증 시간 만료\n인증번호를 다시 발송해주세요";
      authStore.setstoreCreateSMSshowModal(true);
      timerShow.value = false;
    }
  });
});

//타이머 활성화 & 6글자 정규식통과 할때만 됬을때만 인증 번호 확인 활성화
watch([timerShow, codeNumber], () => {
  if (timerShow.value && isChecknumber(codeNumber.value))
    checkButtonClass.value = `cursor-pointer bg-everly-main`;
  else checkButtonClass.value = `cursor-not-allowed bg-everly-mid_grey`;
});

// 채우기
function fillZero(width: number, str: string) {
  return str.length >= width
    ? str
    : new Array(width - str.length + 1).join("0") + str; //남는 길이만큼 0으로 채움
}

//전화번호 정규식
function isPhonenumber(phoneNumber: string) {
  if (/(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/.test(phoneNumber))
    return true;
  else false;
}

//인증번호 정규식
function isChecknumber(phoneNumber: string) {
  if (/^[0-9]{6}$/.test(phoneNumber)) return true;
  else return false;
}

// 숫자 길이 제한 및 정규식 확인
function replaceToNumber(mode: string, code: string) {
  if (mode == "phone") {
    var temp = phoneNumber.value;
    phoneNumber.value = code.replace(/[^0-9]$/, ""); //정규식 사용
    //길이 제한
    if (phoneNumber.value.length > 11) {
      phoneNumber.value = temp.slice(0, temp.length - 1);
    }
  } else {
    var temp = codeNumber.value;
    codeNumber.value = code.replace(/[^0-9]$/, ""); //정규식 사용
    //길이 제한
    if (codeNumber.value.length > 6) {
      codeNumber.value = temp.slice(0, temp.length - 1);
    }
  }
}
</script>

<style scoped></style>
