import { IsNumber, IsString, isString } from "class-validator";

class payload {
  @IsNumber()
  sellerIdx?: number;
  @IsNumber()
  buyerIdx: number;
  @IsNumber()
  fee: number;
  @IsNumber()
  point?: number;
  @IsNumber()
  productPrice: number;
  @IsNumber()
  totalPrice: number;
  @IsNumber()
  postIdx?: number;
  @IsNumber()
  pricePerUnit?: number;
  @IsNumber()
  salesUnit?: number;
  @IsNumber()
  countBuyProduct?: number;

  constructor(
    buyerIdx: number,
    fee: number,
    productPrice: number,
    totalPrice: number,
    postIdx?: number
  ) {
    this.buyerIdx = buyerIdx;
    this.fee = fee;
    this.productPrice = productPrice;
    this.totalPrice = totalPrice;
    this.postIdx = postIdx;
  }
}

export { payload };
