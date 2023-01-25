<template>
  <div class="pt-[3rem]">
    <div class="flex">
      <div class="flex-grow"></div>
      <div class="flex-grow-0 w-full md:w-[73.750rem] flex">
        <div
          class="hidden md:block w-[11.875rem] text-everly-dark_grey space-y-10 cursor-default py-16"
        >
          <!-- TODO 1차 출시 주석 2023-01-25 21:43:59 -->
          <!-- <div class="space-y-2">
            <div
              class="text-everly-main font-bold text-xl flex cursor-pointer"
              @click="router.push(`/mypage`)"
            >
              <img src="@/assets/icon/mypage_blue.svg" alt="" class="pr-2" />
              내 프로필
            </div>
          </div> -->
          <div class="space-y-2">
            <div class="text-everly-main font-bold text-xl flex">
              <img src="@/assets/icon/pig_blue.svg" alt="" class="pr-2" />
              마일리지
            </div>
            <div
              @click="router.push('/mypage/mileage/charge')"
              class="cursor-pointer"
            >
              충전하기
            </div>
            <div
              @click="router.push('/mypage/mileage/withdraw')"
              class="cursor-pointer"
            >
              출금하기
            </div>
            <div
              @click="router.push('/mypage/mileage/overview')"
              class="cursor-pointer"
            >
              마일리지 현황
            </div>
            <!-- TODO 1차 출시 주석 2023-01-25 21:46:41 -->
            <!-- <div>마일리지 내역</div> -->
          </div>
          <div class="space-y-2">
            <div class="text-everly-main font-bold text-xl flex">
              <img
                src="@/assets/icon/recipt_blue.svg"
                alt=""
                class="pr-2"
              />판매/구매내역
            </div>
            <div @click="router.push('/mypage/contractList/sell')">
              판매내역
            </div>
            <div @click="router.push('/mypage/contractList/buy')">구매내역</div>
            <!-- TODO 1차 출시 주석 2023-01-25 21:43:07 -->
            <!-- <div v-show="false">취소내역</div> -->
          </div>
          <!-- TODO 1차 출시 주석 2023-01-25 21:43:20 -->
          <!-- <div class="space-y-2">
            <div class="text-everly-main font-bold text-xl flex">
              <img
                src="@/assets/icon/store_blue.svg"
                alt=""
                class="pr-2"
              />거래글
            </div>
            <div>판매글</div>
            <div>구매글</div>
            <div>찜한목록</div>
          </div> -->
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
            <!-- TODO 1차 출시 주석 2023-01-25 21:43:32 -->
            <!-- <div>쿠폰내역</div> -->
            <div @click="logout()" class="cursor-pointer">로그아웃</div>
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
import { useauthStore } from "@/store/modules/auth/authStore";
import { useRouter } from "vue-router";

const router = useRouter();
const authstore = useauthStore();
function logout() {
  authstore.deleteToken();
  router.push("/logout");
}
</script>

<style scoped></style>
