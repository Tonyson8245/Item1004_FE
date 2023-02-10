<template>
  <div
    class="border-everly-mid_grey border rounded-lg h-36 md:h-40 md:w-[22.5rem] p-3 md:p-2 space-y-1 md:space-y-2 shadow-lg md:shadow-none"
  >
    <div class="flex space-x-2 items-center">
      <div class="text-everly-white">
        <div
          v-if="props.card?.post.type == 'sell'"
          class="bg-everly-main py-0.5 px-1.5 rounded-lg text-xs"
        >
          살래요
        </div>
        <div v-else class="bg-everly-main py-0.5 px-1.5 rounded-lg text-xs">
          팔래요
        </div>
      </div>
      <div class="flex text-sm">
        <div>게임명</div>
        >
        <div>서버명</div>
      </div>
    </div>
    <div class="items-center space-x-1.5 hidden md:flex">
      <div class="rounded-lg overflow-hidden">
        <img src="@/assets/img/profile_skyblue.png" alt="" class="w-7" />
      </div>
      <span class="text-sm"> 열글자닉네임뭐가있지 </span>
      <img src="@/assets/icon/check_circle_blue.svg" alt="" class="w-4" />
    </div>
    <div class="font-bold ellipsis">
      엄청 짱짱 싼 게임머니 팝니다.채팅 바로 답하니까 연락주세요 엄청 짱짱 싼 로
      답하니까 연 엄청 짱짱 싼 게임머니 팝니다. 채팅 바로 답하니까 연
    </div>
    <div class="flex justify-between text-xs md:text-sm">
      <div>1억 게임머니당</div>
      <div class="font-bold">10,000원</div>
    </div>
    <div class="flex items-center space-x-1.5 md:hidden">
      <div class="rounded-lg overflow-hidden">
        <img src="@/assets/img/profile_green.jpeg" alt="" class="w-5" />
      </div>
      <span class="text-xs"> 열글자닉네임뭐가있지 </span>
      <img src="@/assets/icon/check_circle_blue.svg" alt="" class="w-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GamePostSummaryDto } from "@/domain/home/posts/GamePostSummaryDto";

const props = defineProps({
  card: {
    type: Object as () => GamePostSummaryDto,
  },
});
</script>

<style scoped>
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
