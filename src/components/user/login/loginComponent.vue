<template>
  <div class="h-screen flex">
    <modalSmall
      :propsShowModal="storeloginshowModal"
      :propsButtonText="`확인`"
      :propsContentText="`아이디,비밀번호를 확인해주세요.`"
      :propsLink="``"
      @update:propsShowModal="toggle()"
    />
    <div class="grid place-items-center w-full m-auto">
      <div class="">
        <img src="@/assets/icon/logo_mobile.svg" alt="" />
      </div>

      <div class="grid gap-2 place-items-center w-full mt-8 md:mt-16">
        <input
          placeholder="아이디를 입력하세요"
          class="h-11 lg:h-15 w-11/12 rounded-lg border border-everly-mid_grey bg-white py-3 px-5 text-base text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md"
          v-model="id"
        />
        <div class="w-11/12 h-11 lg:h-15 flex items-center relative">
          <input
            placeholder="비빌번호를 입력하세요"
            :type="passwordType"
            class="w-full rounded-lg border border-everly-mid_grey bg-white py-3 px-5 text-base text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md"
            v-model="password"
            @keyup.enter="clickLoginButton(id, password)"
          />
          <div @click="togglepasswordType" class="w-5 h-5 absolute right-5">
            <img
              v-if="passwordType == `password`"
              src="@/assets/icon/eyes_close.svg"
              alt=""
            />
            <img
              v-else
              src="@/assets/icon/eyes_open.svg"
              alt=""
              class="pt-[0.1rem]"
            />
          </div>
        </div>
      </div>

      <div class="grid gap-2 place-items-center w-full mt-4 md:mt-8">
        <button
          class="h-11 lg:h-15 px-6 py-2 rounded-lg text-lg text-everly-white bg-everly-main w-11/12"
          @click="clickLoginButton(id, password)"
        >
          로그인
        </button>
        <div class="grid place-items-center w-full mt-2 px-0 cursor-default">
          <div class="flex divide-x divide-[#707070]">
            <div class="text-center px-2 text-everly-dark_grey">
              <button class="text-sm" @click="moveLink('findid')">
                아이디 찾기
              </button>
            </div>
            <div class="text-center px-2 text-everly-dark_grey">
              <button class="text-sm" @click="moveLink('changepassword')">
                비밀번호 재설정
              </button>
            </div>
            <div class="text-center px-2 text-everly-dark_grey">
              <button class="text-sm" @click="moveLink('signUp')">
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full mt-5 mb-1 md:mt-12">
        <div class="inline-flex justify-center items-center w-full">
          <hr class="md:invisible w-11/12 h-px bg-everly-mid_grey border-0" />
          <span
            class="invisible md:visible absolute left-1/2 px-3 text-sm text-everly-dark_grey -translate-x-1/2 bg-white md:bg-[#fafafa]"
            >SNS 계정으로 간편하게 진행하기</span
          >
          <span
            class="absolute left-1/2 px-3 text-sm text-everly-dark_grey -translate-x-1/2 md:invisible bg-white md:bg-[#fafafa]"
            >간편하게 진행하기</span
          >
        </div>
      </div>

      <div
        class="grid grid-cols-4 gap-3 w-full px-10 text-center text-xs md:text-sm md:px-30"
      >
        <div>
          <img
            class="object-none object-center w-full"
            src="@/assets/icon/login_naver.svg"
          />
        </div>
        <div>
          <img
            src="@/assets/icon/login_kakao.svg"
            alt=""
            class="object-none object-center w-full"
          />
        </div>
        <div>
          <img
            src="@/assets/icon/login_google.svg"
            alt=""
            class="object-none object-center w-full"
          />
        </div>
        <div>
          <img
            src="@/assets/icon/login_apple.svg"
            alt=""
            class="object-none object-center w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import modalSmall from "@/components/modal/modalSmall.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useauthStore } from "@/store/modules/user/authStore";

const router = useRouter();
const authStore = useauthStore();

let link: string;

function moveLink(type: string) {
  switch (type) {
    case "main":
      link = "/home";
      break;
    case "changepassword":
      link = "/account/changepassword/confirm";
      break;
    case "findid":
      link = "/account/findid/confirm";
      break;
    case "signUp":
      link = "/account/signUp/confirm";
      break;
  }
  router.push(link);
}

//로그인
const id = ref("");
const password = ref("");

function clickLoginButton(id: string, pw: string) {
  console.log(id + pw);
  authStore.getToken(id, pw);
}

//로그인 실패 모달
const { storeloginshowModal } = storeToRefs(authStore);
function toggle() {
  authStore.setstoreloginshowModal(!storeloginshowModal);
}

//passowrd Type
const passwordType = ref("password");
function togglepasswordType() {
  if (passwordType.value == `password`) passwordType.value = `text`;
  else passwordType.value = `password`;
}
</script>

<style scoped></style>
