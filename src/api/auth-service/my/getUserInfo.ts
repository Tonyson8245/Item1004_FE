import http from "@/api/auth-service/authHTTPClient";
import type { TokenDto } from "@/domain/auth";
import type { userInfoResult } from "@/domain/user/userInfoDto";
import type { userInfoOverviewResult } from "@/domain/user/userInfoOverview";
import { checkTokenStatus } from "@/api/common";

export async function getUserInfo<T>(): Promise<userInfoResult> {
  const url = "/my/infos";
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
    const result: userInfoResult = await http.get(url, {
      headers: {
        accesstoken: token,
      },
    });
    return result;
  } catch (err) {
    return Promise.reject("API error");
  }
}
