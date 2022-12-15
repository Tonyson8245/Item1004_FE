<template>
  <div class="relative" @click="movePost()">
    <div class="p-3 md:p-5">
      <div>
        <!--카드 헤더 -->
        <div class="flex justify-between">
          <div class="flex space-x-2">
            <img
              src="@/assets/dummy/home/img/profile_img.png"
              alt=""
              class="w-11 h-11 rounded-lg"
            />
            <div class="flex flex-col justify-left items-start space-y-1">
              <div class="flex space-x-1 justify-center items-center text-sm">
                <span>{{ props.card?.nickname }}</span>
                <img
                  src="@/assets/icon/check_circle_blue.svg"
                  alt=""
                  class="w-4"
                />
              </div>
              <span class="text-everly-dark_grey text-xs">{{
                props.card?.uploadTime
              }}</span>
            </div>
          </div>
          <div
            class="bg-[#f2c576] absolute right-0 rounded-l-lg flex justify-between items-center space-x-2 p-1 w-[90px] h-9 px-2"
            v-if="props.card?.category == 'gamemoney'"
          >
            <div class="w-4 h-4 flex-none">
              <img src="@/assets/icon/gamemoney_main_web.svg" alt="" />
            </div>

            <span class="text-everly-white text-sm flex-grow text-center"
              >게임머니</span
            >
          </div>
          <div
            class="bg-[#93c2eb] absolute right-0 rounded-l-lg flex justify-between items-center space-x-2 p-1 w-[90px] h-9 px-2"
            v-if="props.card?.category == 'item'"
          >
            <div class="w-4 h-4 flex-none">
              <img src="@/assets/icon/item_main_web.svg" alt="" />
            </div>
            <span class="text-everly-white text-sm flex-grow text-center"
              >아이템</span
            >
          </div>
          <div
            class="bg-[#d89691] absolute right-0 rounded-l-lg flex justify-between items-center space-x-2 p-1 w-[90px] h-9 px-2"
            v-if="props.card?.category == 'character'"
          >
            <div class="w-4 h-4 flex-none">
              <img src="@/assets/icon/character_main_web.svg" alt="" />
            </div>
            <span class="text-everly-white text-sm flex-grow text-center"
              >캐릭터</span
            >
          </div>
          <div
            class="bg-[#c7c7c7] absolute right-0 rounded-l-lg flex justify-between items-center space-x-2 p-1 w-[90px] h-9 px-2"
            v-if="props.card?.category == 'etc'"
          >
            <div class="w-4 h-4 flex-none">
              <img src="@/assets/icon/etc_main_web.svg" alt="" />
            </div>

            <span class="text-everly-white text-sm flex-grow text-center"
              >기타</span
            >
          </div>
        </div>
        <!-- 바디 -->
        <div class="text-xs text-everly-dark_grey flex mt-4">
          <span>{{ props.card?.game }} > {{ props.card?.server }}</span>
        </div>
        <div class="text-xl font-bold">
          <span>{{ props.card?.title }}</span>
        </div>
        <div class="flex justify-start items-center space-x-1 hidden md:block">
          <span class="text-xs">최소구매수량</span>
          <span class="text-sm pr-3"
            >{{ props.card?.minQty }}{{ props.card?.unit }}</span
          >
          <span class="text-xs">최대구매수량</span>
          <span class="text-sm"
            >{{ props.card?.maxQty }}{{ props.card?.unit }}</span
          >
        </div>
        <div class="flex justify-between mt-3 md:mt-0">
          <div class="flex justify-start items-center mt-1 space-x-1 font-bold">
            <span class="text-base pr-2"
              >{{ props.card?.minQty }}{{ props.card?.unit }}당</span
            >
            <span class="text-xl">{{ props.card?.price }}원</span>
          </div>
          <div class="flex ustify-start items-center mt-1 space-x-1 text-xs">
            <img src="@/assets/icon/chat_mid-grey.svg" class="w-4 h-4" alt="" />
            <span class="pr-2">{{ props.card?.chatQty }}</span>
            <img src="@/assets/icon/like_main_web.svg" class="w-4 h-4" alt="" />
            <span>{{ props.card?.likeQty }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type Card from "@/domain/home/productCard.interface";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  card: {
    type: Object as () => Card,
  },
});

let postId = 1;
function movePost() {
  router.push("/post?=" + postId);
}
</script>

<style scoped></style>
