import http from "@/api/payment-service/paymentHTTPClient";
import type { TokenDto } from "@/domain/auth";
import { checkTokenStatus } from "@/api/common";

export async function withDrawSubmit<T>(
    transferAmount :string
  ): Promise<T> {
    const url = "/hyphen/automatic-transfer.php?transferAmount="+transferAmount;
    checkTokenStatus();
    const accessTokenData = localStorage.getItem("accessToken");
    if (accessTokenData != null) {
      const token = (JSON.parse(accessTokenData) as TokenDto).token;
      try {
        const result: T = await http.get(url, {
          headers: {
             "Content-Type": "multipart/form-data" ,
             accessToken: token,
          },
        });
        console.log(`api success`);
        console.log("api 성공",result);        
        return result;
      } catch (err) {
        console.log(`api failed`);
        console.log(err);        
        return Promise.reject(err);
      }
    } else return Promise.reject("token error");
  }