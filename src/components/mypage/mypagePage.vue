<template>
  <div class="pt-[3rem]">
    <div class="flex">
      <div class="flex-grow"></div>
      <div class="flex-grow-0 w-full md:w-[73.750rem] flex">
        <div
          class="hidden md:block w-[11.875rem] text-everly-dark_grey space-y-10 cursor-default py-16"
        >
          <div class="space-y-2">
            <div
              class="text-everly-main font-bold text-xl flex cursor-pointer"
              @click="router.push(`/mypage`)"
            >
              <img src="@/assets/icon/mypage_blue.svg" alt="" class="pr-2" />
              내 프로필
            </div>
          </div>
          <div class="space-y-2">
            <div class="text-everly-main font-bold text-xl flex">
              <img src="@/assets/icon/pig_blue.svg" alt="" class="pr-2" />
              마일리지
            </div>
            <div
              @click="router.push('/mypage/mileage/overview')"
              class="cursor-pointer"
            >
              마일리지 현황
            </div>
            <div
              @click="router.push('/mypage/mileage/charge')"
              class="cursor-pointer"
            >
              마일리지 충전
            </div>
            <div>마일리지 인출</div>
          </div>
          <div class="space-y-2">
            <div class="text-everly-main font-bold text-xl flex">
              <img
                src="@/assets/icon/recipt_blue.svg"
                alt=""
                class="pr-2"
              />판매/구매내역
            </div>
            <div>판매내역</div>
            <div>구매내역</div>
            <div>찜한 목록 보기</div>
          </div>
          <div class="space-y-2">
            <div class="text-everly-main font-bold text-xl flex">
              <img
                src="@/assets/icon/smile_blue.svg"
                alt=""
                class="pr-2"
              />회원정보
            </div>
            <div
              @click="router.push('/mypage/user/info')"
              class="cursor-pointer"
            >
              회원정보 수정
            </div>
            <div>쿠폰내역</div>
            <div @click="logout()">로그아웃</div>
          </div>
        </div>
        <div class="w-full md:py-16 md:w-[61.88rem] md:bg-[#fafafa]">
          <router-view></router-view>
        </div>
      </div>
      <div class="flex-grow md:bg-[#fafafa]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  router.push("/logout");
}
</script>

<style scoped></style>
