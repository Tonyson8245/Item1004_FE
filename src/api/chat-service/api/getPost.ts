import type { TokenDto } from "@/domain/auth";
import type { GamePostDetailDto } from "@/domain/home/posts/GamePostDetailDto";
import http from "../ChatHTTPClient";

export async function getPost<T>(
  postIdx: string
): Promise<T> {
  const url = "/chatroom/posts/"+postIdx;
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
