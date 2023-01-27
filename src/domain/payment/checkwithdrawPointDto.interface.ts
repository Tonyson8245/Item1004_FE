export class checkwithdrawPointDtoResult {
  currentWithdrawalPoint: number;
  currentEntirePoint: number;
  constructor(currentWithdrawalPoint: number, currentEntirePoint: number) {
    this.currentWithdrawalPoint = currentWithdrawalPoint;
    this.currentEntirePoint = currentEntirePoint;
  }
}
