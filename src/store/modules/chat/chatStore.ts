import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useChatStore = defineStore("chatStore", ()=>  {
    
  const client = ref(Object)
  const user = ref(Object)
  const channels = ref([])

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

  const getChannels = async () =>{
    if (client.value.isLoggedIn()) {
      const result = await client.value.getChannels({
        limit: 20
      })
      channels.value = result.channels
      return channels.value;
    }      
  }
    
  const setChannels = (channel:Object) =>{
    // list 안에 있는 채팅방의 id와 같은 값을 가지고 있는 방을 찾아서 가장 최상단에 올려준다. 올려준다는 얘기는 같은 채팅방원소를 새로운 채팅방으로 교체한다는 얘기힘
    // 만약에 채팅 방이 없다면은 그냥 리스트에 푸쉬해서 넣어준다.
    console.log("채널", channel);
    console.log("채널리스트", channels.value);
    // 리스트 item 중에 item.id가 같은 아이템이 있다면 
    const doGetChannel = channels.value.filter(item => item.id === channel.id)

    console.log("찾은 채널 : ", doGetChannel);
    
    if (doGetChannel) {
      channels.value.forEach((item, i, origin)=>{
        if (item === doGetChannel) {
          origin.splice(i,1);
        }

      })

      console.log('결과 목록 : ',channels.value);
      
    }
  }


  return { client, init, login, getChannels, channels, setChannels }

});
