import type meta from "../common/meta.interface"
/**
* @description 출금계좌 인증 시 1원 보내기 인증에 사용 , 가상계좌 발급과는 다르게 이름이 필요치 않는다
* @author 이광호
* @sdoc withDrawAccountVerify.ts
* @since 2023-02-12 19:27:37
*/
export class sendWithdrawAccountVerifyWordRequestBody {
    bankName:string; //신한은행
    bankAccount:string;   //1103301412021

    constructor(
        bankName:string,
        bankAccount:string , 
    ){
        this.bankName = bankName;
        this.bankAccount = bankAccount;
        // this.userName = userName;
    }
}
/**
* @description 출금계좌 인증 시 1원 보내기 인증에 사용, 가상계좌 발급과는 다르게 이름이 필요치 않는다
* @author 이광호
* @sdoc withDrawAccountVerify.ts
* @since 2023-02-12 19:27:37
*/
export interface sendWithDrawAccountVerifyWordResponse {
    result: string
}

/**
* @description 
* @author 이광호
* @sdoc verifyWithDwawAccount.ts
* @since 2023-02-13 10:54:38
*/
export class verifyWithDrawAccountRequestBody {
    code: string
    constructor(
        code: string
    ){
        this.code = code;
    }
}
