export class contractCompleteResult {
  title: string;
  gameName: string;
  serverName: string;
  productType: string;
  productPrice: number;
  pricePerUnit: number;
  saleUnit: number;
  countPricePerUnit: number;
  multiPricePerUnit: number;
  couponDiscountPrice: number;
  point: number;
  totalPrice: number;
  tid: string;
  createdAt: string;
  payMethod: string;
}

export class contractCompleteBody {
  tid: string;
  payMethod: string;
  postIdx: number;
  userIdx: number;
  constructor(
    tid: string,
    payMethod: string,
    postIdx: number,
    userIdx: number
  ) {
    this.tid = tid;
    this.payMethod = payMethod;
    this.postIdx = postIdx;
    this.userIdx = userIdx;
  }
}
