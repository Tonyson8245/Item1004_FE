import axios from "axios";
import { defineStore,storeToRefs } from "pinia";
import { ref, computed, watch } from "vue";
import type resp from "@/domain/chat/resp.interface";
import type channel from "@/domain/chat/channel.interface";
import type message from "@/domain/chat/message.interface";
import type postResult from "@/domain/chat/postResult.interface";

import type { user } from "@/domain/user/user.interface";
import { loadRouteLocation } from "vue-router";
import * as chatapi from "@/api/chat-service/index";
import router from "@/router";


export const useChatStore = defineStore("chatStore", ()=>  {
    
  const client = ref(Object)
  const user = ref(Object)
  const channels = ref<channel[] >([])
  const hasNext = ref(false);
  const unreadCount = ref(0);
  // 클릭하여 선택된 채팅방
  const selectedChannel = ref<channel>();
  // 메세지 담고 있는 변수
  const messages = ref<message[]>([]);
  // 현재 새로운 게시물을 쓰는지 확인하기 위한 플래그
  const isNewChat = ref<boolean>(false);
  // 현재 채팅방에 관련된 postid
  const postId = ref<string | string[]>('');
  // 현재 채팅방에 관련된 postItem
  const postItem = ref<postResult>();

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
      
      let uerid = "5"
      if (userData) {
        uerid = `${userData.idx}`
      }      
      try {
          user.value = await client.value.loginAnonymous({
            // userId: `${userData.idx}`, // unique userId
            userId: uerid
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
  const setChannels = (channel:channel ) =>{ 
    // 리스트 안에 내가 받은 채널과 같은아이디 가지고 있는 채널이 있냐?
    // yes : 리스트 안에서 내가 받은 채널과 같은 아이디 가지고 잇는 채널 찾아서 지워라    
    const pickChannel = findChannel(channel.id)
    // console.log("채널 : ", pickChannel);    
    // console.log("채널 정보",pickChannel);
    if (pickChannel) {      
      // console.log("받은 채널 : ", channel);      
      channels.value.forEach((item, i, origin)=>{
        if (item === pickChannel)  origin.splice(i,1)        
      })      
    }   
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
      //@ts-ignore    
      result = await client.value.getChannels(getchannelparams)
      // console.log("인터페이스 확인용", result);
      channels.value.push(...result.channels);
      hasNext.value = result.hasNext;

    // console.log(result);
    } catch (error) {
      console.log("error : ",error);        
      return
    }      
    // 웹 에서는 채팅방 리스트와 메세지 리스트 두 곳에서 실행되기 때문에 한번만 실행되게 함
    if (isMobile()) getUnreadCount();
  }

  const resetChannels = () => {
    channels.value = [];
  }
  const resetMessages = () => {
    messages.value = [];
  }

  // 안 읽은 메세지 숫자 조회
  // 채팅방 메세지 읽었을 때, 메세지 보낼 때 , 메세지 받을 때
  // TODO: 채팅방 리스트가져오기 채팅 내용 가져오기 두곳에서 실행되고 있기 때문에 두 메서드 같이 한 페이지에서 실행되면 이 메서드는 두번 실행이 된다. 
  const getUnreadCount = async () => {
    // console.log('전체 메세지 카운팅');    
    try {
      const result = await client.value.getUnreadCount();
      unreadCount.value = result.count     
      return
    } catch (error) {
      console.log("error : ",error);
      return
    }            
  }

  // 채널 내 메세지 읽음 처리
  const messageRead = async (channelId:string) =>{
    // console.log("채널 메세지 읽음");   
    let result ; 
    try {
      result = await client.value.markAsRead({channelId: channelId}); 
      // console.log("읽은 채널 메세지 : ", result);     
    } catch (error) {
      console.log(error);
      return      
    }
    // 전체 안 읽은 메세지 카운팅
    return result
  }


  // 채팅방 클릭 시 작동
  // 내가 현재 보고 있는 채널을 세팅하고, 메세지를 읽어온다.
  const setSelectedChannel =  async (clickedChannel: channel) => {
    selectedChannel.value = clickedChannel;
    // console.log(selectedChannel.value);     
    await getMessages(selectedChannel.value.id);
    await getUnreadCount();
  }


  // 채팅방 id로 불러오기 
  const getSelectedChannel = async (channelId:string | string[]) =>{
    const result = await client.value.getChannel({
      channelId: channelId,
    });
    selectedChannel.value = result.channel;   
    await getMessages(result.channel.id);
    await getUnreadCount();
  }

  // 메세지 불러오기
  const getMessages = async (channelId:string) => {
    let result: resp;   
    try {
      result = await client.value.getMessages({
          channelId: channelId,
          order: 'latest', // default: 'latest'. Use 'oldest' to order by oldest messages first
          limit: 20, // how many messages to fetch, default: 20, max: 50
      });
    } catch (error) {
      console.log(error);      
      return
    }   
    // 메세지 리스트에 세팅
    messages.value = result.messages?.reverse()    
    //메세지 읽음 처리
    await messageRead(channelId);
  }

  // 메세지 수신 시 작동
  const setMessages = async (message: message) => {
    messageIntoMessages(message)
    // 내가 현재 보고 있는 방과 같은 방에서 온 메세지 일 경우 읽음 처리 해준다
  }


  const setIsNewChat = (isNew : boolean) => {
    isNewChat.value = isNew
  }

  const setPostId = (postid: any) => {
    postId.value = postid
  }

  const setPostItem = async (postid: any) => {
    // postItem.value = postid
    await chatapi.getPost(postid).then((res) => {    
      postItem.value = res.data.result;
      // console.log('요청성공 : ', res);      
      console.log('post는 : ', postItem.value);      
    }).catch((err) => {      
      console.log('에러 : ', err);      
    })
  }

  // 메세지를 메세지 리스트에 넣기
  const messageIntoMessages = (message: message) => {
    messages.value.push(message);    
  }

  // 메세지 리스트를 채널에 넣기
  const messagesIntoChannel = async (channelId: string, message:message) => {
    let pickChannel:channel | undefined = findChannel(channelId);
    // 메세지 리스트에 채널이 있으면 있는 채널에 메세지 리스트를 꽂아주고
    if (pickChannel) {
      pickChannel.lastMessage = message
    }
    // 없으면 채널을 API로 찾아온다
    else {
      // 메서드 그냥 읽어온거면은 메세지 자동 포함되어 있으니깐 추가 안 해줘도 된다.
      pickChannel = await client.value.getChannel({
        channelId: channelId,
      });
    }
    // 채널을 채널리스트에 꽂아준다
    setChannels(pickChannel);
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
    } catch (error) {
      console.log(error);      
      return
    }    
    messageIntoMessages(result.message)
    messagesIntoChannel(result.message.channelId, result.message)
    // console.log(result);
  }


  const findChannel = (channelId: string) => {
    return channels.value.find(item => item.id === channelId)
  }




  const isMobile = () => {
    return window.innerWidth < 640
  }


  const isRoomExist = async (postIdx: string | string[]) => {
    var result;
      await chatapi
        .getChatRoom(postIdx)
        .then((res) => {
          //성공하면 페이지를 올린다.
          console.log('요청성공 : ',res);      
        })
        .catch((err) => {
          //서버 가져오기 완료
          console.log(err);
          
          if (err.status === 404 && err.data.meta.code === "extinct_chatroom") {
            // 새로운 채팅방 생성
            router.push('/chat/new?postId='+postIdx)
          }
          else if (err.status === 400 && err.data.meta.code === "invalid_value") {
            // 형식 올바
            // console.log("형식이 올바르지 않음");    
            alert("올바른 요청이 아닙니다")
          }
          else if (err.status === 200 && err.data.meta.code === "success"){
            // 존재하는 채팅방
            console.log('요청성공');
          }
          else if (err.status === 401){            
            alert("올바른 요청이 아닙니다")
          }
          // console.log(err.response);
          // router.push('/chat/')              
        });
  }
  

  const getPost = async (postIdx: string | string[]) => {
    var result;
      await chatapi
        .getPost(postIdx)
        .then((res) => {
          //성공하면 페이지를 올린다.
          console.log(res);
        })
        .catch((err) => {
          //서버 가져오기 완료
          console.log(err);
        });
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

  return { client, postId, isNewChat, user, init, login, getChannels, channels, setChannels, resetChannels, pagingChannels, resetMessages, unreadCount, getUnreadCount, selectedChannel, setSelectedChannel, getSelectedChannel, messages, getMessages,setMessages,sendMessage, messageRead, messagesIntoChannel, isRoomExist, getPost, setPostId, postItem,setPostItem,setIsNewChat}
});
