import type { TokenDto } from "@/domain/auth";
import type { postDto } from "@/domain/chat/postDto";
import http from "../ChatHTTPClient";

export async function getPost<postDto>(
  postIdx: string
): Promise<postDto> {
  const url = "/chatrooms/posts/"+postIdx;
  var accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;
    // console.log("토큰이다!!!",token);    
    try {
      const result: any = await http.get(url, {
        headers: {
          accessToken: token
        },
      });
      console.log(`api success`);
      return result;
    } catch (err) {
      console.log("API error");
      console.log(err);
      if(err.status === 500){
        alert('상품 정보를 가지고 올 수 없습니다. 고객센터로 문의주세요')
      }
      
      return Promise.reject(err);
    }
  } else return Promise.reject("token error");
}
