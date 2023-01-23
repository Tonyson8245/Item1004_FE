import type { TokenDto } from "@/domain/auth";
import http from "../ChatHTTPClient";

export async function getChatRoom<T>(
  postIdx: string | string[]
): Promise<T> {
  const url = "/chatrooms/ids?postIdx="+postIdx;  
  var accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;
    // console.log("token",token);
    
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
      return Promise.reject(err.response);
    }
  } else return Promise.reject("token error");
}
