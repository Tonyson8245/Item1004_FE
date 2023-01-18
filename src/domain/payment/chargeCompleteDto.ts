export class chargeCompleteResult {
  totalPrice: number;
  chargePoint: number;
  tid: string;
  payMethod: string;
  afterChargePoint: number;
  withdrawalPoint: number;
  purchasePoint: number;
}

export class chargeCompleteBody {
  tid: string;
  payMethod: string;
  postIdx: number;
  userIdx: number;
  constructor(tid: string, payMethod: string, userIdx: number) {
    this.tid = tid;
    this.payMethod = payMethod;
    this.userIdx = userIdx;
  }
}
