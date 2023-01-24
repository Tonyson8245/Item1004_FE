<template>
  <modalList
    :propsShowModal="showModal"
    :propsType="''"
    :propsList="list"
    @update:propsShowModal="
      showList(false);
      getValue($event);
    "
  />

  <!-- 실행 문장 -->
  <div
    class="w-full sm:w-[22.5rem] sm:h-[26.813rem] md:w-[27.5rem] md:h-[32.5rem]"
    v-if="storePutBankAccountStatus == 'ongoing'"
  >
    <div class="p-3 space-y-7 md:space-y-[4.5rem]">
      <div class="text-lg font-bold text-center pt-[2.6rem]">
        <span class="text-everly-main text-xl">item1004 </span>
        님의 <br />출금계좌 인증하기
      </div>
      <div class="space-y-2">
        <div>
          <!-- 웹일때 -->
          <dropdownVue
            :propsClass="'w-full text-sm'"
            :propsList="list"
            :propsPlaceholder="'은행을 선택해주세요'"
            :propsDropdown="'h-52 overflow-y-scroll'"
            @getValue="getValue($event)"
            class="hidden sm:block"
          />
          <!-- 모바일일때 -->
          <div class="relative block sm:hidden" @click="showList(true)">
            <button
              class="text-everly-dark_grey py-3 rounded-lg border border-everly-mid_grey text-xs md:text-sm bg-white text-left pl-3 pr-8 flex justify-between w-full"
            >
              {{ bankName == "" ? "은행명을 입력해주세요" : bankName }}
            </button>
            <i
              class="fas fa-chevron-down absolute right-3 top-3.5 text-everly-dark_grey"
            ></i>
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="계좌번호를 입력해주세요"
            v-model="bankAccountNumber"
            @input="(event: Event) => {  bankAccountNumber=(event.target as HTMLInputElement).value; }"
            class="border w-full p-3 rounded-lg text-sm"
          />
        </div>
        <div
          class="w-full p-3 rounded-lg bg-everly-light_grey text-everly-dark_grey text-sm"
        >
          예금주명 : {{ storeUserInfoOverview.name }}
        </div>
      </div>
      <div class="space-y-2">
        <div
          class="text-center p-2 rounded-lg"
          :class="verifyClass"
          @click="verify()"
        >
          인증하기
        </div>
        <div
          class="text-everly-main bg-everly-light_blue text-center p-2 rounded-lg"
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
  <!-- 성공 -->
  <div
    class="w-full sm:w-[22.5rem] sm:h-[24.125rem] md:w-[27.5rem] md:h-[16.8rem]"
    v-else-if="storePutBankAccountStatus == 'success'"
  >
    <div class="p-5 space-y-24 sm:space-y-3 md:space-y-7">
      <div class="flex flex-col items-center pb-24 md:pb-0">
        <img
          src="@/assets/icon/check_circle_green_full.svg"
          alt=""
          class="w-8 md:w-10 md:h-10 mt-20 sm:mt-14 mb-10 md:mt-3 md:mb-8"
        />
        <div class="text-xl font-bold mb-4 md:mb-7">
          계좌 인증에 성공하였습니다.
        </div>
        <div>
          {{ bankName }} {{ bankAccountNumber }} (예금주
          {{ storeUserInfoOverview.name }})
        </div>
      </div>

      <div
        class="text-everly-white bg-everly-main text-center p-2 rounded-lg"
        v-on:click="
          goBack();
          emit('update:propsShowModal', false);
        "
      >
        확인
      </div>
    </div>
  </div>
  <!-- 실패 -->
  <div
    class="w-full sm:w-[22.5rem] sm:h-[26.813rem] md:w-[27.5rem] md:h-[32.5rem]"
    v-else
  >
    <div class="p-5 space-y-7 md:space-y-[4.5rem]">
      <div class="flex flex-col items-center pt-10 pb-32 sm:pb-20 md:pb-28">
        <img
          src="@/assets/icon/warning_red.svg"
          class="w-10 sm:w-8 sm:pt-10 sm:pb-8 md:py-10"
          alt=""
        />
        <div class="text-center text-xl font-bold pb-2">
          입력하신 계좌 정보가<br />정확한지 다시 확인해주세요
        </div>
        <div class="flex text-evelry-dark_grey">
          <img
            src="@/assets/icon/warning_grey.svg"
            alt=""
            class="pr-1 text-sm"
          />본인 명의 계좌만 등록이 가능합니다
        </div>
      </div>
      <div
        class="text-everly-white bg-everly-main text-center p-2 rounded-lg"
        v-on:click="
          goBack();
          emit('update:propsShowModal', false);
        "
      >
        확인
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import modalList from "../components/modalList.vue";
import dropdownVue from "@/components/common/dropdown.vue";
import { useMediaQuery } from "@vueuse/core";
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { storeToRefs } from "pinia";
const emit = defineEmits(["update:propsShowModal"]);
const mypageStore = usemypageStore();
const router = useRouter();

onMounted(() => {
  mypageStore.setstorePuBankAccountStore("ongoing");
});
onUnmounted(() => {
  mypageStore.setstorePuBankAccountStore("");
});
//인증 진행 상태//유저 정보
const { storePutBankAccountStatus, storeUserInfoOverview } =
  storeToRefs(mypageStore);

//은행 명들
const list = [
  "기업은행",
  "국민은행",
  "수협중앙회",
  "농협중앙회",
  "농협회원조합",
  "우리은행",
  "SC제일은행",
  "한국시티은행",
  "대구은행",
  "부산은행",
  "광주은행",
  "제주은행",
  "전북은행",
  "경남은행",
  "새마을금고연합회",
  "신협중앙회",
  "하나은행",
  "신한은행",
  "우체국",
  "케이뱅크",
  "카카오뱅크",
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

//드롭다운 데이터 가져오기
function getValue(event: string) {
  bankName.value = event;
}

//인증하기 버튼 활성화
const bankName = ref("");
const bankAccountNumber = ref("");
const verifyClass = ref("bg-everly-mid_grey text-everly-white");

watch([bankName, bankAccountNumber], () => {
  if (bankName.value != "" && bankAccountNumber.value != "")
    verifyClass.value = "bg-everly-main text-everly-white";
  else verifyClass.value = "bg-everly-mid_grey text-everly-white";
});

//리스트 보여주기
const showModal = ref(false);
function showList(status: boolean) {
  showModal.value = status;
}

// 모바일때 뒤로가기
function goBack() {
  //모바일
  if (!minSize.value.value) router.go(-1);
}

function verify() {
  if (bankName.value != "" && bankAccountNumber.value != "") {
    mypageStore.putBankAccount(bankName.value, bankAccountNumber.value);
  }
}
</script>

<style scoped></style>
