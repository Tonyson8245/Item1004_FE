import { IsString } from "class-validator";
import type meta from "../common/meta.interface";

class contractCheckBodyDto {
  totalPrice: number;
  payMethod: string;
  type: string;
  constructor(totalPrice: number, payMethod: string, type: string) {
    this.totalPrice = totalPrice;
    this.payMethod = payMethod;
    this.type = type;
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
