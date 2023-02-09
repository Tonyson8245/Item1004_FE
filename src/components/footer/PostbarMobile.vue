<template>
  <div class="text-center w-full fixed bottom-0 z-40 py-2 px-4 bg-everly-white">
    <div class="w-full flex space-x-2">
      <!-- TODO 1차 출시 주석 2023-01-25 20:30:12 -->
      <div
        class="w-1/6 flex justify-center items-center cursor-pointer"
        @click="alertMSG()"
      >
        <img src="@/assets/icon/like_mid-grey.svg" alt="" class="pr-1" />
        <div class="text-sm">{{ storeWishCount }}</div>
      </div>
      <div
        class="flex-1 flex py-3 rounded-lg justify-center items-center bg-everly-light_blue text-everly-dark_grey border text-sm sm:text-base cursor-pointer"
      >
        <div class="text-everly-main" @click="goChatPage">
          채팅하기
          <!-- ({{ storeChatCount }}) -->
        </div>
      </div>
      <div
        class="flex-1 flex py-3 rounded-lg justify-center items-center bg-everly-main text-sm sm:text-base cursor-pointer"
      >
        <div
          class="font-bold text-everly-white"
          @click="togglestoreShowManagePost()"
          v-if="storeUserIdx == storeUserInfo.idx"
        >
          글 관리
        </div>
        <div
          class="font-bold text-everly-white"
          @click="toggle()"
          v-else-if="!storeShowBuy"
        >
          구매하기
        </div>
        <div
          class="font-bold text-everly-white"
          v-else
          @click="
            toggle();
            goPaymentPage();
          "
        >
          바로 구매
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { alertMSG } from "@/common";
import { usePaymentStore } from "@/store/modules/home/paymentStore";
import { usePostStore } from "@/store/modules/home/postStore";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { useToggle } from "@vueuse/shared";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useChatStore } from "@/store/modules/chat/chatStore";
import type { user } from "@/domain/user/user.interface";

const chatStore = useChatStore();

const postStore = usePostStore();

const {
  storeShowManagePost,
  storeChatCount,
  storeWishCount,
  storePostIdx,
  storeShowBuy,
  storePostTitle,
  storeSaleUnit,
  storeUnitName,
  storePricePerUnit,

  storeGameName,
  storeServerName,
  storeCategory,
  storeUserIdx,
  storeqty,
} = storeToRefs(postStore);

const toggle = useToggle(storeShowBuy);

const togglestoreShowManagePost = useToggle(storeShowManagePost);

const paymentStore = usePaymentStore();
const mypageStore = usemypageStore();
const { storeUserInfo } = storeToRefs(mypageStore);

const router = useRouter();
const route = useRoute();

//payment page로 보내기
function goPaymentPage() {
  if (
    import.meta.env.MODE == "production" &&
    navigator.userAgent.indexOf("Mobi") > -1
  ) {
    alert("모바일 결제는 지원 예정입니다.");
    return;
  }
  var idx = storePostIdx.value;
  var title = storePostTitle.value;
  var unit = storeSaleUnit.value;
  var saleUnitName = storeUnitName.value;
  var pricePerUnit = storePricePerUnit.value;
  var orderQty = storeqty.value;

  var GameName = storeGameName.value;
  var ServerName = storeServerName.value;
  var Category = storeCategory.value;
  var saleUnit = storeSaleUnit.value;
  var SellerIdx = storeUserIdx.value;

  paymentStore.setPostData(
    idx,
    title,
    unit,
    saleUnit,
    saleUnitName,
    pricePerUnit,
    orderQty,
    GameName,
    ServerName,
    Category,
    SellerIdx
  );

  router.push("/payment");
}

// 채팅 페이지로 보내기
function goChatPage() {
  const localData = localStorage.getItem("user");
  if (localData != null) {
    const userData = JSON.parse(localData) as user;
    if (userData.idx === storeUserIdx.value) router.push("/chat");
    else {
      if (typeof route.query.postId === "string")
        chatStore.isRoomExist(route.query.postId);
    }
  }
}
</script>

<style scoped></style>
