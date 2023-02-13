import type { TokenDto } from "@/domain/auth";
import type { CreatePostDtoBody } from "@/domain/home/writePost/CreatePostDto";
import http from "../HomeHTTPClient";
import { checkTokenStatus } from "@/api/common";

export async function editPost<T>(
  post: CreatePostDtoBody,
  postIdx: string
): Promise<T> {
  const url = `/posts/games/${postIdx}`;
  var token = "";
  // TODO 토큰 상태를 확인 하는 메서드, 나중에 정리 필요
  checkTokenStatus();
  var accessTokenData = localStorage.getItem("accessToken");

  if (accessTokenData != null) {
    token = (JSON.parse(accessTokenData) as TokenDto).token;
  } else {
    return Promise.reject("token error");
  }

  try {
    const result: T = await http.patch(url, post, {
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
}
