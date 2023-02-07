import { checkTokenStatus } from "@/api/common";
import http from "@/api/user-service/UserHTTPClient";
import type { TokenDto } from "@/domain/auth";
import type meta from "@/domain/common/meta.interface";

export async function deleteUseAccount<T>(
  withdrawalReasons: string
): Promise<meta> {
  // TODO 토큰 상태를 확인 하는 메서드, 나중에 정리 필요
  checkTokenStatus();

  var accessTokenData = localStorage.getItem("accessToken");

  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;
    const url = `/users/registrations`;

    try {
      const result: meta = await http.delete(url, {
        headers: {
          accesstoken: token,
          withdrawalReasons: encodeURIComponent(withdrawalReasons),
        },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  } else return Promise.reject("error");
}
