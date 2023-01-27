import { IsNumber, IsString, isString } from "class-validator";

class payload {
  sellerIdx: number;
  buyerIdx: number;
  point: number;
  productPrice: number;
  postIdx: number;
  totalPrice: number;
  pricePerUnit: number;
  salesUnit: number;
  countBuyProduct: number;
  characterName?: string;
  ordNm?: string;
  constructor(
    sellerIdx: number,
    buyerIdx: number,
    point: number,
    productPrice: number,
    postIdx: number,
    totalPrice: number,
    pricePerUnit: number,
    salesUnit: number,
    countBuyProduct: number,
    characterName: string
  ) {
    this.sellerIdx = sellerIdx;
    this.buyerIdx = buyerIdx;
    this.point = point;
    this.productPrice = productPrice;
    this.postIdx = postIdx;
    this.totalPrice = totalPrice;
    this.pricePerUnit = pricePerUnit;
    this.salesUnit = salesUnit;
    this.countBuyProduct = countBuyProduct;
    this.characterName = characterName;

    if (characterName == "") delete this.characterName;
  }
}

export { payload };
