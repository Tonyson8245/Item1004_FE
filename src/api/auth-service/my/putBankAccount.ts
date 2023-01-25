import http from "@/api/auth-service/authHTTPClient";
import type { TokenDto } from "@/domain/auth";
import type meta from "@/domain/common/meta.interface";
import type * as auth from "@/domain/auth/index";
import { checkTokenStatus } from "@/api/common";

export async function putBankAccount<T>(
  payload: auth.putBankAccountBody
): Promise<meta> {
  const url = "/my/infos/account";
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
    const result: meta = await http.post(
      url,
      {
        bankName: payload.bankName,
        bankAccount: payload.bankAccount,
      },
      {
        headers: {
          accessToken: token,
        },
      }
    );
    return result;
  } catch (err) {
    return Promise.reject("API error");
  }
}
