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
const channelId = route.params.channelId;

const chatStore = useChatStore();

// TalkPlus 초기화 실행 
const chatClient = chatStore.init();

const { client, channels } = storeToRefs(chatStore);

// TalkPlus api 로그인
const login = async () => await chatStore.login()

// 채널(=채팅방) 목록 불러오기
const getChannels = async () => await chatStore.getChannels(); 


// 로그인을 한번 실행
login().then((data)=>{
  getChannels();
  
  // 뷰에서 inChat에서 사용될 채팅 내용들을 여기서 로드
  if (channelId) {
    chatStore.getSelectedChannel(channelId)
  }

  client.value.on('event', (data) => {
      if (data.type === 'message') {
          
          console.log("받은 데이터", data);
          chatStore.setChannels(data.channel);
          chatStore.getUnreadCount()
          chatStore.setMessages(data.message)
      }
  })  
});




onUnmounted(() => {
  chatStore.resetChannels()
})



// const chatView = ref(false);
// const channelsView = ref(false);

// const isMobile = ref(false);



</script>

<style scoped>


</style>
