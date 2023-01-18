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
import { ref, computed, onMounted, createApp } from "vue";

const chatStore = useChatStore();

// TalkPlus 초기화 실행 
const chatClient = chatStore.init();

const { client, channels } = storeToRefs(chatStore);

// TalkPlus api 로그인
const login = async () => await chatStore.login()

// 채널(=채팅방) 목록 불러오기
const getChannels = async function () {
  const result = await chatStore.getChannels();
  // console.log(result);
  // console.log(channels);
}

// 로그인을 한번 실행
login().then((data)=>{
  getChannels();

  client.value.on('event', (data) => {
      if (data.type === 'message') {
          console.log("받은 데이터", data);
          chatStore.setChannels(data.channel);
          chatStore.getUnreadCount()
      }
  })

});


// const chatView = ref(false);
// const channelsView = ref(false);

// const isMobile = ref(false);



</script>

<style scoped>


</style>
