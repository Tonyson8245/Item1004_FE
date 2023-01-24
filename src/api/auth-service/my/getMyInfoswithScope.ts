import http from "@/api/auth-service/authHTTPClient";
import { checkTokenStatus } from "@/api/common";
import type { TokenDto } from "@/domain/auth";
import type { userInfowithScopeResult } from "@/domain/user/userInfowithScopeDto";

export async function getMyInfoswithScope<T>(
  payload: string
): Promise<userInfowithScopeResult> {
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
    const result: userInfowithScopeResult = await http.get(url, {
      headers: {
        accesstoken: token,
      },
      params: {
        scope: payload,
      },
    });
    return result;
  } catch (err) {
    return Promise.reject("API error");
  }
}
