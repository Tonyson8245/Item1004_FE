import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type resp from "@/domain/chat/resp.interface";
import type channel from "@/domain/chat/channel.interface";
import type message from "@/domain/chat/message.interface";

import type { user } from "@/domain/user/user.interface";
import { loadRouteLocation } from "vue-router";

export const useChatStore = defineStore("chatStore", ()=>  {
    
  const client = ref(Object)
  const user = ref(Object)
  const channels = ref<channel[] >([])
  const hasNext = ref(false);
  const unreadCount = ref(0);
  // 클릭하여 선택된 채팅방
  const selectedChannel = ref<channel>();
  // 메세지 담고 있는 변수
  const messages = ref<message[] >([]);

  const init = () => {
      // 앱 ID 추후에 숨겨야 한다.
      // TODO: client.value가 null이면 새로 생성한다.
    return client.value = new TalkPlus.Client({appId: 'bf5ae95e-5f1d-42af-90cf-c725c78db1e0'});
  }
  //원래는 여기서 사용자 로그인을 서버에서 톡플러스로 요청 해와야 합니데이~~~~   
  const login = async () => {
    if (!client.value.isLoggedIn()) {
      const localData = localStorage.getItem("user");
      const userData = JSON.parse(localData) as user;
            
      try {
          user.value = await client.value.loginAnonymous({
            userId: `${userData.idx}`, // unique userId
            // profileImageUrl: "https://archeage.nexon.com/characters/dbf279b5-20ff-4fba-8e6a-c1301fb97657/profileImage",
            // username: userData.nickname
            // loginToken: "$2a$06$Q4WYHQa16ChPTJTy2IWVNuQzxgEFAe2Up.SuikpS8WYMeqy.3Qk4S"
          });             
      } catch (error) {
        console.log("error : ", error);
      }          
      return user        
    }      
  }

  // 채팅방 목록 갱신
  const setChannels = (channel:channel) =>{ 
    // 리스트 안에 내가 받은 채널과 같은아이디 가지고 있는 채널이 있냐?
    const doGetChannel = channels.value.find(item => item.id === channel.id)
    // yes : 리스트 안에서 내가 받은 채널과 같은 아이디 가지고 잇는 채널 찾아서 지워라    
    if (doGetChannel) {
      channels.value.forEach((item, i, origin)=>{
        if (item === doGetChannel)  origin.splice(i,1)        
      })      
    }   
    // yes AND no : 리스트 제일 첫 번째에 내가 받은 채널 넣어라
    channels.value.unshift(channel)
  }


  const pagingChannels = async () =>{
    if (hasNext.value) {
      console.log("페이징 실행합니다");
      
      // getChannels()
      const lastChannelId:string = channels.value[channels.value.length-1].id;
      getChannels(lastChannelId);
    }
  }

  // 채팅방 목록 가지고 오기 && 페이징
  const getChannels = async (lastChannelId?: string) => {
    let result: resp;   
    const getchannelparams = {
      lastChannelId : lastChannelId,
      limit: 20
    }
    try {
      result = await client.value.getChannels(getchannelparams)
      // console.log("인터페이스 확인용", result);    
      channels.value.push(...result.channels);
      hasNext.value = result.hasNext;
      getUnreadCount();
    // console.log(result.channe);
    } catch (error) {
      console.log("error : ",error);        
    }      
  }

  const resetChannels = () =>{
    channels.value = [];
  }

  // 안 읽은 메세지 숫자 조회
  const getUnreadCount = async () =>{
    try {
      const result = await client.value.getUnreadCount();
      unreadCount.value = result.count      
    } catch (error) {
      console.log("error : ",error);
    }    
  }


  // 채팅방 클릭 시 작동
  const setSelectedChannel = (clickedChannel: channel) => {
    selectedChannel.value = clickedChannel;
    // console.log(selectedChannel.value);     
    getMessages(selectedChannel.value.id);
  }


  // 채팅방 id로 불러오기 
  const getSelectedChannel = async (channelId:string | string[]) =>{
    const result = await client.value.getChannel({
      channelId: channelId,
    });
    selectedChannel.value = result.channel;   
    await getMessages(result.channel.id);
  }

  // 메세지 불러오기
  const getMessages = async (channelId:string) => {
    let result: resp;   
    result = await client.value.getMessages({
              channelId: channelId,
              order: 'latest', // default: 'latest'. Use 'oldest' to order by oldest messages first
              
              limit: 20, // how many messages to fetch, default: 20, max: 50
          });
    messages.value = result.messages?.reverse()
    console.log(messages);
  }


  // 메세지 수신 시 작동
  const setMessages = (message: message) => {
    messages.value.push(message);
  }


  // 메세지 보내기
  const sendMessage = async (text: string) => {
    let result;
    try {
      result = await client.value.sendMessage({
          channelId: selectedChannel.value?.id, 
          type: 'text', 
          text: text
      });
      setMessages(result.message)
      console.log(result);
    } catch (error) {
      console.log(error);      
    } 
  }

  

  

   // 채팅 대상 검색
  //  const searchChannel = async (targetUser: string) =>{
  //   let result: resp;   
  //   // console.log("내 아이디",user.value.id);
  //   // console.log("찾을 유저",targetUser);    
  //   result = await client.value.searchChannels({      
  //     members: ['5Qxp8jLsrx'],
  //     limit: 10,
  //   });
  //   console.log(result);    
  // }

  return { client, init, login, getChannels, channels, setChannels, resetChannels, pagingChannels, unreadCount, getUnreadCount, selectedChannel, setSelectedChannel, getSelectedChannel, messages, setMessages,sendMessage }
});
