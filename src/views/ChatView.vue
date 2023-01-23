<template>
  <div>
    <!-- 헤더 -->
    <headerComponentVue class="w-full z-10 top-0 sticky md:sticky" />

    <!-- <iframe
      src="https://service.dongledongle.com/everly"
      frameborder="0"
      class="h-screen w-screen"
    /> -->

    <!-- <router-view /> -->

    <router-view/>

    <!-- <router-view v-if="!isMobile"/>
    <router-view v-else name="mobile"/> -->

    <div class="">
    
    </div>
    
  </div>

</template>

<script setup lang="ts">

import headerComponentVue from "../components/header/headerComponent.vue";
import { storeToRefs } from "pinia";
import { useChatStore } from "@/store/modules/chat/chatStore";
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";


const route = useRoute();

const chatStore = useChatStore();

// TalkPlus 초기화 실행 
const chatClient = chatStore.init();

const { client, channels, selectedChannel } = storeToRefs(chatStore);

// TalkPlus api 로그인
const login = async () => await chatStore.login()

// 채널(=채팅방) 목록 불러오기
const getChannels = async () => await chatStore.getChannels(); 


// watch(route, ()=>{
//   console.log(route);  
// })
// 로그인을 한번 실행
login().then( async (data)=>{  
  // console.log(data); 
  
  // 전체 채팅방 목록 세팅
  getChannels()  
  // 선택된 채널 세팅
  setSelectedChannel(route.params.channelId);
  // 새로운 채팅 여부 세팅
  setNewChat();
  // 채팅화면 거래글 postId 세팅
  setPostId();

  client.value.on('event', async (data) => {
    if (data.type === 'message') {          
        // console.log("받은 데이터", data);
      await onReceiveMessage(data)
    }
  })  


  
});
console.log(route.query.postId);



// url 변경에 따른 선택된 채널 변경
watch(route, async()=> {
  console.log(route.path);

  // 선택된 채널 세팅
  setSelectedChannel(route.params.channelId)
  
  // route에서 new?postId 아니면 channel의 data에 저장되어 있을 것이다.
  setNewChat();
})

// 새로운 채팅 여부 파악
async function setNewChat() {
  // route.query.postId가 있다 == url = new?postId == 새 게시글
  if (route.query.postId) chatStore.setIsNewChat(true);
  else chatStore.setIsNewChat(false);
}

// 선택된 채널 세팅
async function setSelectedChannel(channelId:string | string[]) {    
  // url이 새로운 방 생성인 new?postId일 수 있음
  if (channelId!==undefined && !channelId) await  chatStore.getSelectedChannel(channelId)  
}


// 받은 메세지 처리기
async function onReceiveMessage(data:any) {
    let channel  = data.channel   
    if (data.message.channelId === selectedChannel.value?.id) {      
      const getChannel = await chatStore.messageRead(data.message.channelId);   
      channel = getChannel.channel
      chatStore.setMessages(data.message)
    }
    chatStore.setChannels(channel);
    chatStore.getUnreadCount()
}

onUnmounted(() => {
  chatStore.resetChannels()
  chatStore.resetMessages()
})



// const chatView = ref(false);
// const channelsView = ref(false);

// const isMobile = ref(false);



</script>

<style scoped>


</style>