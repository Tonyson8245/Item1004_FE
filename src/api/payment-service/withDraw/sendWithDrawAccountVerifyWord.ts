
import http from "@/api/auth-service/authHTTPClient";
import type { sendWithDrawAccountVerifyWordResponse } from "@/domain/payment/withDrawAccountDto.interface";
import  { sendWithdrawAccountVerifyWordRequestBody } from "@/domain/payment/withDrawAccountDto.interface";
import type { TokenDto } from "@/domain/auth";
import { checkTokenStatus } from "@/api/common";
/**
* @description 출금 계좌등록 1원 보낸 계좌 인증 API
* @author 이광호
* @sdoc withDraw
* @since 2023-02-12 19:41:15
*/
export async function sendWithDrawAccountVerifyWord<T>(
  bankName:string, bankAccount:string
): Promise<string> {
  const requestBody = new sendWithdrawAccountVerifyWordRequestBody(bankName, bankAccount)  
  
  
  const url = "/auth/accounts";
  checkTokenStatus();
  const accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    const token = (JSON.parse(accessTokenData) as TokenDto).token;
    
    try {
      const result: string= await http.post(url, requestBody, {
        headers: {
          //  "Content-Type": "multipart/form-data" ,
           accessToken: token,
        },
      });
      console.log(`api success`);
      return result;
    } catch (err) {
      console.log(`api failed`);
      console.log(err);
      
      return Promise.reject(err);
    }
  } else return Promise.reject("token error");
}

