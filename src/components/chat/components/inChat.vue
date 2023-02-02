<template>
  <div class="pt-[3rem] md:pt-0 md:h-full">
    <div class="h-[calc(100vh-48px)] md:h-full">
      <div class="flex flex-col h-full">
        <postHead v-if="postItem" />
        <!-- bg-[url('@/assets/img/chat-background.svg')] -->
        <!-- bg-op-30-right-blue  -->
        <!-- @scroll="handleListScroll" -->
        <div
          id="scroll-view"
          ref="scrollView"
          class="py-1 h-full flex flex-col chat-bg bg-[url('@/assets/img/chat-background.svg')] bg-no-repeat bg-center bg-70% overflow-x-hidden overflow-scroll"
         
        >

          <div class="flex flex-col items-center border rounded-lg p-5 mx-8 my-4 bg-everly-light_blue ">
            <p class=" text-everly-red font-bold">⚠ 잠깐! 채팅할 때 주의하세요 ⚠</p>
            <p>입금 전, 현재 거래하는 판매자에게 정확하게 입금하는지 확인하세요!</p>
            <p class="font-bold">중재 기간 동안 잘못 입금한 금액은 바로 반환되지 않습니다</p>
          </div>
          <!-- 채팅 내용 화면 영역 -->
          <div v-for="message in messages">
            
            
            <messageComponent
              v-if="message.userId !== client.channel.userId"
              :message="message"
            />
            <myMessageComponent v-else :message="message" />
          </div>
          <!-- v-if="messages.length===0 && !route.query.postId" -->
          <div
            class="w-full h-full bg-everly-wbg_grey flex flex-col justify-center"
            v-if="route.path === '/chat'"
          >
            <div class="flex flex-col items-center">
              <img
                src="/assets/icon/chat_mobile.svg"
                class="w-24 mb-3"
                alt=""
              />
              <p class="font-bold text-lg">아직 대화 내역이 없습니다</p>
              <p>채팅으로 더 빠르고 편리하게 거래를 해보세요</p>
            </div>
          </div>
        </div>

        <!-- 채팅 입력 영역 -->
        <div
          v-if="route.path !== '/chat'"
          class="mt-auto bg-white border-t rounded-t-lg flex items-center"
        >
          <div class="w-full flex justify-center">
            <textarea
              v-if="!postItem?.isDeleted"
              id="messageInputArea"
              v-model="text"
              @keypress.enter.shift.exact.prevent="text += '\n'"
              @keypress.enter.exact.prevent="sendMessageProcess"
              maxlength="8000"
              class="w-full py-1 px-3 text-sm text-everly-dark_grey outline-none resize-none"
              placeholder="내용을 입력하세요"
              rows="1"
            ></textarea>

            <textarea
              v-else
              disabled
              class="w-full py-1 px-3 text-sm text-everly-dark_grey opacity-50 outline-none resize-none"
              placeholder="삭제된 게시글입니다"
              rows="1"
            ></textarea>
          </div>
          <!-- :class="{'opacity-50 cursor-default': postItem?.isDeleted===true || postItem?.status==='end' }" -->
          <button
            :class="{
              'cursor-not-allowed bg-everly-dark_grey opacity-50':
                postItem?.isDeleted,
            }"
            @click="sendMessageProcess"
            class="text-white bg-everly-main rounded-r-lg w-20 py-3"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import postHead from "./postHead.vue";
import messageComponent from "./messageComponent.vue";
import myMessageComponent from "./myMessageComponent.vue";
import { useChatStore } from "@/store/modules/chat/chatStore";
import { storeToRefs } from "pinia";
import { ref, onUpdated, onMounted, toRefs, watch } from "vue";
import { useScroll } from "@vueuse/core";
import { useRouter, useRoute } from "vue-router";

const chatStore = useChatStore();
const {
  messages,
  client,
  isNewChat,
  channels,
  selectedChannel,
  messagesHasNext,
  postItem,
} = storeToRefs(chatStore);
const scrollView = ref<HTMLElement | null>(null);
const { x, y, arrivedState, isScrolling, directions } = useScroll(scrollView);
const { top, bottom } = toRefs(arrivedState);
const {  top: toTop, bottom: toBottom } = toRefs(directions)

const route = useRoute();
const router = useRouter();

// 스크롤 하단으로 이동 시켜야하는지 알 수 있는 플래그
// true: 내가 메세지 보냈을 때, 처음 로딩 했을 때, 내가 스크롤 바닥에 내렸을 때
// false: 내가 스크롤을 위로 올렸을 때
const isScrollBottom = ref(true);

const text = ref("");

async function sendMessageProcess(e: any) {
  if (text.value != "") {
    // console.log("isNewChat ? ",isNewChat.value);

    if (isNewChat.value) {
      // 새로운 챗이면 새로 방 만드는 API 쏘고 완료된 결과를 받아서 방 생성이 완성되면은 텍스트를 쏴주도록 합니다.
      const result = await chatStore.createNewRoom(String(route.query.postId));
      if (result) {
        // console.log("리절트 확인 : " ,result);
        await sendMessage(result);
        // 여기서 replace 해주면 chatview에서 라우터에 반응해서 방추가 자동으로 해준다
        router.replace("/chat/" + result);
      }
      // 방이 생성 되면은 방에 대한 정보를 api 요청해서 가지고 오고,
      // 방을 channels에 꽂아주고,
      // selectedChannel에 현재 방 꽂아주고,
      //메세지 보내고 메세지 보낸걸 messages에 꽂아주고,
      //lastMessage를 channels의 해당 channel에 꽂아주고,
    } else await sendMessage(selectedChannel.value?.id);
  }
}

async function sendMessage(channelId: string | undefined) {
  await chatStore.sendMessage(text.value, channelId as string);
  text.value = "";
  scrollToBottom();
}

onMounted(() => {
  // 메세지 송, 수신 시 작동 하기 위해 사용함
  // dom node에 변화가 감지되면 스크롤 하단 이동이 실행된다.
  // 감시자 인스턴스 만들기
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      if (isScrollBottom.value) scrollToBottom();
    });
  });
  // 감시자 설정
  const config = {
    childList: true,
  };
  // 감시 시작
  //@ts-ignore
  observer.observe(scrollView.value, config);
});


// 스크롤 상단으로 이동 하는지 감지
watch(isScrolling, async () => {
  isScrollBottom.value = false
  if (top.value) {
    // 불러올 메세지가 더 있으면 추가로 불러온다.
    // 페이징 성공 시 스크롤에 150 정도 여유를 준다
    if (await chatStore.pagingMessages(selectedChannel.value?.id as string)) {
      y.value += 150;       
    }
  }  

  if (bottom.value) {
    // 내가 자의로 스크롤 바닥에 내리면 true
    isScrollBottom.value = true
  }    
});

watch(messages, () => {
  // 메세지 추가 될 경우 스크롤 바텀으로
  if (isScrollBottom.value) {    
    scrollToBottom();
  }
});


const scrollToBottom = () => {
  y.value += 1000
};

</script>

<style scoped>
.chat-bg {
  background-color: rgba(233, 233, 253, 0.23);
}
</style>
