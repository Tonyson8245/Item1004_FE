import axios from "axios";
// import { defineStore } from "pinia";
// import { ref, computed } from "vue";
// export const useChatStore = defineStore("chatStore", ()=>  {

//   const client = ref(Object)
//   const user = ref(Object)
//   const channels = ref([])

//   const init = () =>{
//       // 앱 ID 추후에 숨겨야 한다.
//     return client.value = new TalkPlus.Client({appId: 'bf5ae95e-5f1d-42af-90cf-c725c78db1e0'});
//   }

//     //원래는 여기서 사용자 로그인을 서버에서 톡플러스로 요청 해와야 합니데이~~~~
//   const login = async () =>{
//       if (!client.value.isLoggedIn()) {
//         user.value = await client.value.loginAnonymous({
//           userId: 'YSBhHC65Kh', // unique userId
//           profileImageUrl: 'https://archeage.nexon.com/characters/dbf279b5-20ff-4fba-8e6a-c1301fb97657/profileImage', // username
//         },
//         // (errResp, data) => {
//         //   this.user = data.user;
//         //   console.log(this.user);
//         //   return data.user;
//         // }
//         );

//         return user
//       }
//     }

//     const getChannels = async () =>{
//       if (client.value.isLoggedIn()) {
//         channels.value = await client.value.getChannels({
//           limit: 20
//         })
//         return channels.value.channels;
//       }
//     }

//     return { client, init, login, getChannels, channels }

//     // async createUser(){
//     //   try{
//     //     const data = await axios.post('https://api.talkplus.io/v1.4/api/users/create', {
//     //       body: {
//     //         userId: "7686-e368-3eee",
//     //         password: "패스워드입니다",
//     //         username: "홍길동",
//     //         profileImageUrl : "https://slamdunk-movie.jp/files/images/p_main_sakuragi.jpg"
//     //       },
//     //       headers: {
//     //         "api-key": '34aa2c43b2150cd204214d4d5dd3618b82a06357fbfca16cf60d3d3076e062ff',
//     //         "app-id" : 'bf5ae95e-5f1d-42af-90cf-c725c78db1e0',
//     //         "content-type" : "application/json"
//     //       },
//     //     })
//     //     console.log(data);

//     //     return data;

//     //   }catch (error) {
//     //     console.log(error)
//     //   }
//     // }
//     // ,
//     // async getUser(userId:string){
//     //   try{
//     //     const data = await axios.get('https://api.talkplus.io/v1.4/api/users/'+userId, {
//     //       // params: { userId: "7686-e368-3eee" },
//     //       headers: {
//     //         "api-key": '34aa2c43b2150cd204214d4d5dd3618b82a06357fbfca16cf60d3d3076e062ff',
//     //         "app-id" : 'bf5ae95e-5f1d-42af-90cf-c725c78db1e0'
//     //       },
//     //     })
//     //     console.log(data);
//     //     return data;
//     //   }
//     //   catch (error) {
//     //     console.log(error)
//     //   }
//     // },

// });
