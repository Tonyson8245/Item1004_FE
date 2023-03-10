import type { TokenDto } from "@/domain/auth";
import type { CreatePostDtoBody } from "@/domain/home/writePost/CreatePostDto";
import http from "../HomeHTTPClient";
import { checkTokenStatus } from "@/api/common";

export async function createPost<T>(post: CreatePostDtoBody): Promise<T> {
  const url = "/posts/games";
  // TODO 토큰 상태를 확인 하는 메서드, 나중에 정리 필요
  checkTokenStatus();
  var accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;

    try {
      const result: T = await http.post(url, post, {
        headers: {
          accessToken: token,
        },
      });
      console.log(`api success`);
      return result;
    } catch (err) {
      console.log(`api failed`);
      return Promise.reject(err);
    }
  } else return Promise.reject("token error");
}
