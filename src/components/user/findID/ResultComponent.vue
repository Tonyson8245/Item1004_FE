<template>
  <div class="h-screen flex">
    <div class="grid place-items-center w-full m-auto">
      <div class="">
        <img class="w-10" src="@/assets/icon/check_circle_green.svg" alt="" />
      </div>
      <div
        class="text-left mt-11 w-full px-6 text-center font-bold text-lg md:text-[28px]"
      >
        <div>고객님의 아이디는</div>
        <div>
          <span class="text-everly-main">{{ storeuserID }}</span> 입니다
        </div>
      </div>
      <div class="grid gap-0 place-items-center w-11/12 mt-12">
        <div class="grid gap-2 place-items-center w-full">
          <button
            class="h-11 lg:h-15 px-8 py-2 rounded-lg text-sm text-everly-white bg-everly-main w-11/12"
            @click="moveLink('login')"
          >
            로그인하기
          </button>
        </div>
        <div class="grid gap-2 place-items-center w-full mt-2">
          <button
            class="h-11 lg:h-15 px-8 py-2 rounded-lg text-sm bg-everly-light_blue text-everly-main w-11/12"
            @click="moveLink('changepassword')"
          >
            비밀번호 재설정
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, onUnmounted } from "vue";
import { useauthStore } from "@/store/modules/auth/authStore";
import { storeToRefs } from "pinia";

const authStore = useauthStore();
const { storeauthId, storeuserID } = storeToRefs(authStore);
const router = useRouter();
var link: string;

function moveLink(type: string) {
  switch (type) {
    case "login":
      link = "/account/login";
      break;
    case "changepassword":
      link = "/account/changepassword/confirm";
      break;
  }
  router.push(link);
}

onMounted(() => {
  if (storeauthId.value == "") {
    alert(`만료된 페이지입니다.`);
    router.go(-1);
  } else {
    authStore.getUserId(storeauthId.value).then((res) => {
      if (!res) {
        alert(`만료된 페이지입니다.`);
        router.go(-1);
      }
    });
  }
});

onUnmounted(() => {
  //authid 초기화
  authStore.setstoreauthId("");
});
</script>

<style scoped></style>
