
import http from "../paymentHTTPClient";
import type { accountRequestResponse } from "@/domain/payment/virtualAccountVerifyDto.interface";
import  { accountRequestBody } from "@/domain/payment/virtualAccountVerifyDto.interface";
import type { TokenDto } from "@/domain/auth";
import { checkTokenStatus } from "@/api/common";
/**
* @description  입금전용  가상계좌 발급받기
* @author 이광호
* @sdoc VirtualAccount.vue
* @since 2023-02-10 19:38:20
*/
export async function requestVirtualAccount<T>(
    custNm:string, amount:string, custBankName:string, custBankAcct:string
): Promise<accountRequestResponse> {
  const requestBody = new accountRequestBody(custNm, amount, custBankName,custBankAcct)  
  const url = "/paytus/vbank/req-account-number.php";
  checkTokenStatus();
  const accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    const token = (JSON.parse(accessTokenData) as TokenDto).token;
    
    try {
      const result: accountRequestResponse= await http.post(url, requestBody, {
        headers: {
           "Content-Type": "multipart/form-data" ,
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
