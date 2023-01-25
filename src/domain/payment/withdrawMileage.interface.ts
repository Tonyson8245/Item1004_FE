import type meta from "../common/meta.interface";

export class withdrawMileageResult {
  bankName: string;
  accountNumber: string;
  withdrawalPoint: number;
  constructor(
    bankName: string,
    accountNumber: string,
    withdrawalPoint: number,
    currentWithdrawalPoint: number
  ) {
    this.bankName = bankName;
    this.accountNumber = accountNumber;
    this.withdrawalPoint = withdrawalPoint;
    this.currentWithdrawalPoint = currentWithdrawalPoint;
  }
  currentWithdrawalPoint: number;
}

export class withdrawMileageResponese {
  meta: meta;
  result: withdrawMileageResult;
}
