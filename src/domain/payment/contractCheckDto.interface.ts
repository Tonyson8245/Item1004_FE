import { IsString } from "class-validator";
import type meta from "../common/meta.interface";

class contractCheckBodyDto {
  totalPrice: number;
  payMethod: string;
  constructor(totalPrice: number, payMethod: string) {
    this.totalPrice = totalPrice;
    this.payMethod = payMethod;
  }
}
class contractCheckResultDto {
  @IsString()
  formControlUrl?: string;
  @IsString()
  url: string;
  @IsString()
  tag: string;
}
class contractCheckResponseDto {
  meta: meta;
  result: contractCheckResultDto;
}

export {
  contractCheckBodyDto,
  contractCheckResponseDto,
  contractCheckResultDto,
};
