import type meta from "../common/meta.interface"
/**
* @description 가상계좌 1원 발급 시 인증용으로 사용
* @author 이광호
* @sdoc sendAccountVerifyWord.ts
* @since 2023-02-10 10:51:38
*/
export class sendAccountVerifyWordRequestBody {
    bankName:string; //신한은행
    acctNo:string;   //1103301412021
    custNm:string;   // 이광호
    constructor(
        bankName:string,
        acctNo:string ,
        custNm:string 
    ){
        this.bankName = bankName;
        this.acctNo = acctNo;
        this.custNm = custNm;
    }
}

/**
* @description 가상계좌 1원 발급 시 인증 response에 사용
* @author 이광호
* @sdoc 
* @since 2023-02-10 10:51:38
*/
export interface result{
    verifyTrDt:string, //검증 거래일자
    verifyTrNo:string  //검증 거래번호
}

/**
* @description  가상계좌 1원 발급 시 인증 response에 사용
* @author 이광호
* @sdoc sendAccountVerifyWord.ts
* @since 2023-02-10 10:51:38
*/
export interface sendAccountVerifyWordResponce extends meta, result {
    
}


/**
* @description 1원 보낸 계좌 인증 리퀘스트에 사용
* @author 이광호
* @sdoc accountVerify.ts
* @since 2023-02-10 15:03:01
*/
export class accountVerifyRequestBody{
    verifyTrDt:string  //검증 거래일자 
    verifyTrNo:string  //검증 거래번호
    verifyVal:string   //검증번호     ex) 바른닭장
    constructor(
        verifyTrDt:string,
        verifyTrNo:string,
        verifyVal:string
    ){
        this.verifyTrDt = verifyTrDt;
        this.verifyTrNo = verifyTrNo;
        this.verifyVal = verifyVal;
    }
}


/**
* @description 1원 보낸 계좌 인증 리스폰스에 사용
* @author 이광호
* @sdoc accountVerify.ts
* @since 2023-02-10 15:03:01
*/

export interface accountVerifyResponce extends meta {
    
}