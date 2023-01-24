import { isEmpty } from "class-validator";
import type meta from "../common/meta.interface";
import common from "@/common";
export class post {
  idx: number;
  productType: string;
  gameName: string;
  serverName: string;
  title: string;
  constructor() {
    this.idx = 0;
    this.productType = "카테고리";
    this.gameName = "게임이름";
    this.serverName = "서버이름";
    this.title = "제목";
  }
}
export class otherUser {
  image: string;
  nickname: string;
  isVerified: boolean;
  code: string;
  isEmailValid: boolean;
  isPhoneValid: boolean;
  isAccountValid: boolean;
  contractLevelName: string;

  constructor() {
    this.image = "@/asset/img/profile_green.jpeg";
    this.nickname = "닉네임";
    this.isVerified = false;
    this.code = "#AAAAAAAAA";
    this.isEmailValid = false;
    this.isPhoneValid = false;
    this.isAccountValid = false;
    this.contractLevelName = "silver";
  }
}
export class my {
  code: string;
  phone: string;
  isSeller: boolean;
  constructor() {
    this.code = "#UAAAAAAA";
    this.phone = "010-1234-5678";
    this.contractLevelName = "silver";
    this.isSeller = false;
  }
  contractLevelName: string;
}
export class contract {
  ordNm: string;
  createdAt: string;
  purchaseTotalPrice: number;
  purchaseNumber: number;
  pricePerUnit: number;
  contractStageStatus: string;
  constructor() {
    this.ordNm = '"12345abcd-448b-48bc-8da6-be331910531e"';
    this.createdAt = "2022-10-10 12:00:00";
    this.purchaseTotalPrice = 10000;
    this.purchaseNumber = 10;
    this.pricePerUnit = 100;
    this.contractStageStatus = "입금";
  }
}
export class contractPostDetailBody {
  postIdx: number;
  ordNm: string;
  constructor(postIdx: number, ordNm: string) {
    this.postIdx = postIdx;
    this.ordNm = ordNm;
  }
}

export class contractPostDetailResult {
  post: post;
  otherUser: otherUser;
  my: my;
  contract: contract;

  constructor() {
    this.post = new post();
    this.otherUser = new otherUser();
    this.my = new my();
    this.contract = new contract();
  }
}

export class contracPostDetailResponse {
  meta: meta;
  result: contractPostDetailResult;
}
