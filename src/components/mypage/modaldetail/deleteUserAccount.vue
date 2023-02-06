<template>
  <div
    class="w-full md:w-[51.875rem] md:h-[43.938rem] space-y-3 bg-everly-light_grey md:bg-everly-white md:py-2"
  >
    <div class="bg-everly-white py-7 md:py-3 px-4">
      <div class="text-sm font-bold">
        회원탈퇴
        <span class="hidden md:block"> 사유를 최소 1개 이상 선택해주세요 </span>
      </div>
      <div class="grid md:grid-cols-2 text-everly-dark_grey text-sm py-2">
        <div>선택지 1</div>
        <div>선택지 2</div>
        <div>선택지 3</div>
        <div>선택지 4</div>
        <div>선택지 5</div>
        <div>선택지 6</div>
      </div>
      <div>
        <div>회원 탈퇴사유를 적어주세요</div>
        <div>(0/200자)</div>
      </div>
    </div>
    <hr class="border-everly-light_grey border hidden md:block mx-4" />
    <div class="bg-everly-white py-7 md:py-3 px-4">
      <div>회원탈퇴 안내사항</div>
      <div>
        <div>
          1. 탈퇴 신청 후 14일 까지는 탈퇴가 유예됩니다. 만약 유예기간 내에 다시
          로그인할 경우 기존 회원정보는 유지되며 탈퇴 신청 이전과 동일하게 사용
          가능합니다.
        </div>
      </div>
      <div>
        2. 탈퇴 신청 14일 이후에 탈퇴 처리 시 사용자의 데이터는 아래와 같이
        처리됩니다.
        <div>
          -회원가입 시 제공하신 개인 정보 (이메일, 나이, 생일)는 영구
          삭제됩니다.
        </div>
        <div>
          -작성하신 거래글과 닉네임은 유지됩니다. ( 위 정보가 남지 않기를 원하는
          사용자는 각 데이터를 삭제 후 탈퇴 신청을 하시기 바랍니다.)
        </div>
      </div>
      <div>3. 탈퇴 처리 후 재 회원가입 시 신규 사용자로 가입됩니다.</div>
    </div>
    <hr class="border-everly-light_grey border hidden md:block mx-4" />
    <div class="bg-everly-white py-7 md:py-3 px-4">
      <div>회원탈퇴 동의</div>
      <div>회원 탈퇴 동의 선택</div>
    </div>
    <div class="space-y-2 hidden md:block px-56">
      <div class="text-center py-2.5 rounded-lg" :class="buttonClass">
        인증하기
      </div>
      <div
        class="text-everly-main bg-everly-light_blue text-center py-2.5 rounded-lg"
        v-on:click="
          goBack();
          emit('update:propsShowModal', false);
        "
      >
        취소
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
const buttonClass = ref("bg-everly-mid_grey text-everly-white");
</script>

<style scoped></style>
