<template>
  <div class="h-screen md:flex">
    <div
      class="place-items-center md:w-full h-full flex flex-col justify-between md:h-auto"
    >
      <div class="hidden md:block">
        <img class="w-36" src="@/assets/icon/logo_mobile.svg" alt="" />
      </div>

      <div
        class="grid gap-2 place-items-center w-full px-2 mt-2 pt-1 flex-none"
      >
        <div
          class="text-left p-1 px-2 mt-16 md:mt-5 w-full md:font-bold text-everly-main text-sm md:text-lg text-left"
        >
          계정정보
        </div>
        <div class="flex items-center w-full relative">
          <input
            placeholder="아이디"
            class="flex-1 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm"
            v-model.trim="userId"
            @click="duplicationCheckShowtoogle(false)"
            @blur="
              checkUserid(userId);
              duplicationCheckShowtoogle(true);
            "
            @keypress="isNotSpace"
            @input="(event: Event) => {
    checkRegexUserId((event.target as HTMLInputElement).value);
            }"
          />
          <img
            v-if="
              userId != '' &&
              storesameUserIdisExist != '' &&
              duplicationCheckShow
            "
            :src="`/assets/icon/${duplicationCheckImg}.svg`"
            class="w-5 h-5 absolute right-5"
            alt=""
          />
        </div>
        <div class="w-full pl-2 text-xs md:text-sm">
          <span v-if="storesameUserIdisExist == `Exist`" class="text-everly-red"
            >* 이미 존재하는 아이디입니다.</span
          >
          <span :class="regexUserIdClass" class="text-everly-dark_grey" v-else
            >* 영문, 숫자만 사용 가능합니다(5 ~ 15자)</span
          >
        </div>
        <div class="flex items-center w-full relative">
          <input
            placeholder="비밀번호"
            :type="typepasswordInput"
            class="flex-1 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm pr-10"
            @keypress="isNotSpace"
            @input="(event: Event) => {
  checkRegexPassword((event.target as HTMLInputElement).value);
            }"
            autoComplete="off"
          />
          <img
            :src="`/assets/icon/${passwordInputImg}.svg`"
            class="w-5 h-5 absolute right-5"
            @click="changeType('password')"
            alt=""
          />
        </div>
        <div class="flex items-center w-full relative">
          <input
            placeholder="비밀번호 확인"
            :type="typepasswordCheckInput"
            class="flex-1 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm pr-10"
            @keypress="isNotSpace"
            @input="(event: Event) => {
  checkPassword((event.target as HTMLInputElement).value);
            }"
            autoComplete="off"
          />
          <img
            :src="`/assets/icon/${passwordCheckInputImg}.svg`"
            class="w-5 h-5 absolute right-5"
            @click="changeType('passwordCheck')"
            alt=""
          />
        </div>
        <div class="w-full pl-2 text-xs md:text-sm">
          <span
            class="text-everly-red"
            v-if="!checkPasswordShow && passwordCheck != ''"
            >* 비밀번호가 일치하지 않습니다.</span
          >
          <span :class="regexPasswordClass" class="text-everly-dark_grey" v-else
            >*비밀번호 영문,숫자,특수문자 조합으로 8자리 이상입니다.</span
          >
        </div>
      </div>

      <div class="grid gap-1 place-items-center mt-1 w-full p-2 flex-none">
        <div class="text-left md:mt-2 w-full px-2">
          <span class="md:font-bold text-everly-main text-sm md:text-lg"
            >추천인</span
          >
        </div>
        <div class="pr-0 flex items-center w-full">
          <input
            placeholder="추천인 유저 코드"
            class="mr-1 rounded-lg border border-everly-mid_grey bg-white py-3 px-4 text-[#6B7280] outline-none focus:border-everly-dark focus:shadow-md text-xs md:text-sm w-4/5"
            v-model="recommendidx"
            @keypress="isNotSpace"
            @input="resetPublicidx()"
          />
          <button
            class="bg-everly-main text-white rounded-lg shadow-md text-xs md:text-sm py-3 w-1/5"
            @click="checkPublicidx(recommendidx)"
          >
            확인
          </button>
        </div>
        <div class="w-full pl-2 text-xs md:text-sm">
          <span class="text-everly-red" v-if="storeuserCodeisExist == 'noExist'"
            >* 올바르지 않은 코드입니다.</span
          >
          <span
            class="text-everly-dark_grey"
            v-else-if="storeuserCodeisExist == 'Exist'"
            >* 유저 코드가 확인되었습니다.</span
          >
          <span class="text-everly-dark_grey" v-else
            >* 유저 코드를 입력해주세요.</span
          >
        </div>
      </div>

      <div class="w-full py-0 p-2 flex-none">
        <div
          class="text-everly-dark_grey mt-2 md:mt-5 border px-3 py-2 rounded-lg border-everly-mid_grey cursor-pointer"
          @click="clickagreeAll()"
        >
          <div class="flex items-center w-full">
            <img
              :src="`/assets/icon/${agreeAllCheckImg}.svg`"
              alt=""
              class="pr-2 w-6 h-6"
            />
            <div class="text-xs flex-1">전체 동의</div>
          </div>
        </div>
        <div class="text-everly-dark_grey pt-0">
          <div class="px-4 py-1">
            <contractVue
              v-for="contract in storevalidServiceTerm"
              key="contract"
              class="py-1"
              :data="contract"
              :arr="mandatoryArray"
              :noarr="notmandatoryArray"
              @check="pushtoTermsArray($event)"
            />
          </div>
        </div>
      </div>

      <div class="flex-grow"></div>
      <div
        class="flex-none grid gap-2 place-items-center h-24 md:mb-5 w-full md:static"
      >
        <button
          class="h-11 lg:h-15 px-6 py-2 rounded-lg text-sm text-everly-white w-11/12 cursor-pointer bg-everly-main"
          v-if="signUpShow"
          @click="signUp"
        >
          가입하기
        </button>
        <button
          class="h-11 lg:h-15 px-6 py-2 rounded-lg text-sm text-everly-white w-11/12 cursor-not-allowed bg-everly-mid_grey"
          v-else
        >
          가입하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import contractVue from "./common/contract.vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { isNumber, IsNumber, isString } from "class-validator";
import { useauthStore } from "@/store/modules/auth/authStore";

const authStore = useauthStore();
const route = useRoute();
const router = useRouter();
const { storesameUserIdisExist, storeuserCodeisExist, storevalidServiceTerm } =
  storeToRefs(authStore);

//space 제거
function isNotSpace(evt: any) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode == 32) {
    evt.preventDefault();
  } else {
    return true;
  }
}

//약관
//약관 가져오기
onMounted(() => {
  authStore.getServiceTerms();
});
//필수 약관 갯수
const mandatoryTotalQty = ref(0);
const notmandatoryTotalQty = ref(0);
const mandatoryArray = ref([] as number[]);
const notmandatoryArray = ref([] as number[]);
const agreeAll = ref(false);

const agreeAllCheckImg = computed(() => {
  if (agreeAll.value) return "check_circle_blue_full";
  else return "check_circle";
});

//필수 약관 갯수 파악하는 코드
watch(storevalidServiceTerm, () => {
  mandatoryTotalQty.value = storevalidServiceTerm.value.filter(
    (item) => item.mandatory === true
  ).length;
  notmandatoryTotalQty.value = storevalidServiceTerm.value.filter(
    (item) => item.mandatory === false
  ).length;
});
//각 약관에서 체크 활성화/비활성화
function pushtoTermsArray(event: Event) {
  let type = event.type;
  //  @ts-ignore
  let idx = event.idx;

  //필수,선택에 따라서 다른 배열 방에 약관 idx를 넣음
  if (type) {
    if (mandatoryArray.value.indexOf(idx) == -1) {
      mandatoryArray.value.push(idx);
    } else {
      const id = mandatoryArray.value.indexOf(idx);
      if (id > -1) mandatoryArray.value.splice(id, 1);
    }
  } else {
    if (notmandatoryArray.value.indexOf(idx) == -1)
      notmandatoryArray.value.push(idx);
    else {
      const id = notmandatoryArray.value.indexOf(idx);
      if (id > -1) notmandatoryArray.value.splice(id, 1);
    }
  }

  if (
    mandatoryArray.value.length >= mandatoryTotalQty.value &&
    notmandatoryArray.value.length >= notmandatoryTotalQty.value
  )
    agreeAll.value = true;
  else agreeAll.value = false;

  console.log(mandatoryArray.value);
}
//전체 동의
function clickagreeAll() {
  //필수 약관의 idx 모음
  let manArr = storevalidServiceTerm.value.filter(
    (item) => item.mandatory === true
  );
  let manidxArr = manArr.map((row) => row.idx);
  //선택 약관의 idx 모음
  let notmanArr = storevalidServiceTerm.value.filter(
    (item) => item.mandatory === false
  );
  let notmanidxArr = notmanArr.map((row) => row.idx);

  console.log(`클릭`);

  //초기화
  mandatoryArray.value.splice(0, mandatoryArray.value.length);
  notmandatoryArray.value.splice(0, notmandatoryArray.value.length);

  //전체실행
  if (!agreeAll.value) {
    agreeAll.value = true;
    mandatoryArray.value.push(...manidxArr);
    notmandatoryArray.value.push(...notmanidxArr);
  } else {
    agreeAll.value = false;
  }
}

//아이디
const userId = ref("");
const tempuserId = ref("");
//아이디 정규식 상태에 따른 폰트색
const regexUserIdClass = ref("");
//아이디 중복 확인
const checkUserid = (id: string) => {
  if (id.length > 0) authStore.checkUserid(id);
};
//아이디 정규식에 따른 폰트색 변경
const checkRegexUserId = (id: string) => {
  authStore.resetstoresameUserIdisExist();
  if (isId(id)) {
    regexUserIdClass.value = "text-everly-dark_grey";
    tempuserId.value = userId.value;
  } else {
    regexUserIdClass.value = "text-everly-red";
  }
  userId.value = id;
};
// 아이디 중복 체크
const duplicationCheckShow = ref(false);
const duplicationCheckShowtoogle = (show: boolean) => {
  duplicationCheckShow.value = show;
};
const duplicationCheckImg = computed(() => {
  if(regexUserIdClass.value === "text-everly-red") return "warning_red"  
  if (storesameUserIdisExist.value == `noExist`) {
    tempuserId.value = userId.value;
    return "check_circle_green_full";
  }   
  else return "warning_red";
});

//비밀번호
const password = ref("");
const regexPasswordClass = ref("");
const checkPasswordShow = ref(true);
const passwordCheck = ref("");
const checkRegexPassword = (str: string) => {
  if (isPassword(str)) {
    regexPasswordClass.value = "text-everly-dark_grey";
  } else {
    regexPasswordClass.value = "text-everly-red";
  }
  //비밀번호 확인 공백이 아니고, 둘값이 다들때 오류를 띄움
  console.log(
    (password.value != passwordCheck.value) + " " + (passwordCheck.value != "")
  );

  if (password.value != passwordCheck.value) checkPasswordShow.value = true;
  else checkPasswordShow.value = false;
  password.value = str;
};
const checkPassword = (str: string) => {
  if (password.value == str) checkPasswordShow.value = true;
  else checkPasswordShow.value = false;
  passwordCheck.value = str;
};

//비밀 번호 숨기기
const typepasswordInput = ref("password");
const typepasswordCheckInput = ref("password");
const passwordInputImg = ref("eyes_close");
const passwordCheckInputImg = ref("eyes_close");
function changeType(content: string) {
  if (content == "password") {
    if (typepasswordInput.value == "password") {
      typepasswordInput.value = "";
      passwordInputImg.value = "eyes_open";
    } else {
      typepasswordInput.value = "password";
      passwordInputImg.value = "eyes_close";
    }
  } else {
    if (typepasswordCheckInput.value == "password") {
      typepasswordCheckInput.value = "";
      passwordCheckInputImg.value = "eyes_open";
    } else {
      typepasswordCheckInput.value = "password";
      passwordCheckInputImg.value = "eyes_close";
    }
  }
}

//추천인 확인
const recommendidx = ref("");
function resetPublicidx() {
  authStore.resetstoreuserCodeisExist();
}
function checkPublicidx(userCode: string) {
  if (userCode.length > 0) authStore.checkPublicidx(userCode);
}

//가입하기 버튼 관측
const signUpShow = ref(false);
watch(
  [
    storesameUserIdisExist,
    userId,
    password,
    passwordCheck,
    recommendidx,
    storeuserCodeisExist,
    mandatoryArray,    
  ],
  () => {
    let idduplicationCheck = storesameUserIdisExist.value == "noExist";
    let idregexCheck = isId(userId.value);
    let passwordregexCheck = isPassword(password.value);
    let passwordDoubleCheck = password.value == passwordCheck.value;
    let recommend = recommendidx.value;
    let recommendCheck =
      (storeuserCodeisExist.value == "Exist" && recommend != "") ||
      (storeuserCodeisExist.value == "" && recommend == "");
    let termAllIdxs = mandatoryArray.value.concat(...notmandatoryArray.value);
    let mandatoryCheck = mandatoryArray.value.length == mandatoryTotalQty.value;

    if (
      idduplicationCheck &&
      tempuserId.value == userId.value &&
      idregexCheck &&
      passwordregexCheck &&
      passwordDoubleCheck &&
      mandatoryCheck &&
      recommendCheck
    ) {
      console.log(`가능`);
      signUpShow.value = true;
    } else signUpShow.value = false;    
  },
  { deep: true }
);

//가입하기 버튼 동작
function signUp() {
  let recommend = recommendidx.value;
  let termAllIdxs = mandatoryArray.value.concat(...notmandatoryArray.value);
  let authId = route.query.authId as string;
  authStore
    .signUp(tempuserId.value, password.value, termAllIdxs, recommend, authId)
    .then((res) => {
      if (res) {
        alert("회원가입이 성공되었습니다.");
        router.push("/account/login");
      } else router.push("/account/confirm");
    });
  // console.log("회원가입 실행");
}

//authId 유효성 체크
onMounted(() => {
  const route = useRoute();
  const router = useRouter();

  const authId = route.query.authId;

  if (authId == "" || authId == undefined) {
    alert(`잘못된 접근입니다.`);
    router.go(-1);
  } else {
    // 인증아이디를 보냈지만 유효하지 않을 경우는 뒤로 보냄
    if (isString(authId))
      authStore.checkAuthid(authId).then((res) => {
        if (!res) {
          alert(`잘못된 접근입니다.`);
          router.go(-1);
        }
      });
  }
});

//정규식
function isId(asValue: string) {
  var regExp = /^[a-z]+[a-z0-9]{5,15}$/g;
  return regExp.test(asValue);
}
function isPassword(asValue: string) {
  var regExp =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/;

  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
</script>

<style scoped></style>
