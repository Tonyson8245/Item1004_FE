
import http from "../paymentHTTPClient";
import type { sendWithDrawAccountVerifyWordResponse } from "@/domain/payment/withDrawAccountDto.interface";
import  { sendWithdrawAccountVerifyWordRequestBody } from "@/domain/payment/withDrawAccountDto.interface";
import type { TokenDto } from "@/domain/auth";
import { checkTokenStatus } from "@/api/common";
/**
* @description 입금전용 가상계좌발급 1원 보낸 계좌 인증 API
* @author 이광호
* @sdoc VirtualAccount.vue
* @since 2023-02-10 15:05:29
*/
export async function withDrawAccountVerify<T>(
  bankName:string, bankAccount:string, userName:string
): Promise<sendWithDrawAccountVerifyWordResponse> {
  const requestBody = new sendWithdrawAccountVerifyWordRequestBody(bankName, bankAccount, userName)  
  console.log("계좌인증 바디 : ", requestBody);
  
  const url = "/auth/accounts";
  checkTokenStatus();
  const accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    const token = (JSON.parse(accessTokenData) as TokenDto).token;
    
    try {
      const result: sendWithDrawAccountVerifyWordResponse= await http.post(url, requestBody, {
        headers: {
          //  "Content-Type": "multipart/form-data" ,
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

