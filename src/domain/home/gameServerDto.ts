import { IsNumber, IsString, Min } from "class-validator";
import type meta from "../common/meta.interface";

export class GameServerDto {
  @IsNumber()
  @Min(1)
  idx: number;
  @IsString()
  name: string;
}

export class GameServerReponseDto {
  meta: meta;
  result: GameServerDto;
}
