interface mileageOverviewReponseDTO {
  entirePoint: number; //전체포인
  availablePoint: number; // 사용가능
  pointWithdrawal: number; //출금가능
  pointPurchase: number; //  구매전용
  contractUserPoint: number; //거래 사용중
  withdrawalUsePoint: number; //출금 요청중
  expireDatePoint: number; // 출금 요청중소멸예정
}

export default mileageOverviewReponseDTO;
