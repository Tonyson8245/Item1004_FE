import http from "@/api/auth-service/authHTTPClient";
import { checkTokenStatus } from "@/api/common";
import type { TokenDto } from "@/domain/auth";
import type { userInfoOverviewResult } from "@/domain/user/userInfoOverview";

export async function getMyInfoOverview<T>(): Promise<userInfoOverviewResult> {
  const url = "/my/infos/overview";
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
    const result: userInfoOverviewResult = await http.get(url, {
      headers: {
        accesstoken: token,
      },
    });
    return result;
  } catch (err) {
    return Promise.reject("API error");
  }
}
