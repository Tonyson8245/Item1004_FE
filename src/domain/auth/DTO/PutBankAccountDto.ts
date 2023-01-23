export class putBankAccountBody {
  bankName: string;
  bankAccount: string;
  constructor(bankName: string, bankAccount: string) {
    this.bankName = bankName;
    this.bankAccount = bankAccount;
  }
}
