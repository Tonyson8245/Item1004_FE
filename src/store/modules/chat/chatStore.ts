import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type resp from "@/domain/chat/resp.interface";
import type channel from "@/domain/chat/channel.interface";

export const useChatStore = defineStore("chatStore", ()=>  {
    
  const client = ref(Object)
  const user = ref(Object)
  const channels = ref<channel[]>([])
  const hasNext = ref(false);
  const unreadCount = ref(0);


  const init = () => {
      // 앱 ID 추후에 숨겨야 한다.
      // TODO: client.value가 null이면 새로 생성한다.
    return client.value = new TalkPlus.Client({appId: 'bf5ae95e-5f1d-42af-90cf-c725c78db1e0'});
  }

  
  //원래는 여기서 사용자 로그인을 서버에서 톡플러스로 요청 해와야 합니데이~~~~   
  const login = async () => {
    if (!client.value.isLoggedIn()) {
      try {
        user.value = await client.value.loginAnonymous({
          userId: 'YSBhHC65Kh', // unique userId
          profileImageUrl: 'https://archeage.nexon.com/characters/dbf279b5-20ff-4fba-8e6a-c1301fb97657/profileImage', // username
        });   
      } catch (error) {
        console.log("error : ",error);
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
      console.log("인터페이스 확인용", result);    
      channels.value.push(...result.channels);
      hasNext.value = result.hasNext;
      getUnreadCount();
    // console.log(result.channe
    } catch (error) {
      console.log("error : ",error);        
    }      
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

  // 채팅 대상 검색
  const searchChannel = async (targetUser: string) =>{
    let result: resp;   

    console.log("내 아이디",user.value);
    console.log("찾을 유저",targetUser);
    
    // try {
    //   result = await client.value.getChannels({
    //     members:[]

    //   })
    // } catch (error) {
      
    // }
  }



  return { client, init, login, getChannels, channels, setChannels, pagingChannels, unreadCount, getUnreadCount, searchChannel }
});
