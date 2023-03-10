import type { TokenDto } from "@/domain/auth";
import type { GamePostDetailDto } from "@/domain/home/posts/GamePostDetailDto";
import http from "../HomeHTTPClient";
import { checkTokenStatus } from "@/api/common";

export async function getProduct<T>(
  postIdx: string
): Promise<GamePostDetailDto> {
  const url = "/posts/games/" + postIdx;
  // TODO 토큰 상태를 확인 하는 메서드, 나중에 정리 필요
  checkTokenStatus();
  var accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;

    try {
      const result: GamePostDetailDto = await http.get(url, {
        headers: {
          accessToken: token,
        },
      });
      // console.log(`api success`);
      return result;
    } catch (err) {
      console.log("API error");
      console.log(`api failed`);
      return Promise.reject(err);
    }
  } else return Promise.reject("token error");
}
