<template>
  <div
    class="w-full md:w-[51.875rem] space-y-3 bg-everly-light_grey md:bg-everly-white md:py-4 md:rounded-lg"
  >
    <div class="bg-everly-white py-7 md:py-1 px-4 md:px-5">
      <div
        class="text-sm md:text-xl font-bold flex items-center justify-between"
      >
        <div class="flex items-center">
          회원탈퇴
          <span class="hidden md:block ml-2 text-base"
            >(회원 탈퇴 사유를 선택해 주세요. 중복 가능)</span
          >
          <span class="md:hidden"> 사유를 최소 1개 이상 선택해주세요 </span>
        </div>
        <img
          src="@/assets/icon/close_grey.svg"
          alt=""
          class="hidden md:block"
          @click="emit('update:propsShowModal', false)"
        />
      </div>
      <div
        class="grid md:grid-cols-2 gap-3 md:gap-5 text-everly-dark_grey md:text-everly-black md:text-base text-sm py-3"
      >
        <div
          v-for="reason in reasonList"
          :key="reason"
          class="flex items-start"
        >
          <div>
            <label>
              <input
                class="radioinput"
                type="checkbox"
                :id="reason"
                :value="reason"
                v-model="checkedReason"
              />
              <span />
            </label>
          </div>
          <span class="pt-0.5 md:pt-0 md:pl-1">
            {{ reason }}
          </span>
        </div>
        <div>
          <label>
            <input
              class="radioinput"
              type="checkbox"
              id="checkbox"
              v-model="isActiveEtc"
            />
            <span />
          </label>
          <span class="pt-0.5 md:pt-0 md:pl-1">기타</span>
        </div>
      </div>
      <div
        class="text-xs border-everly-mid_grey border"
        :class="textareaClass(isActiveEtc)"
      >
        <textarea
          name=""
          id=""
          rows="3"
          placeholder="회원탈퇴 사유를 적어주세요"
          class="p-1 w-full h-[6.313rem]"
          style="resize: none"
          :disabled="!isActiveEtc"
          v-model="etcContent"
          @input="(event: Event) => {inserttoetcContent(event)}"
        ></textarea>
        <div class="border-everly-dark_grey text-right">
          ({{ etcContentLength }}/200자)
        </div>
      </div>
    </div>
    <hr class="border-everly-light_grey border hidden md:block mx-4" />
    <div class="bg-everly-white py-7 md:py-1 px-4 md:px-5 space-y-2">
      <div class="text-sm md:text-base font-bold">회원탈퇴 안내사항</div>
      <div
        class="text-xs md:text-sm md:text-everly-black space-y-2 text-everly-dark_grey"
      >
        <div class="flex">
          1.
          <span class="block pl-1">
            탈퇴 신청 후 14일 까지는 탈퇴가 유예됩니다. 만약 유예기간 내에 다시
            로그인할 경우 기존 회원정보는 유지되며 탈퇴 신청 이전과 동일하게
            사용 가능합니다.
          </span>
        </div>
        <div class="flex">
          2.
          <span class="block pl-1">
            탈퇴 신청 14일 이후에 탈퇴 처리 시 사용자의 데이터는 아래와 같이
            처리됩니다.
            <span class="block pl-1">
              - 회원가입 시 제공하신 개인 정보 (이메일, 나이, 생일)는 영구
              삭제됩니다.
            </span>
            <span class="block pl-1">
              - 작성하신 거래글과 닉네임은 유지됩니다. ( 위 정보가 남지 않기를
              원하는 사용자는 각 데이터를 삭제 후 탈퇴 신청을 하시기 바랍니다.)
            </span>
          </span>
        </div>
        <div class="flex">
          3.
          <span class="block pl-1"
            >탈퇴 처리 후 재 회원가입 시 신규 사용자로 가입됩니다.</span
          >
        </div>
      </div>
    </div>
    <hr class="border-everly-light_grey border hidden md:block mx-4" />

    <div class="bg-everly-white py-7 md:py-1 px-4 md:px-5 space-y-3">
      <div class="text-sm md:text-base font-bold">회원탈퇴 동의</div>
      <div class="text-xs flex md:text-base">
        <label>
          <input
            class="radioinput"
            type="checkbox"
            id="checkbox"
            v-model="withdrawlConfirm"
          />

          <span />
        </label>
        <span class="md:pl-1">
          회원 탈퇴 안내를 모두 확인하였으며 탈퇴에 동의합니다.
        </span>
      </div>
      <div class="md:px-56 space-y-2">
        <div
          class="text-center py-2.5 rounded-lg"
          :class="buttonClass"
          @click="deleteUserAccount()"
        >
          탈퇴하기
        </div>
        <div
          class="text-everly-main bg-everly-light_blue text-center py-2.5 rounded-lg hidden md:block"
          v-on:click="
            goBack();
            emit('update:propsShowModal', false);
          "
        >
          취소
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";

const emit = defineEmits(["update:propsShowModal"]);
const mypageStore = usemypageStore();
const router = useRouter();
const reasonList = [
  "서비스의 오류가 많음",
  "사용하기 불편함",
  "거래글 갯수가 적음",
  "다른 서비스가 더 좋음",
  "사용빈도가 낮음",
  "개인정보가 걱정됨",
  "물품이 안팔림",
  "사용 빈도가 너무 높음",
];

//사이즈 확인
const minSize = computed(() => {
  return useMediaQuery("(min-width: 640px)");
});
//화면이 커지면 유저정보로 보내는 로직
watch(minSize.value, (minSize) => {
  if (minSize) {
    //페이지가 웹 되는 경우
    router.push("/mypage/user/info");
  }
});

onMounted(() => {
  //웹버전에서 해당 이경로로 들어올 경우 막음
  if (minSize.value.value) router.push("/mypage/user/info");
});

// 모바일때 뒤로가기
function goBack() {
  //모바일
  if (!minSize.value.value) router.go(-1);
}

//탈퇴하기 버튼 상태
const buttonClass = ref(
  "bg-everly-mid_grey text-everly-white cursor-not-allowed"
);

//최종 탈퇴 선택지
const withdrawlConfirm = ref(false);
const checkedReason = ref([]); // 선택도니 탈퇴 사유 리스트

const etcContent = ref(""); // 기타 내용
const etcContentLength = ref(0); //기타 글 길이

watch(etcContent, (text) => {
  etcContentLength.value = text.length;
});
const isActiveEtc = ref(false); // 기타 활성화 여부

// 텍스트에어리어 색깔
const textareaClass = (status: boolean) => {
  if (status) return "";
  else return "bg-everly-wbg_grey";
};

function inserttoetcContent(event: Event) {
  var limit = 200;
  if ((event.target as HTMLInputElement).value.length <= limit) {
    etcContent.value = (event.target as HTMLInputElement).value;
  } else etcContent.value = etcContent.value.substring(0, limit);
}

//탈퇴하기 활성화
watch([withdrawlConfirm, checkedReason, etcContent, isActiveEtc], () => {
  if (
    withdrawlConfirm.value &&
    (checkedReason.value.length > 0 ||
      etcContent.value.length > 0 === isActiveEtc.value) //xnor 연산 둘다 true 거나 false 일때만 true
  ) {
    buttonClass.value = "bg-everly-main text-everly-white cursor-pointer";
  } else {
    buttonClass.value =
      "bg-everly-mid_grey text-everly-white cursor-not-allowed";
  }
});

//탈퇴
function deleteUserAccount() {
  if (buttonClass.value == "bg-everly-main text-everly-white cursor-pointer") {
    var reasonString = checkedReason.value.toString();

    if (etcContent.value.length > 0 && isActiveEtc.value)
      reasonString += "," + etcContent.value;

    mypageStore.deleteUserAccount(reasonString).then((res) => {
      if (res) {
        alert("회원 탈퇴가 완료되었습니다.");
        router.push("/logout");
      } else {
        alert("회원 탈퇴에 실패했습니다.");
      }
    });
  }
}
</script>

<style scoped>
textarea:focus {
  outline: none;
}
button:focus {
  outline: none;
}
input:focus {
  outline: none;
}

input::placeholder {
  text-align: left;
  padding-left: 10px;
}

.radioinput {
  display: none;
}

label {
  display: inline-block;
  cursor: pointer;
}

label span {
  position: relative;
  line-height: 22px;
}

label span:before,
label span:after {
  content: "";
}

label span:before {
  border: 1px solid #c7c7c7;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 5px;
  margin-bottom: 2.5px;
  display: inline-block;
  vertical-align: middle;
}
label span:after {
  background-image: url(@/assets/icon/checked_blue.svg);
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0px;
  bottom: -1px;
  background-size: cover;
  opacity: 0;
  vertical-align: middle;
}
@media (max-width: 768px) {
  label span:before {
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }

  label span:after {
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }
}

label input:checked + span:after {
  opacity: 1;
}
</style>
