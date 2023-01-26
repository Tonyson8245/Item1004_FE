import type { TokenDto } from "@/domain/auth";
import http from "../ChatHTTPClient";
import type createRoomResponse from "@/domain/chat/createRoomResponse";

export async function getChatRoom(
  postIdx: string | string[]
): Promise<createRoomResponse> {
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
      console.log(`api success`,result);
      return result.data;
    } catch (err) {
      console.log("API error",err);
      return Promise.reject(err.response);
    }
  } else return Promise.reject("token error");
}
