import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useChatStore = defineStore("chatStore", ()=>  {
    
  const client = ref(Object)
  const user = ref(Object)
  const channels = ref([])
  const hasNext = ref(false);
  const init = () =>{
      // 앱 ID 추후에 숨겨야 한다.
      // TODO: client.value가 null이면 새로 생성한다.
    return client.value = new TalkPlus.Client({appId: 'bf5ae95e-5f1d-42af-90cf-c725c78db1e0'});
  }

  //원래는 여기서 사용자 로그인을 서버에서 톡플러스로 요청 해와야 합니데이~~~~   
  const login = async () =>{
    if (!client.value.isLoggedIn()) {
      user.value = await client.value.loginAnonymous({
        userId: 'YSBhHC65Kh', // unique userId
        profileImageUrl: 'https://archeage.nexon.com/characters/dbf279b5-20ff-4fba-8e6a-c1301fb97657/profileImage', // username
      });       
      return user        
    }      
  }

  // 채팅방 목록 갱신
  const setChannels = (channel:Object) =>{ 
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
      const lastChannelId = channels.value[channels.value.length-1].id;
      console.log("마지막 채널은 : ", channels.value[channels.value.length-1]);
      getChannels(lastChannelId);
    }
  }

  const getChannels = async (lastChannelId?: number) =>{
    let result = null;
    if (lastChannelId!==null)  
      result = await client.value.getChannels({
        lastChannelId,
        limit: 20
      })
    else result = await client.value.getChannels({     
      limit: 20
    })
    channels.value.push(...result.channels);
    hasNext.value = result.hasNext;
    console.log(result.channels);  
  }


  return { client, init, login, getChannels, channels, setChannels, pagingChannels }
});
