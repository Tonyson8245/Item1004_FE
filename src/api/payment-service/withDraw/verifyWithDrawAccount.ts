
import http from "@/api/auth-service/authHTTPClient";
import { verifyWithDrawAccountRequestBody } from "@/domain/payment/withDrawAccountDto.interface";
import type { TokenDto } from "@/domain/auth";
import { checkTokenStatus } from "@/api/common";
/**
* @description 출금 계좌 인증
* @author 이광호
* @sdoc VirtualAccount.vue
* @since 2023-02-10 15:05:29
*/
export async function verifyWithDrawAccount<T>(
  authId:string, code: string //code 는 계좌 인증시 4자리 입금자 명
): Promise<T> {
  const requestBody = new verifyWithDrawAccountRequestBody(code)  
  console.log("계좌인증 바디 : ", requestBody);
  
  const url = "/auth/accounts/verify";
  checkTokenStatus();
  const accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    const token = (JSON.parse(accessTokenData) as TokenDto).token;
    
    try {
      const result: T = await http.post(url, requestBody, {
        headers: {
          //  "Content-Type": "multipart/form-data" ,
            accessToken: token,
            authId: authId
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

