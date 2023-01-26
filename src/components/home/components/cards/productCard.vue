<template>
  <div class="relative cursor-pointer">
    <div
      v-if="props.card?.post.status == 'end'"
      class="absolute w-full h-full bg-white rounded-lg opacity-50 border cursor-not-allowed"
      style="z-index: 1"
    ></div>
    <div
      v-if="props.card?.post.status == 'end'"
      class="absolute w-full h-full backdrop-blur-[1.3px] rounded-lg border flex items-center justify-center cursor-not-allowed"
    >
      <div
        class="rounded-full border bg-white text-everly-mid_grey w-20 h-20 flex items-center justify-center font-bold border-2 md:text-lg"
      >
        판매<br />완료
      </div>
    </div>
    <div class="p-3 md:p-5 relative" @click="movePost()">
      <div>
        <!--카드 헤더 -->
        <div class="flex justify-between">
          <div class="flex space-x-2">
            <img
              :src="'/assets/img/' + props.card?.writer.image"
              alt=""
              class="w-11 h-11 rounded-lg"
            />
            <div class="flex flex-col justify-left items-start space-y-1">
              <div class="flex space-x-1 justify-center items-center text-sm">
                <span>{{ props.card?.writer.nickname }}</span>
                <img
                  v-if="props.card?.writer.isVerified"
                  src="@/assets/icon/check_circle_blue.svg"
                  alt=""
                  class="w-4"
                />
              </div>
              <span class="text-everly-dark_grey text-xs">{{
                commonFunction.timeForToday(createAt)
              }}</span>
            </div>
          </div>
          <div
            class="bg-[#f2c576] absolute right-0 rounded-l-lg flex justify-between items-center space-x-2 p-1 w-[90px] h-9 px-2"
            v-if="props.card?.post.productType == 'gameMoney'"
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
            v-if="props.card?.post.productType == 'item'"
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
            v-if="props.card?.post.productType == 'character'"
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
            v-if="props.card?.post.productType == 'etc'"
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
          <span
            >{{ props.card?.post.gameName }} >
            {{ props.card?.post.serverName }}</span
          >
        </div>
        <div
          class="text-base sm:text-xl font-bold overflow-ellipsis overflow-hidden whitespace-nowrap"
        >
          {{ props.card?.post.title }}
        </div>
        <div
          class="justify-start items-center space-x-1 hidden md:flex"
          v-if="props.card?.post.productType != 'character'"
        >
          <div class="text-xs">최소구매수량</div>
          <div class="text-sm pr-3">{{ minQty }} 개</div>
          <div class="text-xs">최대구매수량</div>
          <div class="text-sm">{{ maxQty }} 개</div>
        </div>
        <div class="justify-start items-center space-x-1 hidden md:flex" v-else>
          <div class="text-xs">직업</div>
          <div class="text-sm pr-3">
            {{ props.card.post.roleName }}
          </div>
          <div class="text-xs">레벨</div>
          <div class="text-sm">{{ props.card.post.level }} 개</div>
        </div>
        <div class="flex justify-between mt-3 md:mt-0 items-center">
          <div class="flex justify-start items-center mt-1 space-x-1 font-bold">
            <span class="text-xs sm:text-sm pr-2"
              >{{ saleUnit }} {{ currency }}당</span
            >
            <span class="text-sm sm:text-base"
              >{{ props.card?.post.pricePerUnit.toLocaleString() }}원</span
            >
          </div>
          <div class="flex ustify-start items-center mt-1 space-x-1 text-xs">
            <img src="@/assets/icon/chat_black.svg" class="w-4 h-4" alt="" />
            <span class="pr-2">{{ props.card?.post.chatCount }}</span>
            <img src="@/assets/icon/like_main_web.svg" class="w-4 h-4" alt="" />
            <span>{{ props.card?.post.wishCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { numberToKorean } from "@/common";
import commonFunction from "@/common";
import type { GamePostSummaryDto } from "@/domain/home/posts/GamePostSummaryDto";

const router = useRouter();

const props = defineProps({
  card: {
    type: Object as () => GamePostSummaryDto,
  },
});

const currency = computed(() => {
  if (props.card?.post.productType == "gameMoney") {
    return "게임머니";
  } else return "개";
});

const saleUnit = computed(() => {
  if (props.card?.post.saleUnit != null) {
    return numberToKorean(props.card.post.saleUnit);
  } else return 1;
});

const minQty = computed(() => {
  if (props.card?.post.minAmount != null) {
    return numberToKorean(props.card.post.minAmount);
  } else return 1;
});

const maxQty = computed(() => {
  if (props.card?.post.maxAmount != null) {
    return numberToKorean(props.card.post.maxAmount);
  } else return 1;
});

function movePost() {
  router.push("/post?postId=" + props.card?.post.idx);
}

function show(b: number) {
  var a = false;
  if (props.card?.post.idx != undefined) {
    if (props.card.post.idx % 3 == b) a = true;
    else a = false;
  }
  return a;
}

const createAt =
  props.card?.post.createAt != null ? props.card?.post.createAt : "";
</script>

<style scoped></style>
