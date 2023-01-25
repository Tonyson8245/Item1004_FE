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
// const chatClient = 
const { client, channels, selectedChannel, isNewChat, postItem } = storeToRefs(chatStore);


const init = async () => await chatStore.init();

// TalkPlus api 로그인
const login = async () => await chatStore.login()

// 채널(=채팅방) 목록 불러오기
const getChannels = async () => await chatStore.getChannels(); 

init();

// watch(route, ()=>{
//   console.log(route);  
// })
// 로그인을 한번 실행
login().then( async (data)=>{  
  // console.log(data); 
  

  // 전체 채팅방 목록 세팅
  getChannels()  
  // 선택된 채널 세팅
  await setSelectedChannel();
  // 새로운 채팅 여부 세팅
  await setNewChat();
  // 채팅화면 거래글 postId 세팅
  await setPostItem();

  
  // console.log(client.value);


  client.value.on('event', async (data) => {
    // console.log("이벤트 발생", data);
    if (data.type === 'message') {
        //TODO: 현재 메세지 받는 이벤트가 이 페이지에 오면 여러개가 생성이 되서 문제 발생하고 있음.
      if(data.message.userId !== client.value.userId)   await onReceiveMessage(data)
    }
  })  
});
// console.log(route.query.postId);

// url 변경에 따른 채널&메세지, 새 채팅방 여부,관련판매글id 변경
watch(route, async()=> {  
  // 선택된 채널 세팅
  await setSelectedChannel()  
  // 새로운 채팅 여부 세팅
  await setNewChat();
  // 채팅화면 거래글 postId 세팅
  await setPostItem();

})

// 새로운 채팅 여부 파악
async function setNewChat() {
  // route.query.postId가 있다 == url = new?postId == 새 게시글
  if (route.query.postId) chatStore.setIsNewChat(true);
  else chatStore.setIsNewChat(false);  
}

// 채팅 관련 거래 게시글 
// function setPostId() {
//   if (route.query.postId) chatStore.setPostId(route.query.postId);
//   else chatStore.setPostId(selectedChannel.value?.data.postIdx);
// }

// 채팅 관련 거래 게시글 
async function setPostItem() {

  
  if (route.query.postId) await chatStore.setPostItem(route.query.postId);
  else if(selectedChannel.value?.data.postIdx === undefined && route.query.postId===undefined) return
  else await chatStore.setPostItem(selectedChannel.value?.data.postIdx);
}

// 선택된 채널 세팅
async function setSelectedChannel() {    
  // url이 새로운 방 생성인 new?postId일 수 있음
  if (!route.query.postId && route.params.channelId) await chatStore.getSelectedChannel(route.params.channelId)
}


// 받은 메세지 처리기
async function onReceiveMessage(data:any) {
  
    let channel = data.channel   
    // console.log("메세지 받음");

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
  chatStore.setClientNull()
  chatStore.resetPostItem()
  chatStore.resetSelectedChannel()
})

onMounted(() => {
  //  if(navigator.userAgent.toLowerCase().indexOf("iphone") > -1){
  //  }  
});

// const chatView = ref(false);
// const channelsView = ref(false);

// const isMobile = ref(false);



</script>

<style scoped>


</style>