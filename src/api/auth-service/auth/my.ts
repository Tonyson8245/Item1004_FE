import http from "@/api/auth-service/authHTTPClient";
import type { TokenDto } from "@/domain/auth";
import type meta from "@/domain/common/meta.interface";
import type * as auth from "@/domain/auth/index";

export async function putBankAccount<T>(
  payload: auth.putBankAccountBody
): Promise<meta> {
  const url = "/my/account";
  var token = "";
  var accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    token = (JSON.parse(accessTokenData) as TokenDto).token;
    return Promise.reject("token error");
  }

  try {
    const result: meta = await http.post(
      url,
      {
        bankName: payload.bankName,
        putBankAccount: payload.bankAccount,
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
