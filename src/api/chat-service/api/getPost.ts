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
      return Promise.reject(err);
    }
  } else return Promise.reject("token error");
}
