import type meta from "@/domain/common/meta.interface";
import { IsNumber, IsString } from "class-validator";

class result {
  @IsString()
  type: string;
  @IsString()
  status: string;
  @IsNumber()
  trying: number;
}

export class checkAuthidDto {
  meta: meta;
  result: result;
}

// export default class CreateTokenResponseDto {
//   meta: meta;
//   result?: CreateToken;

//   constructor(meta: meta, result: CreateToken) {
//     this.meta = meta;
//     this.result = result;
//   }
// }
