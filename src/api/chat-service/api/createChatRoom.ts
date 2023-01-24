import type { TokenDto } from "@/domain/auth";
import type { createRoomBody } from "@/domain/chat/createRoomBody";
import type createRoomResponse from "@/domain/chat/createRoomResponse";
import http from "../ChatHTTPClient";

export async function createChatRoom(
  body: createRoomBody
): Promise<createRoomResponse> {
  const url = "/chatrooms";  
  var accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;
    // console.log("token",token);    
    try {
      const result: any = await http.post(url, body, {
        headers: {
          accessToken: token
        },
      });
      console.log(`api success`);
      return result.data;
    } catch (err) {
      console.log("API error");
      return Promise.reject(err);
    }
  } else return Promise.reject("token error");
}
