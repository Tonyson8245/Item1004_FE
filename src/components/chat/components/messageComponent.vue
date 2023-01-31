<template>
  <div class="px-5 mt-3">
    <div class="w-full flex">
      <!-- 프로필 사진 -->
      <div class="rounded-lg overflow-hidden mr-3 min-w-[2.5rem]">
        <img
          src="@/assets/img/profile_mint.png"
          alt=""
          class="w-10 md:w-14 rounded-lg"
        />
      </div>
      <div class="flex flex-col">
        <p class="font-bold text-sm mb-1">{{ props.message.username }}</p>
        <div class="flex items-end">
          <p
            class="text-sm px-3 py-2 h-fit md:max-w-md rounded-r-lg rounded-bl-lg shadow-md bg-everly-white text-everly-dark_grey"
          >
            {{ props.message.text }}
          </p>
          <p class="ml-2 text-xs text-everly-dark_grey">
            {{ lastMessageTime() }}
          </p>
        </div>
      </div>

      <!-- 채팅 내용 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type message from "@/domain/chat/messagefuck.interface";

const props = defineProps<{ message: message }>();

const lastMessageTime = () => {
  return new Intl.DateTimeFormat("ko", { timeStyle: "short" }).format(
    new Date(props.message.createdAt)
  );
};
</script>

<style scoped></style>
