import { IsNotEmpty } from "class-validator";
import type meta from "../common/meta.interface";

class pagination {
  hasResult: boolean;
  resultTotalPage: number;
  hasNextPage: boolean;
  constructor(
    hasResult: boolean,
    resultTotalPage: number,
    hasNextPage: boolean
  ) {
    this.hasResult = hasResult;
    this.resultTotalPage = resultTotalPage;
    this.hasNextPage = hasNextPage;
  }
}
class otherUser {
  idx: number;
  nickname: string;
  code: number;
  constructor(idx: number, nickname: string, code: number) {
    this.idx = idx;
    this.nickname = nickname;
    this.code = code;
  }
}
class post {
  idx: number;
  productType: string;
  gameName: string;
  serverName: string;
  constructor(
    idx: number,
    productType: string,
    gameName: string,
    serverName: string,
    title: string
  ) {
    this.idx = idx;
    this.productType = productType;
    this.gameName = gameName;
    this.serverName = serverName;
    this.title = title;
  }
  title: string;
}

class contract {
  createdAt: string;
  purchaseTotalPrice: number;
  countBuyProduct: number;
  ordNm: string;
  constructor(
    createdAt: string,
    purchaseTotalPrice: number,
    countBuyProduct: number,
    ordNm: string
  ) {
    this.createdAt = createdAt;
    this.purchaseTotalPrice = purchaseTotalPrice;
    this.countBuyProduct = countBuyProduct;
    this.ordNm = ordNm;
  }
}

export class contractPostListBody {
  page: number;
  pageUnit: number;
  contractStage: number;
  postType: string;

  constructor(
    page: number,
    pageUnit: number,
    contractStage: number,
    postType: string
  ) {
    this.page = page;
    this.pageUnit = pageUnit;
    this.contractStage = contractStage;
    this.postType = postType;
  }
}
export class card {
  otherUser: otherUser;
  post: post;
  contract: contract;
  constructor(otherUser: otherUser, post: post, contract: contract) {
    this.otherUser = otherUser;
    this.post = post;
    this.contract = contract;
  }
}

export class contracPostListResult {
  pagination: pagination;
  card: card[];
}

export class contracPOstListResponse {
  meta: meta;
  result: contracPostListResult;
}
