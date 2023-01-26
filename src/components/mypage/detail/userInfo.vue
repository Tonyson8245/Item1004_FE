<template>
  <ModalMypage
    :propsShowModal="showModal"
    :propsType="'userinfoPutAccount'"
    @update:propsShowModal="setShowModal(false)"
  />
  <div class="py-5 md:py-0 md:pl-8">
    <div class="hidden md:block text-xl font-bold pb-8">
      <div class="pb-8">회원 정보수정</div>
      <hr class="border-everly-dark_grey hidden md:block" />
    </div>
    <div class="px-5 md:px-0">
      <div class="font-bold md:text-lg pb-4 md:pb-8">기본정보</div>

      <div class="w-full md:w-[39.25rem] space-y-2 md:space-y-5">
        <div class="flex text-sm md:text-base">
          <div class="font-bold w-[5.5rem] md:w-[10rem]">이름</div>
          <div class="md:w-[25rem]">{{ storeUserInfoOverview.name }}</div>
        </div>
        <div class="flex text-sm md:text-base">
          <div class="font-bold w-[5.5rem] md:w-[10rem]">아이디</div>
          <div class="md:w-[25rem]">{{ storeUserInfoOverview.id }}</div>
        </div>
        <div class="flex text-sm md:text-base">
          <div class="font-bold w-[5.5rem] md:w-[10rem]">유저코드</div>
          <div class="flex md:w-[25rem]">
            #{{ storeUserInfoOverview.code }}
            <img
              src="@/assets/icon/copy_grey.svg"
              alt=""
              class="ml-2"
              @click="copy(`#A2379F56GH`)"
            />
          </div>
        </div>
        <div class="flex text-sm md:text-base items-center">
          <div class="font-bold w-[5.5rem] md:w-[10rem]">비밀번호</div>
          <div class="flex-1 md:w-[25rem]">• • • • • • • • •</div>
          <!-- TODO 1차 출시 주석 2023-01-26 01:48:24 -->
          <!-- <div
            class="text-xs whitespace-nowrap text-everly-dark_grey rounded-lg border py-1 px-2 bg-everly-white md:px-5 cursor-pointer"
          >
            수정
          </div> -->
        </div>
      </div>
    </div>
    <hr class="border-everly-light_grey my-4 md:my-8" />
    <div class="px-5 md:px-0 space-y-2 md:space-y-5 md:w-[39.25rem]">
      <div class="md:flex w-full md:pb-3">
        <div class="font-bold pb-2 md:pb-0 md:w-[10rem] md:text-xl">
          프로필 설정
        </div>
        <div
          class="text-everly-dark_grey text-xs space-x-2 items-center hidden md:flex"
        >
          <img
            src="@/assets/icon/exclamation_circle_grey.svg"
            alt=""
            class="md:w-3"
          />
          <div>프로필 설정 시 다른 사람들이 날 알아보기 더 쉬워져요!</div>
        </div>
      </div>
      <div class="flex items-center">
        <div class="font-bold w-[5.5rem] md:w-[10rem] hidden md:block">
          프로필이미지
        </div>
        <div class="flex-1 md:w-[25rem]">
          <div
            class="bg-everly-mid_grey rounded-lg w-16 h-16 md:w-16 md:h-16 overflow-hidden"
          >
            <img :src="`/assets/img/${storeUserInfoOverview.image}`" alt="" />
          </div>
        </div>

        <!-- TODO 1차 출시 주석 2023-01-26 01:48:24 -->
        <!-- <div
          class="text-xs whitespace-nowrap text-everly-dark_grey rounded-lg border py-1 px-2 bg-everly-white md:px-5 cursor-pointer"
        >
          수정
        </div> -->
      </div>
      <div class="flex items-center text-sm md:text-base">
        <div class="font-bold w-[5.5rem] md:w-[10rem]">닉네임</div>
        <div class="flex-1 md:w-[25rem]">
          {{ storeUserInfoOverview.nickname }}
        </div>

        <!-- TODO 1차 출시 주석 2023-01-26 01:48:24 -->
        <!-- <div
          class="text-xs whitespace-nowrap text-everly-dark_grey rounded-lg border py-1 px-2 bg-everly-white md:px-5 cursor-pointer"
        >
          수정
        </div> -->
      </div>
    </div>
    <hr class="border-everly-light_grey my-4 md:my-8" />
    <div class="px-5 md:px-0 space-y-2 md:space-y-5 md:w-[39.25rem]">
      <div class="md:flex w-full md:pb-3">
        <div class="font-bold pb-2 md:pb-0 md:w-[10rem] md:text-xl">
          내 인증 현황
        </div>
        <div
          class="text-everly-dark_grey text-xs space-x-2 items-center hidden md:flex"
        >
          <img
            src="@/assets/icon/exclamation_circle_grey.svg"
            alt=""
            class="md:w-3"
          />
          <div>
            세 가지 인증을 모두 받으면 닉네임 옆에 파란 마크가 표시돼요!
          </div>
        </div>
      </div>
      <div class="flex items-center text-sm md:text-base">
        <div class="font-bold hidden sm:w-[5.5rem] md:w-[10rem] sm:block">
          핸드폰번호
        </div>
        <div class="flex-1 md:w-[25rem] flex items-center">
          {{ storeUserInfoOverview.phone }}
          <img
            src="@/assets/icon/check_circle_blue.svg"
            alt=""
            class="w-4 ml-2"
          />
        </div>

        <!-- TODO 1차 출시 주석 2023-01-26 01:48:24 -->
        <!-- <div
          class="text-xs whitespace-nowrap text-everly-dark_grey rounded-lg border py-1 px-2 bg-everly-white md:px-5 cursor-pointer"
        >
          수정
        </div> -->
      </div>
      <div class="flex items-center text-sm md:text-base">
        <div class="font-bold hidden sm:w-[5.5rem] md:w-[10rem] sm:block">
          이메일
        </div>
        <div class="flex-1 md:w-[25rem] flex items-center">
          {{ emailContent(storeUserInfoOverview.email) }}
          <img
            src="@/assets/icon/check_circle_blue.svg"
            alt=""
            class="w-4 ml-2"
            v-if="storeUserInfoOverview.email != ''"
          />
        </div>

        <!-- TODO 1차 출시 주석 2023-01-26 01:48:24 -->
        <!-- <div
          class="text-xs whitespace-nowrap text-everly-dark_grey rounded-lg border py-1 px-2 bg-everly-white md:px-5 cursor-pointer"
        >
          {{ buttonContent(storeUserInfoOverview.email != "") }}
        </div> -->
      </div>
      <div class="flex items-center text-sm md:text-base">
        <div class="font-bold hidden sm:w-[5.5rem] md:w-[10rem] sm:block">
          출금계좌
        </div>
        <div class="flex-1 md:w-[25rem] flex items-center">
          <div
            class="bg-everly-main rounded-lg text-everly-white text-xs md:text-sm p-0.5 px-1 mr-2"
            v-if="storeUserInfoOverview.bankAccount != ''"
          >
            {{ storeUserInfoOverview.bankName }}
          </div>
          <div class="md:flex">
            <div class="pr-2">
              {{ bankaccountContent(storeUserInfoOverview.bankAccount) }}
            </div>
            <span
              v-if="storeUserInfoOverview.bankAccount == ''"
              class="text-everly-dark_grey"
              >(본인계좌 등록만 가능)</span
            >
          </div>
          <img
            src="@/assets/icon/check_circle_blue.svg"
            alt=""
            class="w-4 ml-2"
            v-if="storeUserInfoOverview.bankAccount != ''"
          />
        </div>
        <div
          class="text-xs whitespace-nowrap text-everly-dark_grey rounded-lg border py-1 px-2 bg-everly-white md:px-5 cursor-pointer"
          @click="clickButton('putBankAccount', true)"
        >
          {{ buttonContent(storeUserInfoOverview.bankAccount != "") }}
        </div>
      </div>
    </div>
    <hr class="border-everly-light_grey my-4 md:my-8" />
    <div
      class="px-5 pt-1 block md:hidden text-everly-dark_grey font-bold"
      @click="logout()"
    >
      로그아웃
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useClipboard, useMediaQuery, useToggle } from "@vueuse/core";
import { useauthStore } from "@/store/modules/auth/authStore";
import { useRouter } from "vue-router";
import ModalMypage from "@/components/mypage/components/modalMypage.vue";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { storeToRefs } from "pinia";

const mypageStore = usemypageStore();
const { storeUserInfoOverview } = storeToRefs(mypageStore);

//OnMounted()
onMounted(() => {
  mypageStore.getUserInfoOverview();
});
onUnmounted(() => {
  mypageStore.resetUserInfoOverview();
});

const { copy } = useClipboard({});

const emailContent = (string: string) => {
  if (string == "") return `이메일 인증을 해주세요.`;
  else return `item1004@naver.com`;
};
const bankaccountContent = (string: string) => {
  if (string == "") return `출금계좌 인증을 해주세요.`;
  else return `120502-161-093136`;
};

const buttonContent = (status: boolean) => {
  if (status) return `수정`;
  else return `등록`;
};

const router = useRouter();
const authstore = useauthStore();
function logout() {
  router.push("/logout");
}

//버튼 누르는 동작
function clickButton(type: string, status: boolean) {
  //웹인경우
  if (minSize.value.value) setShowModal(status);
  //모바일인경우
  else {
    router.push("/mypage/user/info/putBankAccount");
  }
}

//사이즈 확인
const minSize = computed(() => {
  return useMediaQuery("(min-width: 640px)");
});
//화면이 작아지면 꺼지는 로직
watch(minSize.value, (minSize) => {
  if (!minSize) {
    //페이지가 모바일이되는 경우
    showModal.value = false;
  }
});

//모달 관리
const showModal = ref(false);
function setShowModal(status: boolean) {
  showModal.value = status;
}
</script>

<style scoped></style>
